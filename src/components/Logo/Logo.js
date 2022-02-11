import React from 'react';
import logo from '../../images/burger-logo.png'; 
import classes from './Logo.module.css';


const burgerLogo = (props) => { 
            

   return(
       <div className={classes.Logo}>
           <img src={logo} alt='LOGO'/>
       </div>
   );

}


export default burgerLogo;