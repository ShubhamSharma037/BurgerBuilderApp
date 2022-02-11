import axios from 'axios';


const instance = axios.create({
    baseURL: 'https://burgerbuilder-3839a.firebaseio.com/',

})


export default instance;