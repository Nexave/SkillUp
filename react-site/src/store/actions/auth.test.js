import { saveAuthenticatedUser } from './auth';
import { SAVE_AUTHENTICATED_USER } from '../actionTypes';

describe('actions/auth.js', () => {
    it.only('should return idToken', () => {
        expect(saveAuthenticatedUser('ID_TOKEN')).toEqual({
            type: SAVE_AUTHENTICATED_USER,
            idToken: 'ID_TOKEN'
        });
    });
});

