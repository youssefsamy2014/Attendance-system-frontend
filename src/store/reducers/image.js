import * as actionTypes from '../actions/actionsType';
import { updateObject } from '../../shared/utility';

const initialState = {
    images: [],
    error:null,
};

const fetchImageStart = ( state, action ) => {
    return updateObject( state, { error: null} );
};

const fetchImageSuccess = (state, action) => {
    return updateObject( state, { 
        images:action.images,
        error: null,
     } );
};

const deleteImages = (state, action) => {
    return updateObject( state, { 
        images:[],
        error: null,
     } );
};

const fetchImageFail = (state, action) => {
    return updateObject( state, {
        error: action.error,
    });
};


const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.FETCH_IMAGE_START: return fetchImageStart(state, action);
        case actionTypes.FETCH_IMAGE_SUCCESS: return fetchImageSuccess(state, action);
        case actionTypes.IMAGE_DELETE: return deleteImages(state, action);
        case actionTypes.FETCH_IMAGE_FAIL: return fetchImageFail(state, action);
        default:
            return state;
    }
};

export default reducer;