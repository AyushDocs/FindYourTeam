/** @format */

import combinedReducers from './reducers';

const { createStore } = require('redux');

const store = createStore(combinedReducers);

export default store