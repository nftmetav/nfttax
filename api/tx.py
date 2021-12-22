import my_secrets
import requests
from web3 import Web3

node_url = f"https://eth-mainnet.alchemyapi.io/v2/{my_secrets.alchemy()}"
w3 = Web3(Web3.HTTPProvider(node_url))


class AlchemyApiException(Exception):
    pass


class Event(object):
    def __init__(self, wallet_address, action, other_party, asset):
        self.wallet_address = wallet_address
        self.action = action
        self.other_party = other_party
        self.asset = asset  # contract addr & token_id


def get_nft_events(wallet_address, from_block="latest", to_block="latest"):
    """Only scanning the blocks for buying/selling/minting."""

    # First we get all tx initiated by the given wallet address. Since selling must happen after buying/minting,
    # we can get all bought/minted NFTs and then check if they have been sold (using contract address)
    response = requests.post(
        node_url,
        headers={"Content-Type": "application/json"},
        json={
            "jsonrpc": "2.0",
            "id": 1,
            "method": "alchemy_getAssetTransfers",
            "params": [
                {
                    "fromBlock": from_block,
                    "toBlock": to_block,
                    "fromAddress": wallet_address,
                    "maxCount": "0x10",
                }
            ],
        },
    )
    if response.status_code != 200:
        raise AlchemyApiException()

    events = list()
    transfers = response.json().get("result").get("transfers")
    print(f"{len(transfers)} transfers found")

    for t in transfers:
        tx_hash = t.get("hash")

        print(f"tx: {tx_hash}")

        tx = w3.eth.get_transaction(t.get("hash"))

        # Skip non-NFT tx
        if not tx.get("input") or tx.get("input") == "0x":
            continue

        if tx.get("input").startswith("0xab834bab"):
            contract = tx.get("input")[10 + 64 * 11 : 10 + 64 * 12][24:]
            buy_maker = tx.get("input")[10 + 64 : 10 + 64 + 64]
            buy_taker = tx.get("input")[10 + 64 + 64 : 10 + 64 + 64 + 64]

            _wallet_address = wallet_address.replace("0x", "")

            action = None
            trading_with = None
            if buy_maker.find(_wallet_address) >= 0:
                action = "buy"
                trading_with = buy_taker[24:]
            elif buy_taker.find(_wallet_address) >= 0:
                action = "sell"
                trading_with = buy_maker[24:]

            # get token id by looking into receipt log
            receipt = w3.eth.get_transaction_receipt(tx_hash)
            if receipt.status > 0:
                receipt_logs = receipt.get("logs")
                token_id = receipt_logs[0].get("topics")[3]  # HexBytes
                token_id = int(token_id.hex(), 16)

                events.append(
                    {
                        "tx": tx_hash,
                        "wallet_address": wallet_address,
                        "action": action,
                        "trading_with": "0x" + trading_with,
                        "asset": {
                            "contract_address": "0x" + contract,
                            "token_id": token_id,
                        },
                    }
                )
                print(
                    f"\tatomicMatch_: {action} contract {contract}, trading_with {trading_with}"
                )
                print(f"#EVENTS: {len(events)}")
        elif tx.get("input").startswith("0x6ecd2306"):
            print("\tmint")
        else:
            print(f"\tunknown method id: {tx.get('input')[:10]}")

    return events


if __name__ == "__main__":
    davide_eth = "0xf5324be5db41ba9e464e14f3940eccde98993682"
    get_nft_events(davide_eth, from_block="0xCFFF00")
