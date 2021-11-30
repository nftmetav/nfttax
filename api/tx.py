from web3 import Web3
import api_keys

node_url = f"https://divine-divine-glade.quiknode.pro/{api_keys.quicknode()}/"
w3 = Web3(Web3.HTTPProvider(node_url))

# w3.get_transaction
# w3.get_transaction_receipt
