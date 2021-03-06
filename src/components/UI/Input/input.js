import React, { memo } from 'react';
import classes from './input.module.css'



const input = (props) => { 

    let inputElement = null;
    let inputClasses = [classes.InputElement]

    if(props.invalid && props.shouldValidate && props.touched){
        inputClasses.push(classes.Invalid)
    }

    switch(props.elementtype){
            case( 'input' ): 
                inputElement = <input 
                                    className={inputClasses.join(' ')} 
                                    {...props.elementConfig} 
                                    value={props.value} 
                                    onChange = {props.changed}/>
                break
            case( 'textarea' ):
                inputElement = <textarea 
                                    className={inputClasses.join(' ')} 
                                    {...props.elementConfig} 
                                    value={props.value}
                                    onChange = {props.changed}/>
                break
            case( 'select' ):
                
                inputElement = <select 
                                    className={inputClasses.join(' ')} 
                                    value={props.value} 
                                    onChange = {props.changed}>
                                    
                                    { props.elementConfig.options.map( option => (
                                        <option key = {option.value} value = {option.value}>{option.displayValue}</option>
                                    ))}
                               </select>
                                break
            default : 
            inputElement =null
            }

   return(
       <div className={classes.Input}>
           <label className={classes.Label}>{props.label}</label>
           {inputElement}
       </div>
   );

}


export default memo(input);