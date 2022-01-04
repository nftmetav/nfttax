from gevent import monkey

monkey.patch_all()

from flask import Flask, jsonify
from gevent.pywsgi import WSGIServer

import nft

# If `entrypoint` is not defined in app.yaml, App Engine will look for an app
# called `app` in `main.py`.
app = Flask(__name__)


@app.after_request
def set_cors(response):
    response.headers["Access-Control-Allow-Origin"] = "http://localhost:3000"
    response.headers["Access-Control-Allow-Credentials"] = "true"
    return response


@app.route("/_/_/")
def hello():
    return "Hello World!"


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
    http_server = WSGIServer(("127.0.0.1", 8080), app)
    http_server.serve_forever()
