import React, {Component} from 'react';
import {connect} from 'react-redux';
//import axios from 'axios';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actionTypes from '../../store/actions'


class BurgerBuilder extends Component {
    state = {
        buying: false,
        loading: false,
        error: false
    };

    componentDidMount() {
        // axios.get('/ingredients.json')
        // .then(response => {
        //     this.setState({ingredients: response.data});
        // })
        // .catch( error => {
        //     this.setState({error: true});
        // });
    }

    updatedBuyState(ingredients) {
        const sum = Object.keys(ingredients)
            .map( igKey => {
                return ingredients[igKey];
            })
            .reduce((sum, el)=> {
                return sum + el;
            },0);
        //this.setState({buyable: sum > 0});
        return sum > 0;
    };

    buyingHandler = () => {
        this.setState({buying:true});
    };

    buyingCancelHandler = () => {
        this.setState({buying:false});
    };

    buyingContinueHandler = () => {
        this.props.history.push('/checkout');
        // const queryParams = [];
        // for(let i in this.state.ingredients) {
        //     queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
        // }

        // queryParams.push('price=' + this.state.totalPrice);

        // const queryString = queryParams.join('&');
        // this.props.history.push({
        //     pathname: '/checkout',
        //     search: '?' + queryString
        // });
    };

    render() {
        const disabledInfo = {
            ...this.props.ings            
        };
        for ( let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        let orderSummary = null;

        let burger  = this.state.error ? <p>Failed to load ingredients.</p> : <Spinner />;
        if ( this.props.ings) {
            burger = (
                <>
                    <Burger ingredients={this.props.ings}/>
                    <BuildControls 
                        ingredientAdded={this.props.onIngredientAdded}
                        ingredientRemoved={this.props.onIngredientRemoved}
                        disabled={disabledInfo} 
                        price={this.props.price} 
                        buyable={/*this.state.buyable*/ this.updatedBuyState(this.props.ings) }
                        order={this.buyingHandler} />
                </>
            );
            orderSummary = <OrderSummary 
                ingredients={this.props.ings}
                buyingCancel={this.buyingCancelHandler}
                buyingContinue={this.buyingContinueHandler} 
                price={this.props.price} />;
        }
        if ( this.state.loading ) {
            orderSummary = <Spinner />;
        }

        return (
            <>
                <Modal show={this.state.buying} modalClosed={this.buyingCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </>
        );
    };
}

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        price: state.totalPrice
    };
} 

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch({type: actionTypes.ADD_INGREDIENTS, ingredientName: ingName}),
        onIngredientRemoved: (ingName) => dispatch({type: actionTypes.REMOVE_INGREDIENTS, ingredientName: ingName})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));