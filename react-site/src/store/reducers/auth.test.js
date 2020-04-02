import authReducer, { initialState } from './auth';
import { SAVE_AUTHENTICATED_USER } from '../actionTypes';

describe('reducers/auth.js', () => {
    it('should return initialState when state was not passed.', () => {
        expect(authReducer(undefined, {
            type: SAVE_AUTHENTICATED_USER,
            idToken: 'HELLO_WORLD'
        })).toEqual({
            ...initialState,
            idToken: 'HELLO_WORLD'
        });
    });
});
