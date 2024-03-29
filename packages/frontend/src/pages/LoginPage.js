import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../reducers/actions';
import logo from '../images/logo_name.png';
import { Image } from 'react-bootstrap';

export function LoginPage() {
    const [inputs, setInputs] = useState({
        username: '',
        password: ''
    });
    const [submitted, setSubmitted] = useState(false);
    const { username, password } = inputs;
    const loggingIn = useSelector(state => state.authentication.loggingIn);
    const dispatch = useDispatch();

    // reset login status
    useEffect(() => { 
        dispatch(userActions.logout());
    }, [dispatch]);

    function handleChange(e) {
        const { name, value } = e.target;
        setInputs(inputs => ({ ...inputs, [name]: value }));
    }

    function handleSubmit(e) {
        e.preventDefault();

        setSubmitted(true);
        if (username && password) {
            dispatch(userActions.login(username, password));
        }
    }

    return (
    <div style={{backgroundColor: "#008080"}}>
    <div className="container">

        <div className="row justify-content-center align-items-center" style={{height: '100vh'}} >
            <div className="col-4">
                <div className="card">
                    <div className="card-body">
                        <div className="text-center"> <Image src={logo} style={{height: '20vh', border: '1px'}} className='p-2 m-3'/></div>
                        <p>Test User  -   username: testuser    password:  testuser</p>
                    <form name="form" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Username</label>
                            <input type="text" name="username" value={username} onChange={handleChange} className={'form-control' + (submitted && !username ? ' is-invalid' : '')} />
                            {submitted && !username &&
                                <div className="invalid-feedback">Username is required</div>
                            }
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input type="password" name="password" value={password} onChange={handleChange} className={'form-control' + (submitted && !password ? ' is-invalid' : '')} />
                            {submitted && !password &&
                                <div className="invalid-feedback">Password is required</div>
                            }
                        </div>
                        <div className="form-group">
                            <button className="btn btn-primary">
                                {loggingIn && <span className="spinner-border spinner-border-sm mr-1"></span>}
                                Login
                            </button>
                            <Link to="/register" className="btn btn-link">Register</Link>
                        </div>
                    </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </div>
    );
}
