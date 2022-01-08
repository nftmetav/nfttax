import React from "react";
import { LoginOptions, LoginFailureBanner } from "../components";
import { connect } from "react-redux";
import { startLogin } from "./thunks";

function LoginPage({ onStartLogin, failureReason = null }) {
  return (
    <section className="relative">
      <div className="grid grid-cols-1 max-w-6xl mx-auto px-10 text-white">
        <div className="col-lg-5 mt-20 place-self-center">
          <h1 className="text-2xl">Connect your wallet</h1>
        </div>

        <LoginOptions onStartLogin={onStartLogin} />

        {failureReason ? <LoginFailureBanner reason={failureReason} /> : null}
      </div>
    </section>
  );
}

const mapStateToProps = (state) => ({
  failureReason: state.auth.failureReason,
});

const mapDispatchToProps = (dispatch) => ({
  onStartLogin: (method) => dispatch(startLogin(method)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
