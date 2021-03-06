import React, { memo } from "react";
import Modal from "react-modal";
import { logoutState, loadMovies } from '../../actions';
import { useAuth0 } from '@auth0/auth0-react';
import JSONPretty from 'react-json-pretty';
import { useDispatch } from 'react-redux';
import '../../App.css';
import SpinnerComponent from '../SpinnerComponent';



const LoginContainer = memo(({ ...props }) => {
    const { loginWithRedirect, isAuthenticated, user ,logout, isLoading} = useAuth0();
    const dispatch = useDispatch();
    const userLogout = () => {        
        dispatch(logoutState());
        logout({ returnTo: window.location.origin+'/logout' });
        //logout({returnTo: 'http://localhost:3001/logout'});
    }
    const proceed = () => {
        dispatch(loadMovies(user.given_name));
        props.history.push('/movies');
    }

    return (
        <React.Fragment>
            {isLoading && <SpinnerComponent/>}

            {!isAuthenticated && !isLoading && <div className="login">
                <h1 className="loginHeader">Login Form</h1><br />
                <div>
                    <img src="https://www.w3schools.com/howto/img_avatar2.png" alt="Avatar" className=" imgcontainer avatar" />
                </div><br />
                <div className="flex-container-column ">
                    <div><label><b>Username</b></label>
                        <input className="form-control" type="text" placeholder="Enter Username" name="uname" required /></div>
                    <div><label><b>Password</b></label>
                        <input className="form-control" type="password" placeholder="Enter Password" name="psw" required /></div>
                    <br />
                    <button onClick={()=> loginWithRedirect()}>Login</button>
                </div>
            </div>}
            {isAuthenticated && !isLoading  &&
                <div>
                    <Modal isOpen={true} ariaHideApp={false} className="modalclass">
                        <div >
                            <h2 className="loginHeader">Congratulations !! you have logged in successfully !!</h2>
                            <h3 className="loginHeader">Hello, {user.given_name||user.nickname} !!</h3>
                            <JSONPretty data={user.email} />
                            <JSONPretty data={user} />
                            <button className="modal_button_style" onClick={userLogout}>Logout</button>
                            <button  className="modal_button_style" onClick={proceed}>Proceed</button>
                        </div>
                    </Modal>
                </div>
            }
        </React.Fragment>
    )

});

export default LoginContainer;

/*{
  "given_name": "Prajita",
  "family_name": "Sinha",
  "nickname": "prajitacst",
  "name": "Prajita Sinha",
  "picture": "https://lh3.googleusercontent.com/a-/AOh14GiHEK4kF5UGhpnHb3wPzNqo0Hq9XT2YKVZhVM7bcw=s96-c",
  "locale": "en-GB",
  "updated_at": "2020-10-09T21:43:57.376Z",
  "email": "prajitacst@gmail.com",
  "email_verified": true,
  "sub": "google-oauth2|105862490003744663435"
}*/