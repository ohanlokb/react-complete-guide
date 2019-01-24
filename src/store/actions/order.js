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

export const buyBurger = (orderData, token) => {
    return dispatch  => {
        dispatch( buyBurgerStart() );

        axios.post(`/orders.json?auth=${token}`, orderData)
        .then( response => {
            dispatch( buyBurgerSuccess(response.data.name, orderData) );
        })
        .catch ( error => {
            dispatch( buyBurgerFail(error) );
        });
    };
};

export const buyInit = () => {
    return {
        type: actionTypes.BUY_INIT
    };
}

export const fetchOrdersSuccess = (orders) => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders: orders
    };
};

export const fetchOrdersFail = (error) => {
    return {
        type: actionTypes.FETCH_ORDERS_FAIL,
        error: error
    };
};

export const fetchOrderStart = () => {
    return {
        type: actionTypes.FETCH_ORDERS_START
    }
};


export const fetchOrders = (token, userId) => {
    return dispatch  => {
        dispatch( fetchOrderStart() );
        const queryParams = `?auth=${token}&orderBy="userId"&equalTo="${userId}"`;

        axios.get(`/orders.json${queryParams}`)
        .then( response => {
            const fetchedOrders = [];
            for ( let key in response.data) {
                fetchedOrders.push({
                    ...response.data[key],
                    id: key
                });
            }

            dispatch( fetchOrdersSuccess(fetchedOrders) );
        })
        .catch( error => {
            dispatch( fetchOrdersFail(error) );
        });
    };
};
