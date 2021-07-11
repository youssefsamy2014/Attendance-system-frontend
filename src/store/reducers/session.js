import * as actionTypes from '../actions/actionsType';
import { updateObject } from '../../shared/utility';
// import { authCheckState } from '../actions';

const initialState = {
    token: null,
    userid: null,
    usertype:null,
    studentid:null,
    name:null,
    error: null,
    authRedirectPath: localStorage.getItem('path')
};

const authStart = ( state, action ) => {
    return updateObject( state, { error: null} );
};

const authSuccess = (state, action) => {
    return updateObject( state, { 
        token: action.token,
        userid: action.userid,
        usertype:action.usertype,
        studentid:action.studentid,
        name:action.name,
        error: null
     } );
};

const authFail = (state, action) => {
    return updateObject( state, {
        error: action.error,
    });
};

const authLogout = (state, action) => {
    return updateObject(state, { token: null, userid: null,usertype:null,studentid:null,name:null });
};

const setAuthRedirectPath = (state, action) => {
    return updateObject(state, { authRedirectPath: action.path })
}

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.AUTH_START: return authStart(state, action);
        case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
        case actionTypes.AUTH_FAIL: return authFail(state, action);
        case actionTypes.AUTH_LOGOUT: return authLogout(state, action);
        case actionTypes.SET_AUTH_REDIRECT_PATH: return setAuthRedirectPath(state,action);
        default:
            return state;
    }
};

export default reducer;