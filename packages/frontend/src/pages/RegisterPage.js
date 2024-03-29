import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import logo from '../images/logo_name.png';
import { Image } from 'react-bootstrap';
import { userActions } from '../reducers/actions';

export function RegisterPage() {
    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        username: '',
        password: ''
    });
    const [submitted, setSubmitted] = useState(false);
    const registering = useSelector(state => state.registration.registering);
    const dispatch = useDispatch();

    // reset login status
    useEffect(() => {
        dispatch(userActions.logout());
    }, [dispatch]);

    function handleChange(e) {
        const { name, value } = e.target;
        setUser(user => ({ ...user, [name]: value }));
    }

    function handleSubmit(e) {
        e.preventDefault();

        setSubmitted(true);
        if (user.firstName && user.lastName && user.username && user.password) {
            dispatch(userActions.register(user));
        }
    }

    return (
        <div style={{backgroundColor: "#008080"}}>
        <div className="container">
        <div className="row justify-content-center align-items-center" style={{height: '100vh'}} >
            <div className="col-4">
                <div className="card">
                    <div className="card-body">
                        <h2>Register</h2>
                        <div className="text-center"> <Image src={logo} style={{height: '20vh', border: '1px'}} className='p-2 m-3'/></div>
                        <form name="form" onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>First Name</label>
                                <input type="text" name="firstName" value={user.firstName} onChange={handleChange} className={'form-control' + (submitted && !user.firstName ? ' is-invalid' : '')} />
                                {submitted && !user.firstName &&
                                    <div className="invalid-feedback">First Name is required</div>
                                }
                            </div>
                            <div className="form-group">
                                <label>Last Name</label>
                                <input type="text" name="lastName" value={user.lastName} onChange={handleChange} className={'form-control' + (submitted && !user.lastName ? ' is-invalid' : '')} />
                                {submitted && !user.lastName &&
                                    <div className="invalid-feedback">Last Name is required</div>
                                }
                            </div>
                            <div className="form-group">
                                <label>Username</label>
                                <input type="text" name="username" value={user.username} onChange={handleChange} className={'form-control' + (submitted && !user.username ? ' is-invalid' : '')} />
                                {submitted && !user.username &&
                                    <div className="invalid-feedback">Username is required</div>
                                }
                            </div>
                            <div className="form-group">
                                <label>Password</label>
                                <input type="password" name="password" value={user.password} onChange={handleChange} className={'form-control' + (submitted && !user.password ? ' is-invalid' : '')} />
                                {submitted && !user.password &&
                                    <div className="invalid-feedback">Password is required</div>
                                }
                            </div>
                            <div className="form-group">
                                <button className="btn btn-primary">
                                    {registering && <span className="spinner-border spinner-border-sm mr-1"></span>}
                                    Register
                                </button>
                                <Link to="/login" className="btn btn-link">Cancel</Link>
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

