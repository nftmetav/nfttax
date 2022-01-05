import json
from contextlib import closing

import my_secrets
import settings

import pymysql
from pymysql.err import IntegrityError


def get_connection():
    if settings.is_prod():
        # If deployed, use the local socket interface for accessing Cloud SQL
        unix_socket = "/cloudsql/{}".format(settings.DB_CONNECTION_NAME)
        return pymysql.connect(
            user=settings.DB_USER,
            password=my_secrets.cloudsql_password(),
            unix_socket=unix_socket,
            db=settings.DB_NAME,
        )

    # If using local mysql
    return pymysql.connect(
        host="localhost",
        user=settings.DB_USER,
        password=my_secrets.mysql_password(),
        db=settings.DB_NAME,
    )


def get_event(conn, owner_address, tx_hash):
    with closing(conn.cursor()) as cursor:
        sql = "SELECT event FROM events WHERE owner_address=%s AND tx_hash=%s"
        cursor.execute(sql, (owner_address, tx_hash))
        ret = cursor.fetchone()
        if ret:
            return json.loads(ret[0])


def insert_event(conn, owner_address, tx_hash, event):
    if isinstance(event, dict):
        event = json.dumps(event)

    with closing(conn.cursor()) as cursor:
        sql = "INSERT INTO events VALUES (%s, %s, %s)"
        try:
            cursor.execute(sql, (owner_address, tx_hash, event))
            conn.commit()
        except IntegrityError as e:
            if e.errno == 1062:
                print(
                    f"Ignore duplicated entry (owner_address={owner_address}, tx_hash={tx_hash})"
                )
