// import React from 'react';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../reducers/actions';
import NavBar from '../features/NavBar'

export function Dashboard() {
  const users = useSelector(state => state.users);
  const user = useSelector(state => state.authentication.user);
  const dispatch = useDispatch();

  useEffect(() => {
      dispatch(userActions.getAll());
  }, []);

  function handleDeleteUser(id) {
      dispatch(userActions.delete(id));
  }

    return (    
    <div>
      <NavBar />
      <div class="mt-4 container ui segment">
            <h1>Hi {user.firstName}!</h1>
            <h3>All registered users:</h3>
            {users.loading && <div class="ui active inline loader"></div>}
            {users.error && <span className="text-danger">ERROR: {users.error}</span>}
            {users.items &&
                <ul>
                    {users.items.map((user, index) =>
                        <li key={user.id}>
                            {user.firstName + ' ' + user.lastName}
                            {
                                user.deleting ? <em> - Deleting...</em>
                                : user.deleteError ? <span className="text-danger"> - ERROR: {user.deleteError}</span>
                                : <span> - <a onClick={() => handleDeleteUser(user.id)} className="text-primary">Delete</a></span>
                            }
                        </li>
                    )}
                </ul>
            }
        </div>
    </div>
    );
  
}


