import * as actionTypes from '../actions/actionTypes';
import axios from '../../axios-orders';

export const buyBurgerSuccess = (id, orderData) => {
    return {
        type: actionTypes.BUY_BURGER_SUCCESS,
        orderId: id,
        orderData: orderData
    };
};

export const buyBurgerFail = (error) => {
    return {
        type: actionTypes.BUY_BURGER_FAIL,
        error: error
    };
};

export const buyBurgerStart = () => {
    return {
        type: actionTypes.BUY_BURGER_START
    }
};

export const buyBurger = (orderData) => {
    return dispatch  => {
        dispatch( buyBurgerStart() );

        axios.post('/orders.json', orderData)
        .then( response => {
            console.log(response.data)
            dispatch( buyBurgerSuccess(response.data.name, orderData) );
        })
        .catch ( error => {
            console.log(error)
            dispatch( buyBurgerFail(error) );
        });
    };
};

export const buyInit = () => {
    return {
        type: actionTypes.BUY_INIT
    };
}