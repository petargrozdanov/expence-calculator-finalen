import { createStore, combineReducers, applyMiddleware } from 'redux'
import logger from 'redux-logger'
import { itemsReducer } from './reducers/itemsReducer'

const singleReducer = combineReducers({
    itemsReducer,
})

// Create an epmty store object
const store = createStore(
    singleReducer,
    applyMiddleware(logger)
)

console.log(store.getState())

export default store
