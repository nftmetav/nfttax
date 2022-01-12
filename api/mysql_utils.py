import json
from contextlib import closing

import pymysql
from pymysql.err import IntegrityError

import my_secrets
import settings


class UserExistsException(Exception):
    pass


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
        except Exception as e:
            if isinstance(e, IntegrityError):
                print(
                    f"Ignore duplicated entry (owner_address={owner_address}, tx_hash={tx_hash})"
                )
            else:
                raise


def insert_user(conn, wallet_address, nonce):
    with closing(conn.cursor()) as cursor:
        sql = "INSERT INTO users(wallet_address, nonce) VALUES(%s, %s)"
        try:
            cursor.execute(sql, (wallet_address, nonce))
            conn.commit()
        except Exception as e:
            if isinstance(e, IntegrityError):
                raise UserExistsException()

            print(f"Unknown error inserting user into db")
            raise


def get_user(conn, wallet_address):
    with closing(conn.cursor()) as cursor:
        sql = "SELECT nonce FROM users WHERE wallet_address=%s ORDER BY id DESC LIMIT 1"
        try:
            cursor.execute(sql, (wallet_address,))
            ret = cursor.fetchone()
            return {"wallet_address": wallet_address, "nonce": ret[0]}
        except:
            print(f"Error getting nonce for user")
            raise


def update_nonce(conn, wallet_address, new_nonce):
    with closing(conn.cursor()) as cursor:
        sql = "UPDATE users SET nonce=%s WHERE wallet_address=%s"
        try:
            cursor.execute(sql, (new_nonce, wallet_address))
            conn.commit()
        except:
            print(f"Error updating user nonce")
            raise
