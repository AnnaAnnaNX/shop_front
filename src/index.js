import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import {takeEvery}  from 'redux-saga/effects'
import {put, call}  from 'redux-saga/effects'
import { Provider } from 'react-redux'
import axios from 'axios'
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
// import rootReducer from './reducers'
import { reducer as formReducer } from 'redux-form'

import snackbar from './reducers/snackbar'
import searchMusic from './reducers/searchMusic'
import product from './reducers/product'
import {
  setListLinks,
	 setProduct
} from './actions/index'

// Sagas
function* watchFetchDog() {
	yield takeEvery('FETCH_COUBS', fetchCoubs);
	yield takeEvery('FETCH_PRODUCT', fetchProduct);
}

function* fetchProduct(payload) {
	try {
		console.log('fetchProduct id', payload.id)
		const data = yield call(() => {
				return axios.get(
					`http://localhost:3000/api/ModelProducts/${payload.id}`,
					{
						crossDomain: true,
						method: 'GET',
						mode: 'no-cors',
						headers: {
							'Access-Control-Allow-Origin': '*',
							'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, OPTIONS',
							'Access-Control-Allow-Headers': 'Content-Type, X-Auth-Token, Origin',
							'Content-Type': 'application/json'
						}
					}
				)
			}
		);
		console.log('data ', data);
		yield put(setProduct(data && data.data ));
		// yield put(requestDogSuccess(data));
	} catch (error) {
		// yield put(requestDogError());
		console.log('fetchCoubs error')
	}
}


function* fetchCoubs(text) {
  try {
  	console.log('fetchCoubs text', text)
    // yield put(requestDog());
    const data = yield call(() => {
      return axios.get(
	      		`https://cors-anywhere.herokuapp.com/https://coub.com/api/v2/search/coubs?q=${text && text.text}&order_by=likes_counts&page=10`,
	      		{
	      			crossDomain: true,
				  method: 'GET',
				  mode: 'no-cors',
				  headers: {
				    'Access-Control-Allow-Origin': '*',
				    'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, OPTIONS',
				    'Access-Control-Allow-Headers': 'Content-Type, X-Auth-Token, Origin',
				    'Content-Type': 'application/json'
				  }
				}
	      	 )
		}
    );
    console.log('data ', data);
    yield put(setListLinks(data && data.data && data.data.coubs));
    // yield put(requestDogSuccess(data));
  } catch (error) {
    // yield put(requestDogError());
    console.log('fetchCoubs error')
  }
}


const rootReducer = combineReducers({
	snackbar,
	searchMusic,
	product,
  // ...your other reducers here
  // you have to pass formReducer under 'form' key,
  // for custom keys look up the docs for 'getFormState'
  form: formReducer
})

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
	rootReducer,
  applyMiddleware(sagaMiddleware)
  )

sagaMiddleware.run(watchFetchDog);

ReactDOM.render(
	<Provider store={store}>
		<App />
  	</Provider>
  , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
