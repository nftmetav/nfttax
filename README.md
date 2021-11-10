# TODO

- [x] Parse OpenSea event objects to get all taxable ations like buy/sell/transfer etc
- [x] Figure out if OpenSea API captures off-platform events
- [x] Use tx hash to query tx details from Etherscan/OpenNode
- [ ] Return taxable events within given date range

# Dev

Install dependencies:
```
    $ virtualenv --python python3 ~/envs/nft_trading_history
    $ source ~/envs/nft_trading_history/bin/activate
    $ pip install -r requirements.txt
```

Run the http server:
```
    $ cp ./api_keys.json.template ./api_keys.json # then add api keys to api_keys.json
    $ python main.py
```

# Google App Engine Deploy

Inside Cloud Shell:

```
    $ cp ./api_keys.json.template ./api_keys.json # then add api keys to api_keys.json
    $ gcloud config set project <project_name>
    $ gcloud app deploy
```