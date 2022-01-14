import { loginFailed, metaMaskLoginSucceeded } from "./actions";

const api_server = import.meta.env.VITE_API_SERVER

export const startLogin = (method) => async (dispatch) => {
  console.log(`Logging user in with ${method}`);

  if (method != "MetaMask") {
    dispatch(loginFailed(`${method} not supported yet.`));
    return;
  }

  const eth = window.ethereum;
  if (eth) {
    if (!eth.selectedAddress) {
      await eth.request({ method: "eth_requestAccounts" });
    }

    console.log(`Wallet address: ${eth.selectedAddress}`);
    dispatch(connectAndSignNonce(eth.selectedAddress));
  } else {
    dispatch(
      loginFailed(
        "Web3 provider isn't available. Make sure you have wallet extensions installed."
      )
    );
  }
};

export const connectAndSignNonce = (address) => async (dispatch) => {
  // send wallet address to backend and get a nonce
  const response = await fetch(`http://${import.meta.env.VITE_API_SERVER}/v0/connect/${address}`);
  const { data } = await response.json();
  const { nonce } = data;
  console.log(`Nonce from server: ${nonce}`);

  const eth = window.ethereum;
  if (eth) {
    const from = address;
    const params = [nonce, from];
    const method = "personal_sign";
    eth.sendAsync({ method, params, from }, (err, result) => {
      if (err && err.code === 4001) {
        dispatch(loginFailed("User denied/canceled signing request"));
        return;
      }

      const { result: sig } = result;
      console.log(`Signature: ${sig}`);

      dispatch(verifyAddress(from, sig));
    });
  }
};

export const verifyAddress = (address, sig) => async (dispatch) => {
  const from = address;
  fetch(`http://${api_server}/v0/connect/verify`, {
    headers: { "Content-Type": "application/json" },
    method: "post",
    body: JSON.stringify({ from, sig }),
  })
    .then((response) => response.json())
    .then((result) => {
      const { verified } = result.data;
      console.log(`Wallet verified: ${verified}`);

      if (verified) {
        dispatch(metaMaskLoginSucceeded(address));
        let web_server = import.meta.env.VITE_WEB_SERVER;
        if (web_server.startsWith("localhost")) {
          web_server = "http://" + web_server
        } else if (!web_server.startsWith("https://")) {
          web_server = "https://" + web_server
        }

        window.location.replace(`${web_server}/dashboard`);
      } else {
        dispatch(loginFailed("Couldn't verify wallet address."));
      }
    });
};
