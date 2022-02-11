import React, {Component} from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import {Route} from 'react-router-dom';
import ContactData from './ContactData/contactdata'



class Checkout extends Component { 
    
    state = {
        ingredients : null,
        price : 0
    }
    
    constructor(props){
        super(props)
        const query = new URLSearchParams(this.props.location.search)
        let ingredients = {}
        let price = 0
        for (let param of query.entries()){
            if(!(param[0]==='price')){
                ingredients[param[0]] = +param[1]
            }
            else{
                price = param[1]
            }
            
        }
        this.state ={
            ingredients : ingredients,
            price : price
        }
    }

    checkoutContinuedHandler = () =>{
        this.props.history.replace('/checkout/contact-data')
    }

    checkoutCancelledHandler = () =>{
        this.props.history.goBack();
    }

 render(){
        
    return(
        <React.Fragment>
            <CheckoutSummary 
                checkoutContinued={this.checkoutContinuedHandler}
                checkoutCancelled={this.checkoutCancelledHandler}
                ingredients={this.state.ingredients}/> 
            {/* <ContactData/> */}
            <Route path={this.props.match.path + '/contact-data'} 
                   render={(props)=><ContactData {...props} ingredients={this.state.ingredients} totalprice={this.state.price}/>}/>
            
            
        </React.Fragment>
    );
 }
}


export default Checkout;