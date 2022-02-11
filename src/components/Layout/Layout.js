import React, {PureComponent} from 'react'
import classes from './Layout.module.css'
import Toolbar from '../Navigation/Toolbar/Toolbar'
import SideDrawer from '../Navigation/SideDrawer/SideDrawer'





class Layout extends PureComponent{

    state = {
        showSideDrawer : false
    }

    showSideDrawerHandler = () => {
        this.setState((prevState)=>{
            return { showSideDrawer : !prevState.showSideDrawer }
        }
         
        )
    }

    render()
    {
        return(
            <React.Fragment>
                <Toolbar drawerToggleClicked ={this.showSideDrawerHandler}/>
                <SideDrawer 
                    open={this.state.showSideDrawer}
                    closed={this.showSideDrawerHandler}
                />
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </React.Fragment>
        )
    }
} 
export default Layout;