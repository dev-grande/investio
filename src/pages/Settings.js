import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userActions, dataActions } from '../reducers/actions';
import NavBar from '../features/NavBar'
import { CSVUploader } from '../features/CSVUploader'
import { CSVUploaderDrag } from "../features/CSVUploaderDrag"

export function Settings() {

    const users = useSelector(state => state.users);
    const user = useSelector(state => state.authentication.user);
    const data = useSelector(state => state.data);
    const dispatch = useDispatch();

    const headers = [{ label: "MONTH", key: "x" }, { label: "AMOUNT", key: "y" }];

    useEffect(() => {
      dispatch(userActions.getAll());
      // if ( "id" in user ) {dispatch(dataActions.getAllData(user.id));}
    }, [dispatch, user]);

    function handleDeleteUser(id) {
      dispatch(userActions.delete(id));
    }

    function handleDeleteData(id, year) {
      dispatch(dataActions.delete(id, year));
    }

    return (    
      <div>
        <NavBar />
        <br></br> <br></br>
        <div className="mt-4 container  ui segment">
        <h1>Settings Page</h1>

        <div className="mt-4 container  ui segment">
            <h4>USER DATA</h4>
            <ul>
              <li>Username:  {user.username}</li>
              <li>First Name:  {user.firstname}</li>
              <li>Last Name:  {user.lastname}</li>
              <li>User ID:  {user.id}</li>
            </ul>
          </div>

          <div className="mt-4 container  ui segment">
            <h4>DATA IMPORT</h4>
            <p>Import yearly dividends data from CSV file.</p>
            <div className="ui segment">
              <div className="ui two column very relaxed stackable grid">
                  <div className="middle center aligned column">
                    <p>Click to upload.</p>
                    <CSVUploader />
                  </div>
                  <div className="middle aligned column">
                    <CSVUploaderDrag />
                  </div>
              </div>
              <div className="ui vertical divider">
                Or
              </div>
            </div>
          </div>


          <div className="mt-4 container  ui segment">
            <h4>USERS</h4>
            <h6>All registered users:</h6>
            {users.loading && <div className="ui active inline loader"></div>}
            {users.error && <span className="text-danger">ERROR: {users.error}</span>}
            {users.items &&
                <ul>
                    {users.items.map((user) =>
                        <li key={user.id}>
                            {user.firstname + ' ' + user.lastname}
                            {
                                user.deleting ? <em> - Deleting...</em>
                                : user.deleteError ? <span className="text-danger"> - ERROR: {user.deleteError}</span>
                                : <span> - <button className="ui icon button" onClick={() => handleDeleteUser(user.id)}>
                                <i className="trash icon"></i></button></span>
                            }
                        </li>
                    )}
                </ul>
            }
            
          </div>

        </div>
      </div>

    );
  
}


