import React, {Component} from 'react';
import Order from '../../components/Order/Order'
import axios from '../../axios-order';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'


class Orders extends Component { 

    state = {
        loading: true,
        orders: []
    }
    
    componentDidMount(){
        axios.get('/orders.json').then(res=>{
            const fetchOrders = [];
            for(let key in res.data){
                fetchOrders.push({
                    ...res.data[key],
                    id : key
                })
            }
            this.setState({loading: false,
                orders : fetchOrders})
        })
        .catch(err=>console.log(err))
    }

    // componentDidUpdate(){
    //     console.log(this.state)
    // }


    render(){


        return(
            <div>
                {this.state.orders.map(order => (
                    <Order 
                        key={order.id}
                        ingredients={order.ingredients}
                        price={order.price} />
                ))}
               

            </div>
        );
    }
}


export default withErrorHandler(Orders,axios);