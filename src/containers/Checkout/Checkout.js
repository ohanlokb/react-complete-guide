import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import {connect} from 'react-redux';

//import classes from './Checkout.module.css';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {

    checkoutCanceled = () => {    
        this.props.history.goBack();
    }

    checkoutContinued = () => {        
        this.props.history.replace('/checkout/contact-data');
    }

    render() {
        return (
            <div>
                <CheckoutSummary 
                    ingredients={this.props.ings}
                    onCheckoutCanceled={this.checkoutCanceled}
                    onCheckoutContinued={this.checkoutContinued}/>
                <Route 
                    path={this.props.match.path + '/contact-data'} 
                    component={ContactData} />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.ingredients
    }
}

export default connect(mapStateToProps)(Checkout);