

// reciepe of making a burger

import React, {Component} from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import axios from '../../axios-order'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'



const INGREDIENT_PRICE = {
    salad : 10,
    cheese : 24,
    meat : 20,
    bacon : 30,
}



class BurgerBuilder extends Component { 
    

    state = {

        ingredients : null,
        price : 5,
        purchasable : false,
        purchasing : false,
        isLoading  : false,
        confirmation : false
    }

    componentDidMount(){
        // console.log(this.props)
        axios.get('https://burgerbuilder-3839a.firebaseio.com/ingredients.json')
        .then(res => this.setState({ingredients : res.data}),
        err => console.log('Error' + err))
    }


    purchaseCancelHandler = () =>{

        
        if(this.state.confirmation){
            const initialState = {...this.state.ingredients}
            for(let key in initialState){
                initialState[key] = 0;
            }
            
                      
            this.setState({
                ingredients : initialState,
                price: 5,
                purchasing: false,
                confirmation: false,
                purchasable: false
            })
        }

        else{

            this.setState({
                purchasing: false, 
            })
        }
    }


    purchaseContinueHandler = () =>{

        // this.setState({isLoading: true})
        // const order = {
        //     ingredients:  this.state.ingredients,
        //     price:  this.state.price
        // }
        // axios.post('/orders.json',order)
        // .then(response => this.setState({isLoading: false, confirmation: true}))
        // .catch(error => {
        //     this.setState({isLoading: false, purchasing: false })
        //     console.log(error)
        // });


        const queryParams = [];
        for( let i in this.state.ingredients){
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]))
        }
        queryParams.push('price=' + this.state.price)
        const queryString = queryParams.join('&')
        // console.log(queryString)
        
        this.props.history.push({
            pathname : '/checkout',
            search : '?' + queryString
        })
    }

   
    purchasingHandler = () => {
        this.setState({
            purchasing: true
        })
        
    }


    updatePurchase = (ingredients) => {

        //Object.keys returns array of object's key values
        const sum = Object.keys(ingredients)
            .map( igkey => ingredients[igkey]) //returing array of values of the corresponding keys
            .reduce((sum,el) => {       //summing up all ingredients value, el is the value from map array
                // console.log(sum)
                return sum + el
            }, 0);  // default value of sum is 0

            this.setState({
                purchasable : sum > 0 
            })     
    }


    addIngredientHandler = (type) =>{

        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;

        const price  = INGREDIENT_PRICE[type];
        const newPrice = this.state.price + price;


        const updatedIngredient = { ...this.state.ingredients }
        updatedIngredient[type] = updatedCount;


        this.setState({
            ingredients: updatedIngredient,
            price: newPrice

        })
       this.updatePurchase(updatedIngredient);
    }


    removeIngredients = (type) =>{
        const oldCount = this.state.ingredients[type];

        if( oldCount <= 0 ){
            return ; 
        } 
        
        const updatedCount = oldCount - 1;

        const price  = INGREDIENT_PRICE[type];
        const newPrice = this.state.price - price;


        const updatedIngredient = { ...this.state.ingredients }
        updatedIngredient[type] = updatedCount;

    
        this.setState({
            ingredients: updatedIngredient,
            price: newPrice

        })
        this.updatePurchase(updatedIngredient);
    }

    

 render(){
    
    const disableInfo = {
        ...this.state.ingredients
    }

    for ( let key in disableInfo){
        disableInfo[key] = disableInfo[key] <= 0 ;
    }

    let order_summary = null
    let burger = <Spinner/>
    
    if(this.state.ingredients){
        burger = 
        <React.Fragment>
            <Burger ingredients={this.state.ingredients}/>
            <BuildControls
                ingredientsAdded = {this.addIngredientHandler}
                ingredientsRemoved = {this.removeIngredients}
                disabled = {disableInfo}
                price = {this.state.price}
                purchasable = {this.state.purchasable}
                ordered = {this.purchasingHandler}
            />
        </React.Fragment>
       order_summary =
        <OrderSummary 
            price = {this.state.price}
            purchaseContinue = {this.purchaseContinueHandler}
            purchaseCancel = {this.purchaseCancelHandler}
            ingredients={this.state.ingredients}
        />

        if(this.state.isLoading){
            order_summary = <Spinner/>
        }
    }

    
    
    return(
        <React.Fragment>
            <Modal show={this.state.purchasing} 
                hide = {this.purchaseCancelHandler}
            >
            {this.state.confirmation ? <h3>Your order has been confirmed...</h3> :order_summary}
            </Modal>
             
            {burger}
         </React.Fragment>
    );
 }
}


export default withErrorHandler(BurgerBuilder,axios);






// const BurgerBuilder = () =>{


//     const [burgerState,setBurgerState] = useState({
//         ingredients : {
//             salad : 0,
//             bacon : 0,
//             cheese : 0,
//             meat : 0
//         },
//         price : 5,
//         purchasable : false

//     });


//     const updatePurchase = (ingredients) => {

        
//         const sum = Object.keys(ingredients)
//             .map( igkey => ingredients[igkey])
//             .reduce((sum,el) => {
//                 // console.log(sum)
//                 return sum + el
//             }, 0);

          
//         return(
//             setBurgerState({
//                 purchasable : sum > 0 
//             }) 
//         )    
//     }


//     const addIngredientHandler = (type) =>{

//         const oldCount = burgerState.ingredients[type];
//         const updatedCount = oldCount + 1;

//         const price  = INGREDIENT_PRICE[type];
//         const newPrice = burgerState.price + price;


//         const updatedIngredient = { ...burgerState.ingredients }
//         updatedIngredient[type] = updatedCount;


//         setBurgerState({
//             ingredients: updatedIngredient,
//             price: newPrice

//         })
//         updatePurchase(updatedIngredient);
//     }


//     const removeIngredients = (type) =>{
//         const oldCount = burgerState.ingredients[type];

//         if( oldCount <= 0 ){
//             return ; 
//         } 
        
//         const updatedCount = oldCount - 1;

//         const price  = INGREDIENT_PRICE[type];
//         const newPrice = burgerState.price - price;


//         const updatedIngredient = { ...burgerState.ingredients }
//         updatedIngredient[type] = updatedCount;

    
//         setBurgerState({
//             ingredients: updatedIngredient,
//             price: newPrice

//         })
//         updatePurchase(updatedIngredient);
//     }

    
//     const disableInfo = {
//         ...burgerState.ingredients
//     }

//     for ( let key in disableInfo){
//         disableInfo[key] = disableInfo[key] <= 0 ;
//     }

//     return(
//         <Aux>
//             <Burger ingredients={burgerState.ingredients}/>
//             <BuildControls
//                 ingredientsAdded = {addIngredientHandler}
//                 ingredientsRemoved = {removeIngredients}
//                 disabled = {disableInfo}
//                 price = {burgerState.price}
//                 purchasable = {burgerState.purchasable}
//             />
            
//         </Aux>
        
//     )
// }


// export default BurgerBuilder;