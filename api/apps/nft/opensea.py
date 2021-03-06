# import my_secrets
import requests
from decouple import config

BASE_URL = "https://api.opensea.io/api/v1"
DEFAULT_LIMIT = 50


class OpenseaApiException(Exception):
    pass


opensea_api_key = config("OPENSEA")

REQUEST_HEADERS = {"Accept": "application/json", "X-API-KEY": opensea_api_key}


def get_assets(owner_address, offset=0, limit=DEFAULT_LIMIT):
    params = {
        "owner": owner_address,
        "order_direction": "desc",
        "offset": offset,
        "limit": limit,
    }
    response = requests.get(
        f"{BASE_URL}/assets", params=params, headers=REQUEST_HEADERS
    )
    if response.status_code == 200:
        return response.json()

    return {}


def get_events(
    owner_address, event_type, is_opensea_only=False, offset=0, limit=DEFAULT_LIMIT
):
    params = {
        "account_address": owner_address,
        "event_type": event_type,
        "only_opensea": is_opensea_only,
        "offset": offset,
        "limit": limit,
    }
    response = requests.get(
        f"{BASE_URL}/events", params=params, headers=REQUEST_HEADERS
    )
    if response.status_code == 200:
        return response.json()

    if response.status_code == 403:
        raise OpenseaApiException()

    return {}
