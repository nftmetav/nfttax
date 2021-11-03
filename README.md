# TODO

- [ ] Parse OpenSea event objects to get all taxable ations like buy/sell/transfer etc
- [ ] Figure out if OpenSea API captures off-platform events

# Dev

```
    $ virtualenv --python python3 ~/envs/nft_trading_history
    $ source ~/envs/nft_trading_history/bin/activate
    $ pip install -r requirements.txt
``` 

# Google App Engine Deploy

Inside Cloud Shell:

```
    $ gcloud config set project celtic-vent-330903
    $ gcloud app deploy
```
