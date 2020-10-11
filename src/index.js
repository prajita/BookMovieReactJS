import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './Routes';
import './index.css';
import { Provider } from 'react-redux';
import { store, persistor } from './store';
import { PersistGate } from 'redux-persist/integration/react'
import * as serviceWorker from './serviceWorker';
import { Auth0Provider } from '@auth0/auth0-react';

const domain = process.env.REACT_APP_AUTH0_DOMAIN;
const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;
ReactDOM.render(
  <Auth0Provider domain={domain} clientId={clientId} 
  redirectUri={window.location.origin}>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Routes/>
      </PersistGate>
    </Provider>
  </Auth0Provider>,
  document.getElementById('root')
);
serviceWorker.register()

