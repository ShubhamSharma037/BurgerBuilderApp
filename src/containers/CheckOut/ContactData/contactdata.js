import React, {Component} from 'react';
import Button from '../../../components/UI/Button/Button'
import classes from './contactdata.module.css';
import axios from '../../../axios-order';
import Spinner from '../../../components/UI/Spinner/Spinner'
import Input from '../../../components/UI/Input/input'
// import { element } from 'prop-types';



const inputStateCreator = (elType ,type,plchldr=null) =>{
    if(elType !== 'select'){
        return( 
            {   
                elementType : elType,
                elementConfig : {
                    type : type,
                    placeholder : plchldr,
                },
                value : '',
                validation : {
                    required : true,
                    minLength : 5
                },
                valid : false,
                touched : false
            }
        )
    }
    else {
    
        return( 
            {
                elementType : elType,
                elementConfig : {
                    options : type
                },
                value :  'Fastest',
                valid : true
            }
        )
    }
    
}

class Contact extends Component { 
    
    
    
    

    state ={
        orderForm : {
            name : inputStateCreator('input','text','Your Name'),
            city : inputStateCreator('input','text','Your City'),
            pin : inputStateCreator('input','number','Your Pin Code'),
            country : inputStateCreator('input','text','Your Country'),
            email : inputStateCreator('input','email','Your Email'),
            delieveryMethod : inputStateCreator('select',[{value : 'fastest', displayValue : 'Fastest'},
                                                                {value : 'cheapest', displayValue: 'Cheapest'}])
        },
            
        isLoading:false,
        formIsValid : false
    }

    
    orderHandler = (event) =>{
        event.preventDefault()      //prevents reloading when form submitted
        let formData = {}
        for(let formElementIdentifier in this.state.orderForm){
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value
        }
        this.setState({isLoading: true})
        const order = {
            ingredients:  this.props.ingredients,
            price:  this.props.totalprice,
            orderData : formData
           
        }
        axios.post('/orders.json',order)
        .then(response => this.setState({isLoading: false, confirmation: true}))
        .catch(error => {
            this.setState({isLoading: false})
            console.log(error)
        });
        // this.props.history.push('/')
    }


    checkValidity(value, rules) {

        let isValid = true

        if(!rules){
            return true
        }
        
        if(rules.required){
            isValid = value.trim() !== '' && isValid
        }

        if(rules.minLength){
            isValid = value.length >= rules.minLength && isValid
        }

        return isValid
    }

    inputChangedHadnler = (event,inputIdentifier)=>{
        
        const updatedOrderForm = { ...this.state.orderForm }        //cloning whole state
        const updatedElement = { ...updatedOrderForm[inputIdentifier]}  //cloning particular element out of whole state (deep cloning)

        updatedElement.value = event.target.value
        updatedElement.valid = this.checkValidity(updatedElement.value, updatedElement.validation)
        updatedElement.touched = true
        updatedOrderForm[inputIdentifier] = updatedElement

        let formIsValid = true
        for(let identifier in updatedOrderForm){
            formIsValid = updatedOrderForm[identifier].valid && formIsValid
        }
        this.setState({ orderForm : updatedOrderForm, formIsValid : formIsValid})


    }
    
    
 render(){
    console.log(this.state.orderForm)
    let formElementsArray = [];
    for( let key in this.state.orderForm){
        formElementsArray.push({
            id : key,
            config : this.state.orderForm[key]
        })
    }
    // console.log(formElementsArray)
    let form = (
            <form onSubmit={this.orderHandler}>
                {/* <Input  inputtype="input" type="email" name="email" placeholder="Your Email"/>
                <Input  inputtype="input" type="text" name="address" placeholder="Your Address"/>
                <Input  inputtype="input" type="text" name="name" placeholder="Your Name"/>
                <Input  inputtype="input" type="number" name="pin" placeholder="Pin Code"/> */}
                { formElementsArray.map((formElement) =>{
                    return <Input 
                        key = {formElement.id}
                        elementtype = {formElement.config.elementType}
                        elementConfig = {formElement.config.elementConfig}
                        value = {formElement.config.value} 
                        changed = {(event) => this.inputChangedHadnler(event,formElement.id)}
                        invalid = {!formElement.config.valid}
                        shouldValidate = {formElement.config.validation}
                        touched={formElement.config.touched}/>})
                }
                <Button btnType="Success" disabled={!this.state.formIsValid}>ORDER</Button>
            </form>
    );
    if(this.state.isLoading){
        form = <Spinner/>
    }
    return(
        <div className={classes.ContactData}>
            {form}
            
        </div>
    );
 }
}


export default Contact;