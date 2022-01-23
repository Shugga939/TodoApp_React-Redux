import {createStore, combineReducers} from 'redux'
import { authReducer } from './authReducer'
import { formReducer } from './formReducer'
import {todoReducer} from './todoReducer'
import {userReducer} from './userReducer'


const rootReducer = combineReducers ({
  todos: todoReducer,
  form: formReducer,
  user: userReducer,
  auth: authReducer
})

export const store = createStore(rootReducer)