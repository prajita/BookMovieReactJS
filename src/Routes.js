import React from "react";
import { Router, Route } from 'react-router-dom';
import history from './history';
import App from './App';
import LoginContainer from './Login';
import MovieDetails from './MovieDetails';

export default (
    <Router history={history} >
        <div>
            <Route exact path="/" render={props => <LoginContainer {...props} />} />
            <Route exact path="/movies" render={props => <App {...props} />} />
            <Route exact path="/movies/:imdbID" render={props => <MovieDetails {...props} />} />

        </div>
    </Router >


)