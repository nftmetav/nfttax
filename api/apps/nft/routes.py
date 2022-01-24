from apps import db
from apps.nft import blueprint
from apps.nft.models import Users
from apps.nft.nft import get_trading_history
from flask import jsonify, request

# from flask_cors import CORS
# If `entrypoint` is not defined in app.yaml, App Engine will look for an app
# called `app` in `main.py`.
# app = Flask(__name__)
# cors = CORS(app, resources={r"/v0/*": {"origins": "http://localhost:3000"}})


@blueprint.route("/_/_/")
def hello():
    return "Hello World!"


@blueprint.route("/v0/connect/<wallet_address>")
def v0_connect(wallet_address):
    import random
    import string

    nonce = "".join([random.choice(string.ascii_lowercase) for i in range(32)])

    user = Users.query.filter_by(address=wallet_address).one_or_none()

    if user:
        user.nonce = nonce
        # user.save()
    else:
        user = Users(address=wallet_address, nonce=nonce)
        db.session.add(user)

    db.session.commit()
    print(nonce)
    return jsonify({"data": {"nonce": nonce}})


@blueprint.route("/v0/connect/verify", methods=["POST"])
def v0_connect_verify():
    wallet_address = request.json.get("from")
    signature = request.json.get("sig")

    if not wallet_address or not signature:
        return jsonify({"error": {"message": "Missing required params"}})

    from eth_account.messages import defunct_hash_message

    # from mysql_utils import get_connection, get_user
    from web3.auto import w3

    user = Users.query.filter_by(address=wallet_address).one_or_none()

    if user:
        message_hash = defunct_hash_message(text=user.nonce)
        signer = w3.eth.account.recoverHash(message_hash, signature=signature)
        match = signer.lower() == wallet_address.lower()
    else:
        match = False

    return {"data": {"wallet_address": wallet_address, "verified": match}}


@blueprint.route("/test")
def v0_test():
    return jsonify({"data": [{"a": 1, "b": 2}, {"a": 3, "b": 4}]})


@blueprint.route("/v0/history/<wallet_address>")
def v0_get_trading_history(wallet_address):
    if not wallet_address.startswith("0x"):
        return jsonify({"error": {"message": "Invalid wallet address"}})
    # TODO: reject invalid wallet address

    # Normalize wallet address
    wallet_address = wallet_address.lower()

    try:
        return jsonify({"data": get_trading_history(wallet_address)})
    except Exception as e:
        import sys
        import traceback

        traceback.print_exc(file=sys.stdout)
        return jsonify({"error": {"message": e.__class__.__name__}})
