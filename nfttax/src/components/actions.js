export const START_METAMASK_LOGIN = 'START_METAMASK_LOGIN';
export const startMetaMaskLogin = () => ({
    type: START_METAMASK_LOGIN,
    payload: {},
});

export const METAMASK_LOGIN_SUCCESS = 'METAMASK_LOGIN_SUCCESS';
export const completeMetaMaskLogin = (address) => ({
    type: METAMASK_LOGIN_SUCCESS,
    payload: { address },
})