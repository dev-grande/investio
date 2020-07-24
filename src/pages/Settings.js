// import React from 'react';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userActions, dataActions } from '../reducers/actions';
import NavBar from '../features/NavBar'
import { CSVUploader } from '../features/CSVUploader'
import { Button } from 'react-bootstrap'
import '@babel/polyfill'
import {save} from 'save-file';

export function Settings() {

    const users = useSelector(state => state.users);
    const user = useSelector(state => state.authentication.user);
    const data = useSelector(state => state.data);
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(userActions.getAll());
      dispatch(dataActions.getAllData(user.id));
    }, []);

    const downloadFile = async () => {
      save(JSON.stringify(data), JSON.stringify(new Date(Date.now())) + '_export.json');
    }

    function handleDeleteUser(id) {
      dispatch(userActions.delete(id));
    }

    return (    
      <div>
        <NavBar />
        <br></br> <br></br>
        <div className="mt-4 container  ui segment">
        <h1>Settings Page</h1>
          <div className="mt-4 container  ui segment">
            <h4>DATA IMPORT</h4>
            <p>Import yearly dividends data from CSV file.</p>
            <CSVUploader />
          </div>
          <div className="mt-4 container  ui segment">
            <h4>DATA EXPORT</h4>
            <p>Export user dividends data to JSON file.</p>
            <Button variant="info" onClick={downloadFile}>
              Export
            </Button>
          </div>

          <div className="mt-4 container  ui segment">
            <h4>EDIT DATA</h4>
            <h5>User Data: </h5>
            <ul>
              <li>Username:  {user.username}</li>
              <li>First Name:  {user.firstName}</li>
              <li>Last Name:  {user.lastName}</li>
              <li>User ID:  {user.id}</li>
            </ul>
            <h5>Stored Dividend Data: </h5>
            <p>Select year to delete data.</p>
            <Button variant="info" >
              Delete
            </Button>
          </div>


          <div className="mt-4 container  ui segment">
            <h4>USERS</h4>
            <h6>All registered users:</h6>
            {users.loading && <div className="ui active inline loader"></div>}
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
      </div>
    );
  
}


