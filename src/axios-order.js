import axios from 'axios';


const instance = axios.create({

    // baseURL:'http://127.0.0.1:5000/',
    // baseURL:'http://192.168.43.221:5000/',
    // baseURL:'http://169.254.20.44:5000/',
    // baseURL:'http://169.254.20.44:5000/',
    baseURL:'http://192.168.1.10:5000/',
    // baseURL:'http://cloud.3545consulting.com:3545/'

});

export default instance;