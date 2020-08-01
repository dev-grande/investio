import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../reducers/actions';
import NavBar from '../features/NavBar'

export function Dashboard() {
  const user = useSelector(state => state.authentication.user);
  const dispatch = useDispatch();

  useEffect(() => {
      dispatch(userActions.getAll());
  }, [dispatch]);

    return (    
    <div>
      <NavBar />
      <br></br> <br></br>
      <div className="mt-4 container ui segment">
            <h1>Dashboard</h1>
            <h2>Hi {user.firstName}!</h2>
        </div>
    </div>
    );
  
}


