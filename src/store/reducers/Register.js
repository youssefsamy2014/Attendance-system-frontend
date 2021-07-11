import * as actionTypes from '../actions/actionsType';
import { updateObject } from '../../shared/utility';

const initialState = {
    message:'',
    error: null,
};

const registerStart = ( state, action ) => {
    return updateObject( state, { error: null} );
};

const registerSuccess = (state, action) => {
    return updateObject( state, { 
        message:action.message,
        error: null
     } );
};

const registerFail = (state, action) => {
    return updateObject( state, {
        error: action.error,
    });
};


const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.REGISTER_START: return registerStart(state, action);
        case actionTypes.REGISTER_SUCCESS: return registerSuccess(state, action);
        case actionTypes.REGISTER_FAIL: return registerFail(state, action);
        default:
            return state;
    }
};

export default reducer;