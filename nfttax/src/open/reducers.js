import {
  METAMASK_LOGIN_SUCCESS,
  START_METAMASK_LOGIN,
  LOGIN_FAILURE,
} from "./actions";

const initialAuthState = {
  userLoggedIn: false,
  loginInProgress: false,
  addresses: [],
  failureReason: null,
};

export const auth = (authState = initialAuthState, action) => {
  const { type, payload } = action;

  switch (type) {
    case START_METAMASK_LOGIN: {
      return {
        ...authState,
        loginInProgress: true,
      };
    }
    case LOGIN_FAILURE: {
      const { reason } = payload;
      return {
        ...authState,
        loginInProgress: false,
        failureReason: reason,
      };
    }
    case METAMASK_LOGIN_SUCCESS: {
      const { address } = payload;
      return {
        userLoggedIn: true,
        loginInProgress: false,
        addresses: authState.addresses.includes(address)
          ? authState.addresses
          : authState.addresses.concat(address),
        failureReason: null,
      };
    }
    default:
      return authState;
  }
};
