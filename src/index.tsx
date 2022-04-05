import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {App} from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from 'react-router-dom';
import {store} from './components/redux/store';


function renderApp() {
    ReactDOM.render(
        <BrowserRouter>
            <App state={store.getState()} updateNewPostTitle={store.updateNewPostTitle.bind(store)}/>
        </BrowserRouter>,
        document.getElementById('root')
    );
}

renderApp()

store.subscribe(renderApp)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
