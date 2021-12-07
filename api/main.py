from gevent import monkey

monkey.patch_all()

from flask import Flask
from flask import jsonify
from gevent.pywsgi import WSGIServer

import nft
import tx
from flask_cors import CORS
from flask_cors import cross_origin

# If `entrypoint` is not defined in app.yaml, App Engine will look for an app
# called `app` in `main.py`.
app = Flask(__name__)
CORS(app)


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
@cross_origin()
def v0_get_trading_history(wallet_address):
    if not wallet_address.startswith("0x"):
        return jsonify({"error": {"message": "Invalid wallet address"}})
    # TODO: reject invalid wallet address

    try:
        return jsonify(
            {"data": tx.get_nft_events(wallet_address, from_block="0xD13420")}
        )
    except Exception as e:
        return jsonify({"error": {"message": e.__class__.__name__}})


if __name__ == "__main__":
    http_server = WSGIServer(("127.0.0.1", 8080), app)
    http_server.serve_forever()
