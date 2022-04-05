import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {App} from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from 'react-router-dom';
import {store} from './components/redux/redux-store';
import {Provider} from 'react-redux';


export const StoreContext = React.createContext(null)

const Provide = (props: any) => {
    return <StoreContext.Provider value={props.store}>
        {props.children}
    </StoreContext.Provider>
}

function renderApp() {
    ReactDOM.render(
        <BrowserRouter>
            <Provide store={store}>
                <App/>
            </Provide>
        </BrowserRouter>
        ,

        // <StoreContext.Provider value={store}>
        //     <BrowserRouter>
        //         <App/>
        //     </BrowserRouter>
        // </StoreContext.Provider>,
        document.getElementById('root')
    );
}

renderApp()

store.subscribe(renderApp)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
