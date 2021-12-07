# TODO

- [x] Parse OpenSea event objects to get all taxable ations like buy/sell/transfer etc
- [x] Figure out if OpenSea API captures off-platform events
- [x] Use tx hash to query tx details from Etherscan/OpenNode
- [ ] Return taxable events within given date range

# Dev

## API
Install dependencies:
```
$ cd api/
$ virtualenv --python python3 ~/envs/nft_trading_history
$ source ~/envs/nft_trading_history/bin/activate
$ pip install -r requirements.txt
```

Start the API server:
```
$ cp ./api_keys.json.template ./api_keys.json # then add api keys to api_keys.json
$ python main.py
```

## Webapp
```
$ cd www/
$ npm install && npm run start
```

# Google App Engine Deploy

Inside Cloud Shell, deploy API server and Webapp separately.

## API
```
$ cd api/
$ cp ./api_keys.json.template ./api_keys.json # then add api keys to api_keys.json
$ gcloud config set project <project_name>
$ gcloud app deploy
```

## Web
Webpack must be listed in the dependencies of the `package.json` file because by default `devDependencies` are not installed when the app is deployed to App Engine.

```
$ cd web/
$ gcloud config set project <project_name>
$ gcloud app deploy
```
