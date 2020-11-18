import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {Provider} from 'react-redux';
import {createStore, combineReducers} from 'redux';
import addproduct from './Containers/AddProduct/addproduct';
import {mainReducer} from './Reducers/mainReducer';
import {productReducer} from './Reducers/productsReducer';
import {accountReducer} from './Reducers/accountReducer';

const rootReducer = combineReducers({
    wholeData: mainReducer,
    productPageData: productReducer,
    accountPageData: accountReducer
})

const globalStore = createStore(rootReducer);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={globalStore}>
        <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
