import React from 'react';
import classes from './CheckoutSummary.module.css';
import Burger from '../../Burger/Burger'
import Button from '../../UI/Button/Button';

const checkoutSummary = (props) => {
    return (
        <div className={classes.CheckoutSummary}>
            <h1>We hope you enjoy!</h1>
            <div style={{width: '100%', margin: 'auto'}}>
                <Burger ingredients={props.ingredients}/>
            </div>
            <Button 
                btnType="Danger"
                clicked={props.onCheckoutCanceled}>CANCEL</Button>
            <Button 
                btnType="Success"
                clicked={props.onCheckoutContinued}>CONTINUE</Button>
        </div>
    );
};

export default checkoutSummary;