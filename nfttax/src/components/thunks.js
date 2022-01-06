import { metaMaskLoginSucceeded } from "./actions";

export const startLogin = (method) => async (dispatch) => {
  console.log(`Logging user in with ${method}`);

  const eth = window.ethereum;
  if (eth) {
    if (!eth.selectedAddress) {
      await eth.request({ method: "eth_requestAccounts" });
    }

    console.log(`Wallet address: ${eth.selectedAddress}`);
    dispatch(connectAndSignNonce(eth.selectedAddress));
  }
};

export const connectAndSignNonce = (address) => async (dispatch) => {
  // send wallet address to backend and get a nonce
  const response = await fetch(`http://localhost:8080/v0/connect/${address}`);
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
        console.log("User denied/canceled signing request");
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
  fetch(`http://localhost:8080/v0/connect/verify`, {
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
        window.location.replace("http://localhost:3000/dashboard");
      }
    });
};
