# TODO

- [x] Parse OpenSea event objects to get all taxable ations like buy/sell/transfer etc
- [x] Figure out if OpenSea API captures off-platform events
- [x] Use tx hash to query tx details from Etherscan/OpenNode
- [x] Refactor TxTable, separate view/control logic
- [ ] Return taxable events within given date range
- [ ] Dig up collection and present data image
- [ ] Connect wallet (MetaMask)
- [ ] Update icons of wallet providers in LoginPage.js

# Dev

## API

Install dependencies:

```
$ cd api/
$ virtualenv --python python3 ~/envs/nfttax
$ source ~/envs/nfttax/bin/activate
$ pip install -r requirements.txt
```

Start the API server:

```
$ cp ./my_secrets.json.template ./my_secrets.json # then add api keys to my_secrets.json
$ python main.py
```

## MySQL

Pull the image and run the server:

```
$ docker pull mysql/mysql-server:8.0.27
$ docker run --name mysql -p 3306:3306 -e MYSQL_ROOT_PASSWORD=<rootpwd> -d mysql/mysql-server:8.0.27
```

Allow host processes to connect to the containerized MySQL server:

```
$ docker exec -it mysql bash -c 'mysql -uroot -p'
mysql> update mysql.user set host="%" where user="root";
```

Restart container, connect to server via TCP, and create db & tables:

```
$ docker restart mysql
$ mysql --host=127.0.0.1 --port=3306 -uroot -p

> CREATE DATABASE nft;
> USE nft;
> CREATE TABLE `events` (
  `owner_address` varchar(64) NOT NULL,
  `tx_hash` varchar(128) NOT NULL,
  `event` json NOT NULL,
  PRIMARY KEY (`owner_address`,`tx_hash`)
);

> CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `wallet_address` varchar(64) NOT NULL,
  `nonce` varchar(64) NOT NULL,
  PRIMARY KEY (`id`)
)
```

## Webapp

```
$ cd nfttax/
$ npm ci && npm run dev
```

# Google App Engine Deploy

Inside Cloud Shell, deploy API server and Webapp separately.

## API

```
$ cd api/
$ cp my_secrets.json.template my_secrets.json # then add keys/passwords to my_secrets.json
$ gcloud config set project <project_name>
$ gcloud app deploy
```
