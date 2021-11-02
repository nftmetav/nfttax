
from gevent import monkey
monkey.patch_all()

from gevent.pywsgi import WSGIServer
from flask import Flask


# If `entrypoint` is not defined in app.yaml, App Engine will look for an app
# called `app` in `main.py`.
app = Flask(__name__)


@app.route('/_/_/')
def hello():
    return 'Hello World!'


if __name__ == '__main__':
    http_server = WSGIServer(("127.0.0.1", 8080), app)
    http_server.serve_forever()
