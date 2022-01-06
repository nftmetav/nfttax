from flask import Flask, jsonify, request
from flask_cors import CORS

import nft

# If `entrypoint` is not defined in app.yaml, App Engine will look for an app
# called `app` in `main.py`.
app = Flask(__name__)
cors = CORS(app, resources={r"/v0/*": {"origins": "http://localhost:3000"}})


@app.route("/_/_/")
def hello():
    return "Hello World!"


@app.route("/v0/connect/<wallet_address>")
def v0_connect(wallet_address):
    import random
    import string

    nonce = "".join([random.choice(string.ascii_lowercase) for i in range(32)])

    from mysql_utils import (
        get_connection,
        insert_user,
        update_nonce,
        UserExistsException,
    )

    conn = get_connection()
    try:
        insert_user(conn, wallet_address, nonce)
    except UserExistsException:
        update_nonce(conn, wallet_address, nonce)

    return jsonify({"data": {"nonce": nonce}})


@app.route(
    "/v0/connect/verify",
    methods=[
        "POST",
    ],
)
def v0_connect_verify():
    wallet_address = request.json.get("from")
    signature = request.json.get("sig")

    if not wallet_address or not signature:
        return jsonify({"error": {"message": "Missing required params"}})

    from web3.auto import w3
    from eth_account.messages import defunct_hash_message

    from mysql_utils import get_user, get_connection

    nonce = get_user(get_connection(), wallet_address).get("nonce")

    message_hash = defunct_hash_message(text=nonce)
    signer = w3.eth.account.recoverHash(message_hash, signature=signature)

    def _match():
        return signer.lower() == wallet_address.lower()

    return {"data": {"wallet_address": wallet_address, "verified": _match()}}


@app.route("/test")
def v0_test():
    return jsonify({"data": [{"a": 1, "b": 2}, {"a": 3, "b": 4}]})


@app.route("/v0/history/<wallet_address>")
def v0_get_trading_history(wallet_address):
    if not wallet_address.startswith("0x"):
        return jsonify({"error": {"message": "Invalid wallet address"}})
    # TODO: reject invalid wallet address

    # Normalize wallet address
    wallet_address = wallet_address.lower()

    try:
        return jsonify({"data": nft.get_trading_history(wallet_address)})
    except Exception as e:
        import sys
        import traceback

        traceback.print_exc(file=sys.stdout)
        return jsonify({"error": {"message": e.__class__.__name__}})


if __name__ == "__main__":
    app.run(host="127.0.0.1", port=8080, debug=True)
