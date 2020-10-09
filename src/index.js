import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './Routes';
import './index.css';
import { Provider } from 'react-redux';
import { store, persistor } from './store';
import { PersistGate } from 'redux-persist/integration/react'
import * as serviceWorker from './serviceWorker';


ReactDOM.render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      {Routes}
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);
serviceWorker.register()

