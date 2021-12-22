import json

secrets = {}

with open("./my_secrets.json", "r") as fd:
    secrets = json.load(fd)


def quicknode():
    return secrets.get("quicknode")


def opensea():
    return secrets.get("opensea")


def etherscan():
    return secrets.get("etherscan")


def alchemy():
    return secrets.get("alchemy")


def mysql_password():
    return secrets.get("mysql")
