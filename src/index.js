import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './store';
import { initializeApp } from "firebase/app";

initializeApp({
  apiKey: "AIzaSyA2mHaadh5i-JuXvnbsfQDj_uH-Wm959rE",
  authDomain: "tosoapp-c7173.firebaseapp.com",
  projectId: "tosoapp-c7173",
  storageBucket: "tosoapp-c7173.appspot.com",
  messagingSenderId: "883317951366",
  appId: "1:883317951366:web:74c10c11868135ad95ba07"
});

ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,document.getElementById('root')
);