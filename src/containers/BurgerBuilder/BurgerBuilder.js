import React, {Component} from 'react';
import {connect} from 'react-redux';

import axios from '../../axios-orders';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';


class BurgerBuilder extends Component {
    state = {
        buying: false
    };

    componentDidMount() {
        this.props.onInitIngredients();
    }

    updatedBuyState(ingredients) {
        const sum = Object.keys(ingredients)
            .map( igKey => {
                return ingredients[igKey];
            })
            .reduce((sum, el)=> {
                return sum + el;
            },0);
        return sum > 0;
    };

    buyingHandler = () => {
        if ( this.props.isAuthenticated ) {
            this.setState({buying:true});
        } else {
            this.props.onSetAuthRedirectPath('/checkout');
            this.props.history.push('/auth');
        }
        
    };

    buyingCancelHandler = () => {
        this.setState({buying:false});
    };

    buyingContinueHandler = () => {
        this.props.onInitBuy();
        this.props.history.push('/checkout');
    };

    render() {
        const disabledInfo = {
            ...this.props.ings            
        };
        for ( let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        let orderSummary = null;

        let burger  = this.props.error ? <p>Failed to load ingredients.</p> : <Spinner />;
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
                        isAuth={this.props.isAuthenticated}
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
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuthenticated: state.auth.token !== null
    };
} 

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
        onIngredientRemoved: (ingName) => dispatch(actions.removeIngredient(ingName)),
        onInitIngredients: () => dispatch(actions.initIngredients()),
        onInitBuy: () => dispatch( actions.buyInit() ),
        onSetAuthRedirectPath: (path) => dispatch( actions.setAuthRedirectPath(path) )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));