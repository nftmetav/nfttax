import React, { useState } from "react";

const LoginMethod = ({ icon, alt, method, loginHandler }) => {
  return (
    <div
      className="grid grid-cols-10 hover:cursor-pointer hover:bg-sky-700"
      onClick={() => {
        loginHandler(method);
      }}
    >
      <div>
        <img src={icon} height="24" width="24" alt={alt} />
      </div>
      <div className="col-span-4 place-self-start">{method}</div>
    </div>
  );
};

const LoginOptions = ({ loginHandler }) => {
  return (
    <div className="place-self-center mt-10 text-xl space-y-3 border border-white rounded-md p-5">
      <LoginMethod
        icon="https://docs.metamask.io/metamask-fox.svg"
        alt="MetaMask Logo"
        method="MetaMask"
        loginHandler={loginHandler}
      />
      <hr />
      <LoginMethod
        icon="https://static.wikia.nocookie.net/logopedia/images/9/9a/Coinbase_2021_App.png"
        alt="Coinbase Logo"
        method="Coinbase Wallet"
        loginHandler={loginHandler}
      />
      <hr />
      <LoginMethod
        icon="https://storage.opensea.io/static/wallets/walletconnect/walletconnect-alternative.png"
        alt="WalletConnect Logo"
        method="WalletConnect"
        loginHandler={loginHandler}
      />
    </div>
  );
};

const loginWithMetaMask = async () => {
  const eth = window.ethereum;
  if (eth) {
    if (!eth.selectedAddress) {
      await eth.enable();
    }

    console.log(`Wallet address: ${eth.selectedAddress}`);
    // send wallet address to backend and generate a nonce
    const response = await fetch(
      `http://localhost:8080/v0/connect/${eth.selectedAddress}`
    );
    const { data } = await response.json();
    const { nonce } = data;
    console.log(nonce);

    const from = eth.selectedAddress;
    const params = [nonce, from];
    const method = "personal_sign";
    eth.sendAsync({ method, params, from }, (err, result) => {
      const { result: sig } = result;
      console.log(`Signature: ${sig}`);

      fetch(`http://localhost:8080/v0/connect/verify`, {
        headers: { "Content-Type": "application/json" },
        method: "post",
        body: JSON.stringify({ from, sig }),
      })
        .then((response) => response.json())
        .then((result) => {
          const { verified } = result.data;
          console.log(`Wallet verified: ${verified}`);
        });
    });
  }
};

export default function LoginPage() {
  const loginHandler = (method) => {
    console.log(`Logging user in with ${method}`);

    switch (method) {
      case "MetaMask": {
        loginWithMetaMask();
        break;
      }
      default:
        console.error(`Login method not supported yet: ${method}`);
    }
  };

  return (
    <section className="relative">
      <div className="grid grid-cols-1 max-w-6xl mx-auto px-10 text-white">
        <div className="col-lg-5 mt-20 place-self-center">
          <h1 className="text-2xl">Connect your wallet</h1>
        </div>

        <LoginOptions loginHandler={loginHandler} />
      </div>
    </section>
  );
}
