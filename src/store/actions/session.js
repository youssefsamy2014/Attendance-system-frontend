import axios from '../../axios-order';
import * as actionTypes from './actionsType';
// import Cookies from 'universal-cookie';



// const cookies = new Cookies();

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (t, uid,ut,sid,n) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        token: t,
        userid: uid,
        usertype: ut,
        studentid: sid,
        name: n
    };
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('ExpirationDate');
    localStorage.removeItem('userid');
    localStorage.removeItem('usertype');
    localStorage.removeItem('studentid');
    localStorage.removeItem('name');
    return {
        type: actionTypes.AUTH_LOGOUT
    };
};

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime*1000);
    };
};

export const auth = (payload) => {
    return dispatch => {
        dispatch(authStart());
        let axiosConfig = {
            headers: {
                'x-access-token':localStorage.getItem('token'),
                // 'Content-Type': 'application/json;charset=UTF-8',
                // 'Access-Control-Allow-Origin': "*",
                // 'Access-Control-Allow-Credentials': true,
            }
        };
        axios.post('/signin', payload,axiosConfig)
            .then(response => {

                const exp =response.data.expIn
                const Token = response.data.token.replace(/^b/, '')
                const UserId =response.data.userID
                const UserType =response.data.UserType
                const StudentID =response.data.FacultyID
                const Name =response.data.Name
                const ExpirationDate = new Date(new Date().getTime() + exp * 1000);
                // cookies.set('name', Name, { path: '/' });
                localStorage.setItem('token',Token);
                localStorage.setItem('ExpirationDate', ExpirationDate);
                localStorage.setItem('userid', UserId);
                localStorage.setItem('usertype', UserType);
                localStorage.setItem('studentid',StudentID );
                localStorage.setItem('name',Name );
                dispatch(authSuccess(Token, UserId,UserType,StudentID,Name));
                dispatch(checkAuthTimeout(exp));
            })
            .catch(err => {
                
                let er=err.message === 'Request failed with status code 401'
                console.log(err.message)

                if(!er){
                  
                    dispatch(authFail("Network error"));

                }if(er){
                    dispatch(authFail( err.response.data.error));

                }
            });
    };
};

export const setAuthRedirectPath = (path) => {
    localStorage.setItem('path',path)
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    };
};

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (!token) {
            dispatch(logout());
        } else {
            const expirationDate = new Date(localStorage.getItem('ExpirationDate'));
            if (expirationDate <= new Date()) {
                dispatch(logout());
            } else {
                const userId = localStorage.getItem('userid');
                const usertype = localStorage.getItem('usertype');
                const name = localStorage.getItem('name');
                const studentid = localStorage.getItem('studentid');
                dispatch(authSuccess(token, userId,usertype,studentid,name));
                dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000 ));
            }   
        }
    };
};