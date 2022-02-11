import React from 'react';
import classes from './NavigationItems.module.css';
import NavItem from './NavigationItem/NavigationItem'

const navItems = () => { 


   return(
       <ul className={classes.NavigationItems}>
            <NavItem link="/" exact active>BurgerBuilder</NavItem>
            <NavItem link = "/orders" >CheckOut</NavItem>
       </ul>
       
   );

}


export default navItems;