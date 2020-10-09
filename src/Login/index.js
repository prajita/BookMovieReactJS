import React, { Component } from "react";
import { loadMovies } from '../actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';


class LoginContainer extends Component {

    constructor(props) {
        super(props);
        this.submit = this.submit.bind(this)
    }
    submit() {
        this.props.history.push('/movies');
        this.props.loadMovies();
    }
    render() {
        return (
            <React.Fragment>

                <div className="login">
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
                        <button type="submit" onClick={() => this.submit()}>Login</button>
                    </div>
                </div>
            </React.Fragment>
        )
    }
};
const mapStateToProps = (state) => {
    return {
    };
}
const mapDispatchToProps = (dispatch) => {
    return (
        bindActionCreators(
            {
                loadMovies
            }, dispatch
        )
    )
}
export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);

