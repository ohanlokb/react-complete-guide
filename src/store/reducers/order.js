import * as actionTypes from '../actions/actionTypes';

const initialState = {
    orders: [],
    loading: false,
    buying: false
};

const reducer = (state = initialState,action) => {
    switch (action.type) {
        case actionTypes.BUY_INIT:
        return {
            ...state,
            buying: false
        };

        case actionTypes.BUY_BURGER_START:
        return {
            ...state,
            loading: true
        };

        case actionTypes.BUY_BURGER_SUCCESS:
        const newOrder = {
            ...action.orderData,
            id: action.orderId
        };
        return {
            ...state,
            loading: false,
            orders: state.orders.concat(newOrder),
            buying: true
        };
        
        case actionTypes.BUY_BURGER_FAIL:
        return {
            ...state,
            loading: false,
            buying: true
        };

        default:
        return state;
    }
};
export default reducer;