import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {Provider} from 'react-redux';
import {createStore , applyMiddleware,compose,combineReducers} from 'redux';
import thunk from 'redux-thunk';
import session from './store/reducers/session'
import register from './store/reducers/Register'
import image from './store/reducers/image'
import 'bootstrap/dist/css/bootstrap.min.css';
import * as serviceWorker from './serviceWorker';

const rootReducer=combineReducers({
  register:register,
  auth:session,
  img:image,

  });

  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const store =createStore(rootReducer,composeEnhancers(applyMiddleware(thunk)));
  if('serviceWorker' in navigator){
    window.addEventListener('load',()=>{
      navigator.serviceWorker.register('./serviceworker.js')
      .then((reg)=>console.log('Success: ',reg.scope))
      .catch((err)=> console.log('Failure: ',err))

    })
  }
  
const app  =(
  <Provider store={store}>
   
        <React.StrictMode>
          <App />
        </React.StrictMode>
     </Provider>
 
);
ReactDOM.render(
  app,
  document.getElementById('root')
);


serviceWorker.register();
