from sys import exit

from decouple import config
from flask_cors import CORS
from flask_migrate import Migrate

from apps import create_app, db
from apps.config import config_dict

DEBUG = config("DEBUG", default=True, cast=bool)

# The configuration
get_config_mode = "Debug" if DEBUG else "Production"

try:
    # Load the configuration using the default values
    app_config = config_dict[get_config_mode.capitalize()]

except KeyError:
    exit("Error: Invalid <config_mode>. Expected values [Debug, Production] ")

app = create_app(app_config)
CORS(app, resources={r"/v0/*": {"origins": "http://localhost:3000"}})
Migrate(app, db)

if DEBUG:
    app.logger.info("DEBUG       = " + str(DEBUG))
    app.logger.info("Environment = " + get_config_mode)
    app.logger.info("DBMS        = " + app_config.SQLALCHEMY_DATABASE_URI)

if __name__ == "__main__":
    app.run(host="127.0.0.1", port=8080)
