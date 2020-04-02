import { SAVE_AUTHENTICATED_USER, LOGOUT_USER } from '../actionTypes';

export const initialState = {
    idToken: null
};

const saveAuthenticatedUser = (state, action) => ({
    ...state,
    idToken: action.idToken
});

const logoutUser = state => ({
    ...state,
    idToken: null
});

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SAVE_AUTHENTICATED_USER: return saveAuthenticatedUser(state, action);
        case LOGOUT_USER: return logoutUser(state);
        default: return state;
    }
};

export default reducer;
