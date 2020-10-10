import React, { memo } from "react";
import Modal from "react-modal";
import { logout, loadMovies } from '../actions';
import { useAuth0 } from '@auth0/auth0-react';
import JSONPretty from 'react-json-pretty';
import { useDispatch } from 'react-redux';
import '../App.css';


const LoginContainer = memo(({ ...props }) => {
    const { loginWithRedirect, isAuthenticated, user } = useAuth0();
    const dispatch = useDispatch();
    const submit = () => {
        loginWithRedirect();
    }
    const userLogout = () => {
        dispatch(logout());
        props.history.push('/logout');
    }
    const proceed = () => {
        dispatch(loadMovies())
        props.history.push('/movies');
    }

    return (
        <React.Fragment>

            {!isAuthenticated && <div className="login">
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
                    <button type="submit" onClick={submit}>Login</button>
                </div>
            </div>}
            {isAuthenticated &&
                <div>
                    <Modal isOpen={true} ariaHideApp={false} className="modalclass">
                        <div >
                            <h2 className="loginHeader">Congratulations !! you have logged in successfully !!</h2>
                            <h3 className="loginHeader">Hello, {user.given_name} !!</h3>
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