import opensea

def _parse_action(from_address, to_address, owner_address):
    if from_address.startswith('0x00000000000000') and to_address == owner_address:
        return 'minted'
    
    """
    if to_address == owner_address:
        return 'buy'
    
    if from_address == owner_address:
        return 'sell'
    """

    return 'other'

def get_trading_history(wallet_address):
    parsed_events = []

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
        if not action == 'minted':
            continue

        tx = event.get('transaction')
        tx.pop('from_account')
        tx.pop('to_account')

        parsed_events.append({
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

    return {"trading_events": parsed_events}