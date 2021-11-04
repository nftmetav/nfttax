# TODO

- [x] Parse OpenSea event objects to get all taxable ations like buy/sell/transfer etc
- [x] Figure out if OpenSea API captures off-platform events
- [ ] Use tx hash to query tx details from Etherscan/OpenNode
- [ ] Return taxable events within given date range

# Dev

```
    $ virtualenv --python python3 ~/envs/nft_trading_history
    $ source ~/envs/nft_trading_history/bin/activate
    $ pip install -r requirements.txt
``` 

# Google App Engine Deploy

Inside Cloud Shell:

```
    $ gcloud config set project <project_name>
    $ gcloud app deploy
```
