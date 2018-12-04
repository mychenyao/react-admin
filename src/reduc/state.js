import {createStore, combineReducers} from 'redux'
import reducer from './reducers'
const initValue = {
    channelDetailShow: false
}
const store = createStore(reducer, initValue)

export default store