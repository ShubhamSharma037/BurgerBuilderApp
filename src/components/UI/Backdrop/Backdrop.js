import React from 'react';
import classes from './Backdrop.module.css';


const backDrop = (props) => { 


   return(

    props.show ? <div className={classes.Backdrop} 
    onClick={props.modalClosed}
    ></div> : null
   );

}


export default backDrop;