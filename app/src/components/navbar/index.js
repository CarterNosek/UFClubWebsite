// https://www.geeksforgeeks.org/create-a-responsive-navbar-using-reactjs/

import React from "react";
import {
    Nav,
    NavLink,
    Bars,
    NavMenu
} from "./elements";

function Navbar() {
    return (
        <>
            <Nav>
                <Bars />
                <NavMenu>
                    <NavLink to="/" >
                        Home
                    </NavLink>
                    <NavLink to="/dashboard" activeStyle>
                        Dashboard
                    </NavLink>
                    <NavLink to="/calendar" activeStyle>
                        Calendar
                    </NavLink>
                    <NavLink to="/profile" activeStyle>
                        Profile
                    </NavLink>
                </NavMenu>
            </Nav>
        </>
    );
};

export default Navbar;
