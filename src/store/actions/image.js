import axios from '../../axios-order';
import * as actionTypes from './actionsType';

export const fetchImageStart = () => {
    return {
        type: actionTypes.FETCH_IMAGE_START
    };
};

export const fetchImageSuccess = (images) => {
    
    return {
        type: actionTypes.FETCH_IMAGE_SUCCESS,
        images:images
    };
};


export const deleteImages=()=>{
    return {
        type: actionTypes.IMAGE_DELETE,
        images:null
    };
}

export const fetchImageFail = (error) => {
    return {
        type: actionTypes.FETCH_IMAGE_FAIL,
        error: error
    };
};


export const fetchImage = (id,payload) => {
    return dispatch => {
        dispatch(fetchImageStart());
        let axiosConfig = {
            headers: {
                'x-access-token':localStorage.getItem('token'),
                'Content-Type': 'application/json;charset=UTF-8',
                'Access-Control-Allow-Origin': "*",
                'Access-Control-Allow-Credentials': true,
            },crossDomain: true
        };
        axios.post('/registerWithFaces/'+id, payload,axiosConfig)
        .then( (res)=> {
        const photos =[];
        for (let key in res.data.images) {
        photos.push({
        id: key,
        ...res.data.images[key]
        });
        }
    dispatch(fetchImageSuccess(photos));
    })
    .catch( (err)=> { 
                        let er=err.message === 'Request failed with status code 401'

        if(!er){
          
            dispatch(fetchImageFail("Network error"));

        }if(er){
            dispatch(fetchImageFail( err.response.data.error));

        }

    });};
};



export const fetchFace = (id) => {
    return dispatch => {
        dispatch(fetchImageStart());
        let axiosConfig = {
            headers: {
                'x-access-token':localStorage.getItem('token'),
                'Content-Type': 'application/json;charset=UTF-8',
                'Access-Control-Allow-Origin': "*",
                'Access-Control-Allow-Credentials': true,
            },crossDomain: true
        };
        axios.get('/face/'+id,axiosConfig)
        .then( (res)=> {
        const photos =[];
        for (let key in res.data.images) {
        photos.push({
        id: key,
        ...res.data.images[key]
        });
        }
    dispatch(fetchImageSuccess(photos));
    })
    .catch( (err)=> { 
                        let er=err.message === 'Request failed with status code 401'

        if(!er){
          
            dispatch(fetchImageFail("Network error"));

        }if(er){
            dispatch(fetchImageFail( err.response.data.error));

        }

    });};
};





export const fetchCard = (id) => {
    return dispatch => {
        dispatch(fetchImageStart());
        let axiosConfig = {
            headers: {
                'x-access-token':localStorage.getItem('token'),
                'Content-Type': 'application/json;charset=UTF-8',
                'Access-Control-Allow-Origin': "*",
                'Access-Control-Allow-Credentials': true,
            },crossDomain: true
        };
        axios.get('/card/'+id,axiosConfig)
        .then( (res)=> {
        const photos =[];
        for (let key in res.data.images) {
        photos.push({
        id: key,
        ...res.data.images[key]
        });
        }
    dispatch(fetchImageSuccess(photos));
    })
    .catch( (err)=> { 
                        let er=err.message === 'Request failed with status code 401'

        if(!er){
          
            dispatch(fetchImageFail("Network error"));

        }if(er){
            dispatch(fetchImageFail( err.response.data.error));

        }
    })
    };  
};


export const deletes = () => {
    return dispatch => {

    dispatch(deleteImages());
    }
}