import opensea
from tx import w3

NULL_ADDRESS = '0x0000000000000000000000000000000000000000'

def _parse_action(from_address, to_address, owner_address):
    if from_address == NULL_ADDRESS and to_address == owner_address:
        return 'minted'
    
    if to_address == owner_address:
        return 'transfer_in'
    
    if from_address == owner_address:
        return 'transfer_out'

    return 'other'

def _tx_fees(tx_hash):
    receipt_data = w3.eth.get_transaction_receipt(tx_hash)

    return {
        'gas_price': receipt_data.get('effectiveGasPrice'),
        'gas_used': receipt_data.get('gasUsed'),
    }

def _tx_value(tx_hash):
    tx_data = w3.eth.get_transaction(tx_hash)
    return tx_data.get('value')


def get_trading_history(wallet_address, start_date=None, end_date=None):
    # TODO: set start_date and end_date for calling opensea api

    taxable_events = []

    raw_events = opensea.get_events(wallet_address, 'transfer', limit=20)
    for event in raw_events.get('asset_events', []):
        # Not sure how useful this id is
        # opensea_id = event.get('asset', {}).get('id')
        token_id = event.get('asset', {}).get('token_id')
        permalink = event.get('asset', {}).get('permalink')
        contract_address = event.get('contract_address')

        from_address = event.get('from_account', {}).get('address')
        to_address = event.get('to_account', {}).get('address')
        action = _parse_action(from_address, to_address, wallet_address)

        tx = event.get('transaction')
        tx.pop('from_account')
        tx.pop('to_account')

        # add gas used and gas price to the tx objct
        tx_hash = tx.get('transaction_hash')
        if tx_hash:
            tx.update(fees=_tx_fees(tx_hash))
            tx.update(value=_tx_value(tx_hash))

        taxable_events.append({
            'asset': {
                # 'opensea_id': opensea_id,
                'token_id': token_id,
                'permalink': permalink,
                'contract_address': contract_address,
            },
            'from': from_address,
            'to': to_address,
            'action': action,
            'transaction': tx,
        })

    return {"taxable_events": taxable_events}
