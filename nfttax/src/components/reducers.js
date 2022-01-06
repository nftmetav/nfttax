import { METAMASK_LOGIN_SUCCESS, START_METAMASK_LOGIN } from "./actions";

const initialAuthState = {
    userLoggedIn: false,
    loginInProgress: false,
    addresses: [],
}

export const auth = (authState = initialAuthState, action) => {
    const { type, payload } = action;

    switch (type) {
        case START_METAMASK_LOGIN: {
            return {
                ...authState,
                loginInProgress: true, 
            }
        }
        case METAMASK_LOGIN_SUCCESS: {
            const { address } = payload;
            return {
                userLoggedIn: true,
                loginInProgress: false,
                addresses: authState.addresses.includes(address) ? authState.addresses : authState.addresses.concat(address),
            }
        }
        default:
            return authState;
    }
}