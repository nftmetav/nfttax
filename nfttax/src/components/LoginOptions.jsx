import React from "react";

import { connect } from "react-redux";
import { startLogin } from "./thunks";

const mapStateToProps = (state) => ({
  auth: state.auth,
});

const mapDispatchToProps = (dispatch) => ({
  onStartLogin: (method) => dispatch(startLogin(method)),
});

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

function LoginOptions({ auth, onStartLogin }) {
  return (
    <div className="place-self-center mt-10 text-xl space-y-3 border border-white rounded-md p-5">
      <LoginMethod
        icon="https://docs.metamask.io/metamask-fox.svg"
        alt="MetaMask Logo"
        method="MetaMask"
        loginHandler={onStartLogin}
      />
      <hr />
      <LoginMethod
        icon="https://static.wikia.nocookie.net/logopedia/images/9/9a/Coinbase_2021_App.png"
        alt="Coinbase Logo"
        method="Coinbase Wallet"
        loginHandler={onStartLogin}
      />
      <hr />
      <LoginMethod
        icon="https://storage.opensea.io/static/wallets/walletconnect/walletconnect-alternative.png"
        alt="WalletConnect Logo"
        method="WalletConnect"
        loginHandler={onStartLogin}
      />
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginOptions);
