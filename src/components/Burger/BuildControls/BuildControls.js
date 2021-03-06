import React from 'react';
import classes from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl'

const BuildControls = (props) => { 

    const controls = [

        {label: 'Salad', type: 'salad'},
        {label: 'Cheese', type: 'cheese'},
        {label: 'Bacon', type: 'bacon'},
        {label: 'Meat', type: 'meat'}
    ];

   return(
       <div className= {classes.BuildControls} >
           <p>Price : <strong>{props.price}</strong></p>
           {controls.map(ctrl =>(
                <BuildControl 
                    key   = {ctrl.label} 
                    label = {ctrl.label}
                    added = {() => props.ingredientsAdded(ctrl.type)}
                    removed = {() => props.ingredientsRemoved(ctrl.type)}
                    disable = {props.disabled[ctrl.type]}
                />
               
            ))}
             <button 
                className = {classes.OrderButton} 
                disabled = {!props.purchasable}
                onClick = {props.ordered} >ORDER NOW</button>
       </div>
    );

}


export default BuildControls;