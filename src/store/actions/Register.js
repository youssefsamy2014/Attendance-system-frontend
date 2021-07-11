import axios from '../../axios-order';
import * as actionTypes from './actionsType';

export const registerStart = () => {
    return {
        type: actionTypes.REGISTER_START
    };
};

export const registerSuccess = (message) => {
    return {
        type: actionTypes.REGISTER_SUCCESS,
        message:message
    };
};

export const registerFail = (error) => {
    return {
        type: actionTypes.REGISTER_FAIL,
        error: error
    };
};


export const register = (payload) => {
    return dispatch => {
        dispatch(registerStart());
        let url ='/Registration';
        
        axios.post(url, payload)
            .then(response => {

                dispatch(registerSuccess(response.data.message));
            })
            .catch(err => {
                let er=err.message === 'Request failed with status code 401'
                if(!er){
                  
                    dispatch(registerFail("Network error"));

                }if(er){
                    dispatch(registerFail( err.response.data.error));

                }
            });
    };
};
