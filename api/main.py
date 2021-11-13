
from gevent import monkey
monkey.patch_all()

from flask import Flask
from flask import jsonify
from gevent.pywsgi import WSGIServer

import nft

# If `entrypoint` is not defined in app.yaml, App Engine will look for an app
# called `app` in `main.py`.
app = Flask(__name__)


@app.route('/_/_/')
def hello():
    return 'Hello World!'

@app.route('/v0/history/<wallet_address>')
def v0_get_trading_history(wallet_address):
    if not wallet_address.startswith('0x'):
        return jsonify({"error": {"message": "Invalid wallet address"}})
    # TODO: reject invalid wallet address
    
    return jsonify({"data": nft.get_trading_history(wallet_address)})


if __name__ == '__main__':
    http_server = WSGIServer(("127.0.0.1", 8080), app)
    http_server.serve_forever()
