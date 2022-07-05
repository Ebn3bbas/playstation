import React from 'react';
import ReactDOM from 'react-dom';
import './index.module.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { CookiesProvider } from 'react-cookie';
import store from './store';

// import dotenv from 'dotenv';
// import dotenvexpand from 'dotenv-expand';

// const myEnv = dotenv.config();
// dotenvexpand.expand(myEnv);
// console.log(process.env);

ReactDOM.render(
    <BrowserRouter>
        <Provider store={store}>
            <CookiesProvider>
                <App />
            </CookiesProvider>
        </Provider>
    </BrowserRouter>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
