import React from "react";
import { useAuth0 } from '@auth0/auth0-react';
import '../../App.css';


const LogoutContainer = () => {
    const { logout } = useAuth0();
    const loginAgain = function () {
        logout({ returnTo: 'http://localhost:3001' });
    }
    return (
        <React.Fragment>
            <div className="logoutHeader"> <h2 >Thank you for visiting my page !!</h2>
                <button onClick={() => loginAgain()}>login again</button>
            </div>
        </React.Fragment>
    )
}
export default LogoutContainer;