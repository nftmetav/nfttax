import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";
import { LoginFailureBanner, LoginOptions } from "../components";
import { clearFailure } from "./actions";
import { startLogin } from "./thunks";

function LoginPage({
  onStartLogin,
  clearFailure,
  userLoggedIn = false,
  failureReason = null,
}) {
  useEffect(() => {
    clearFailure();
  }, []);

  return (
    <section className="relative">
      <div className="grid grid-cols-1 max-w-6xl mx-auto px-10 text-white">
        <div className="col-lg-5 mt-20 place-self-center">
          <h1 className="text-2xl">Connect your wallet</h1>
        </div>

        {!userLoggedIn ? (
          <LoginOptions onStartLogin={onStartLogin} />
        ) : (
          <Navigate to="/dashboard" />
        )}

        {failureReason && <LoginFailureBanner reason={failureReason} />}
      </div>
    </section>
  );
}

const mapStateToProps = (state) => ({
  failureReason: state.auth.failureReason,
  userLoggedIn: state.auth.userLoggedIn,
});

const mapDispatchToProps = (dispatch) => ({
  onStartLogin: (method) => dispatch(startLogin(method)),
  clearFailure: () => dispatch(clearFailure()),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
