import os

from decouple import config


class Config(object):

    basedir = os.path.abspath(os.path.dirname(__file__))

    # Set up the App SECRET_KEY
    SECRET_KEY = config("SECRET_KEY", default="supersecret")

    # This will create a file in <apps> FOLDER
    SQLALCHEMY_DATABASE_URI = "sqlite:///" + os.path.join(basedir, "test.db")
    SQLALCHEMY_TRACK_MODIFICATIONS = False


class ProductionConfig(Config):
    DEBUG = False

    # MySQL database
    SQLALCHEMY_DATABASE_URI = "{}://{}:{}@{}:{}/{}".format(
        config("DB_ENGINE", default="mysql"),
        config("DB_USERNAME", default="root"),
        config("DB_PASS", default="rootpwd"),
        config("DB_HOST", default="localhost"),
        config("DB_PORT", default=3306),
        config("DB_NAME", default="nft"),
    )


class DebugConfig(Config):
    DEBUG = True


# Load all possible configurations
config_dict = {"Production": ProductionConfig, "Debug": DebugConfig}
