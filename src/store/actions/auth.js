import axios from 'axios';

import * as actionTypes from './actionTypes';

export const authStart = () => {
    console.log('authStart');
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (token, userId) => {
    console.log('authSuccess');
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        userId: userId
    };
};

export const authFail = (error) => {
    console.log('authFail');
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const auth = (email, password, isSignUp) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        };
        let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyBOKYKw15XMYjTxN8AhMY4KxkwvV3ahQK4';
        if ( !isSignUp ) {
            url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyBOKYKw15XMYjTxN8AhMY4KxkwvV3ahQK4';
        }
        axios.post(url, authData)
        .then( response => {
            console.log(response);
            dispatch(authSuccess(response.data.idToken, response.data.localId));
        })
        .catch( error => {
            console.log(error);
            dispatch(authFail(error));
        });
    };
}