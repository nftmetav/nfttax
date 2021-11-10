import json

api_keys = {}

with open('./api_keys.json', 'r') as fd:
    api_keys = json.load(fd)

def quicknode():
    return api_keys.get('quicknode')

def opensea():
    return api_keys.get('opensea')

def etherscan():
    return api_keys.get('etherscan')