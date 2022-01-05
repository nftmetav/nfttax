import os


def is_prod():
    return os.environ.get("GAE_ENV") == "standard"


DB_USER = os.environ.get("CLOUD_SQL_USERNAME") if is_prod() else "root"
DB_NAME = os.environ.get("CLOUD_SQL_DATABASE_NAME") if is_prod() else "nft"
DB_CONNECTION_NAME = os.environ.get("CLOUD_SQL_CONNECTION_NAME")
