import { createStore, applyMiddleware } from 'redux';
import persistedReducer from '../reducers';
import thunk from 'redux-thunk';
import { logger } from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import {  persistStore } from 'redux-persist';

//save state to localstorage and load data from localstorage
// function saveToLocalStorage(state) {
//     try {
//         const serializedState = JSON.stringify(state);
//         localStorage.setItem('state', serializedState);
//     } catch (e) {
//         console.log(e);
//     }

// }

// function loadFromLocalStorage() {
//     try {
//         const serializedState = localStorage.getItem('state');
//         if (serializedState == null) return undefined;
//         return JSON.parse(serializedState);
//     } catch (e) {
//         console.log(e);
//         return undefined;
//     }
// }
// const persistedState = loadFromLocalStorage();

const configureStore = () => {
    return createStore(
        persistedReducer,
        composeWithDevTools(
            applyMiddleware(thunk, logger)
        )
    );
}

export const store = configureStore();
//store.subscribe(() => saveToLocalStorage(store.getState()));

export const persistor = persistStore(store);
