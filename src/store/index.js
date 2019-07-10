import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { reducer as formReducer } from 'redux-form';
import rootReducer from '../reducer/';
import thunk from 'redux-thunk';

const storeEnhacers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; //este es importante porque de aqui puedo hacer que funcione redux devtools

const masterRootReducer = combineReducers({
  rootReducer,
  form: formReducer,
});

const store = createStore(
  masterRootReducer,
  storeEnhacers(applyMiddleware(thunk)),
);
export default store;
