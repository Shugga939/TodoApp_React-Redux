import {createStore, combineReducers} from 'redux'
import { formReducer } from './formReducer'
import {todoReducer} from './todoReducer'
import {userReducer} from './userReducer'


const rootReducer = combineReducers ({
  todos: todoReducer,
  form: formReducer,
  user: userReducer
})

export const store = createStore(rootReducer)