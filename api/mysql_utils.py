import json
from contextlib import closing

import my_secrets
import mysql.connector
from mysql.connector.errors import IntegrityError


def get_connection():
    return mysql.connector.connect(
        host="localhost",
        user="root",
        password=my_secrets.mysql_password(),
        database="nft",
    )


def get_event(conn, owner_address, tx_hash):
    with closing(conn.cursor(prepared=True)) as cursor:
        sql = "SELECT event FROM events WHERE owner_address=%s AND tx_hash=%s"
        cursor.execute(sql, (owner_address, tx_hash))
        ret = cursor.fetchone()
        if ret:
            return json.loads(ret[0])


def insert_event(conn, owner_address, tx_hash, event):
    if isinstance(event, dict):
        event = json.dumps(event)

    with closing(conn.cursor(prepared=True)) as cursor:
        sql = "INSERT INTO events VALUES (%s, %s, %s)"
        try:
            cursor.execute(sql, (owner_address, tx_hash, event))
            conn.commit()
        except IntegrityError as e:
            if e.errno == 1062:
                print(
                    f"Ignore duplicated entry (owner_address={owner_address}, tx_hash={tx_hash})"
                )
