import mysql_utils
import opensea
from tx import w3

NULL_ADDRESS = "0x0000000000000000000000000000000000000000"


conn = mysql_utils.get_connection()


def _parse_action(from_address, to_address, owner_address):
    if from_address == NULL_ADDRESS and to_address == owner_address:
        return "mint"

    if to_address == owner_address:
        return "transfer_in"

    if from_address == owner_address:
        return "transfer_out"

    return "other"


def _tx_fees(tx_hash):
    receipt_data = w3.eth.get_transaction_receipt(tx_hash)

    return {
        "gas_price": receipt_data.get("effectiveGasPrice"),
        "gas_used": receipt_data.get("gasUsed"),
    }


def _tx_value(tx_hash):
    tx_data = w3.eth.get_transaction(tx_hash)
    return tx_data.get("value")


def get_trading_history(wallet_address, start_date=None, end_date=None):
    # TODO: set start_date and end_date for calling opensea api

    taxable_events = []

    offset = 0
    while True:
        # transfer events include sale, transfer, and minting
        raw_events = opensea.get_events(
            wallet_address, "transfer", offset=offset, limit=opensea.DEFAULT_LIMIT
        )
        asset_events = raw_events.get("asset_events", [])
        if len(asset_events) == 0:
            break

        offset += opensea.DEFAULT_LIMIT

        for event in asset_events:
            # Not sure how useful this id is
            # opensea_id = event.get('asset', {}).get('id')
            token_id = event.get("asset", {}).get("token_id")
            permalink = event.get("asset", {}).get("permalink")
            image_url = event.get("asset", {}).get("image_url")
            contract_name = event.get("asset", {}).get("asset_contract", {}).get("name")
            contract_address = event.get("contract_address")

            from_address = event.get("from_account", {}).get("address")
            to_address = event.get("to_account", {}).get("address")
            action = _parse_action(from_address, to_address, wallet_address)

            if action not in ("mint", "transfer_in", "transfer_out"):
                print(f"Skip unknown action: {event}")
                continue

            tx = event.get("transaction")
            tx.pop("from_account")
            tx.pop("to_account")

            tx_hash = tx.get("transaction_hash")
            if not tx_hash:
                continue

            # before calling expensive RPCs to get fees and value, check db
            # if tx is already in db, append data from db to taxable event
            db_event = mysql_utils.get_event(conn, wallet_address, tx_hash)
            if not db_event:
                # add gas used and gas price to the tx objct
                tx.update(fees=_tx_fees(tx_hash))
                tx.update(value=_tx_value(tx_hash))

                db_event = {
                    "asset": {
                        # 'opensea_id': opensea_id,
                        "token_id": token_id,
                        "permalink": permalink,
                        "image_url": image_url,
                        "contract_address": contract_address,
                        "contract_name": contract_name,
                    },
                    "from": from_address,
                    "to": to_address,
                    "action": action,
                    "transaction": tx,
                }

                mysql_utils.insert_event(conn, wallet_address, tx_hash, db_event)

            taxable_events.append(db_event)

    return {"taxable_events": taxable_events}


if __name__ == "__main__":
    for e in get_trading_history("0x0b096d1f0ba7ef2b3c7ecb8d4a5848043cdebd50").get(
        "taxable_events"
    ):
        print(e)
