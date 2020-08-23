import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { getPages, switchPage } from "../reducers/navigationSlice"
import { useDispatch } from 'react-redux'
import logo from '../images/logo_square.png'

const NavBar = () => {
    const pages = useSelector(getPages);
    const dispatch = useDispatch();

    return (
    <div>
        <Navbar fixed="top" bg="dark" expand="sm" variant="dark" >
        <Navbar.Brand bg="light" href="#home">
        Div Graphs{' '}
        <img
            alt="logo"
            src={logo}
            width="30"
            height="30"
            className="mx-2"
        />
        </Navbar.Brand>

        <Nav className="ml-auto">
            <Link className="btn btn-info" role="button" to="/login" style={{fontSize:'13px'}}>Logout</Link>
        </Nav>
        </Navbar>

        <div className="ui vertical left fixed labeled icon menu" style={{top: "55px"}}>
            <Link to="/Dashboard" className={pages[0]} onClick={() => dispatch(switchPage("dashboard"))}>
                <i aria-hidden="true" className="newspaper icon"></i>
                Dashboard</Link>
            <Link to="/Reports" className={pages[1]} onClick={() => dispatch(switchPage("reports"))}>
            <i aria-hidden="true" className="line chart icon"></i>
                Reports</Link>
            <Link to="/Settings" className={pages[2]} onClick={() => dispatch(switchPage("settings"))}>
            <i aria-hidden="true" className="options icon"></i>
                Settings</Link>
        </div>
    </div>

    );
};

export default NavBar;