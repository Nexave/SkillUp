import { SAVE_AUTHENTICATED_USER, LOGOUT_USER } from '../actionTypes';

export const saveAuthenticatedUser = idToken => ({
    type: SAVE_AUTHENTICATED_USER,
    idToken
});

export const logoutUser = () => {
    localStorage.removeItem('idToken');
    
    return {
        type: LOGOUT_USER
    };
};
