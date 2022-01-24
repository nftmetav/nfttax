from apps import db


class Users(db.Model):

    __tablename__ = "users"

    address = db.Column(db.String(48), primary_key=True)
    nonce = db.Column(db.String(32))


class Transactions(db.Model):

    __tablename__ = "transactions"

    owner_address = db.Column(db.String(48), primary_key=True)
    tx_hash = db.Column(db.String(48), primary_key=True)
    action = db.Column(db.String(16))
    from_address = db.Column(db.String(48))
    to_address = db.Column(db.String(48))

    token_id = db.Column(db.String(16))
    permalink = db.Column(db.String(255))
    image_url = db.Column(db.String(255))
    contract_address = db.Column(db.String(48))
    contract_name = db.Column(db.String(48))

    timestamp = db.Column(db.String(19))
    gas_price = db.Column(db.Float)
    gas_used = db.Column(db.Float)
    value = db.Column(db.Float)
