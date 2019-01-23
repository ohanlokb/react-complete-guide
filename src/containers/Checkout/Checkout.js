import React, {Component} from 'react';
import {Route, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

//import classes from './Checkout.module.css';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
import * as actions from '../../store/actions/index';

class Checkout extends Component {
    
    componentWillMount() {
    }

    checkoutCanceled = () => {    
        this.props.history.goBack();
    }

    checkoutContinued = () => {        
        this.props.history.replace('/checkout/contact-data');
    }

    render() {
        let summary = <Redirect to="/" />
        if ( this.props.ings) {
            const buyRedirect = this.props.buying ? <Redirect to="/" /> : null;
            summary = (
                <div>
                    {buyRedirect}
                    <CheckoutSummary 
                        ingredients={this.props.ings}
                        onCheckoutCanceled={this.checkoutCanceled}
                        onCheckoutContinued={this.checkoutContinued}/>
                </div>
            );
        }
        return (
            <div>
                {summary}
                <Route 
                    path={this.props.match.path + '/contact-data'} 
                    component={ContactData} />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        buying: state.order.buying
    }
}

export default connect(mapStateToProps)(Checkout);