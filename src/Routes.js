import React from "react";
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import history from './history';
import App from './App';
import LogoutContainer from './components/Logout';
import LoginContainer from './components/Login';
import MovieDetails from './components/MovieDetails';
import { useSelector } from 'react-redux';



const Routes = () => {
    var isAuthenticated = useSelector((state) => state.isAuthenticated)

    return (
        <Router history={history} >
            <div>
                <Switch>
                    <Route exact path="/" render={props => <LoginContainer {...props} />} />
                    <Route exact path="/logout" render={props => <LogoutContainer {...props} />} />
                    <Route exact path="/movies" render={props => isAuthenticated ? <App {...props} /> : <Redirect to='/' />} />
                    <Route exact path="/movies/:imdbID" render={props => isAuthenticated ? <MovieDetails {...props} /> : <Redirect to='/' />} />
                </Switch>
            </div>
        </Router >)
}



export default Routes;