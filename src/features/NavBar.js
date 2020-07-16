import React from 'react';
import { Link } from 'react-router-dom';
import { CSVUploader } from "../features/CSVUploader";
import { Navbar, Nav } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { getPages, switchPage } from './navigationSlice'
import { useDispatch } from 'react-redux'



const NavBar = () => {
    const pages = useSelector(getPages);
    const dispatch = useDispatch();
    return (
    <div>
        <Navbar bg="dark" expand="lg" variant="dark" >
        <Navbar.Brand bg="light" href="#home">Investment Web App</Navbar.Brand>
        <Nav class="ml-auto">
            <CSVUploader />
        </Nav>
        </Navbar>

        <div class="ui teal vertical left fixed labeled icon menu" style={{top: "50px"}}>
            <Link to="/Dashboard" class={pages[0]} onClick={() => dispatch(switchPage("dashboard"))}>
                <i aria-hidden="true" class="newspaper icon"></i>
                Dashboard</Link>
            <Link to="/Reports" class={pages[1]} onClick={() => dispatch(switchPage("reports"))}>
            <i aria-hidden="true" class="line chart icon"></i>
                Reports</Link>
            <Link to="/Settings" class={pages[2]} onClick={() => dispatch(switchPage("settings"))}>
            <i aria-hidden="true" class="options icon"></i>
                Settings</Link>
        </div>
    </div>

    );
};

export default NavBar;