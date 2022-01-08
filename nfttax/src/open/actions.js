export const START_METAMASK_LOGIN = "START_METAMASK_LOGIN";
export const startMetaMaskLogin = () => ({
  type: START_METAMASK_LOGIN,
  payload: {},
});

export const METAMASK_LOGIN_SUCCESS = "METAMASK_LOGIN_SUCCESS";
export const metaMaskLoginSucceeded = (address) => ({
  type: METAMASK_LOGIN_SUCCESS,
  payload: { address },
});

export const LOGIN_FAILURE = "LOGIN_FAILURE";
export const loginFailed = (reason) => ({
  type: LOGIN_FAILURE,
  payload: { reason },
});

export const CLEAR_FAILURE = "CLEAR_FAILURE";
export const clearFailure = () => ({
  type: CLEAR_FAILURE,
  payload: {},
});
