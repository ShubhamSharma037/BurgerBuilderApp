import React from 'react';
import classes from './Order.module.css';


const order = (props) => { 

    const Ingredients = [];
    for(let ingName in props.ingredients){
        Ingredients.push({
            name : ingName,
            amount : props.ingredients[ingName]
        })
        // console.log(Ingredientss)
    }


    const ingredientsOutput = Ingredients.map(ig => {
        return <span style={{
            textTransform: 'capitalize',
            display: 'inline-block',
            margin: '0 8px',
            border: '1px solid #ccc',
            padding: '5px'
            }}
        key={ig.name}> {ig.name} : {ig.amount}</span>
    })


   return(
       <div className={classes.Order}>
           <p>Ingrediets: {ingredientsOutput}</p>
   <p>Price : <strong>RS. {Number.parseFloat(props.price)}</strong></p>
       </div>
   );

}


export default order;