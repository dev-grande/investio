import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userActions, dataActions } from '../reducers/actions';
import NavBar from '../features/NavBar'
import { CSVUploader } from '../features/CSVUploader'
import { CSVUploaderDrag } from "../features/CSVUploaderDrag"
import logo from '../images/logo_name.png';
import { Image, Card, Container, Row, Col, Button, ListGroup, CardDeck} from 'react-bootstrap';
import user_image from '../images/user_image.png';

export function Settings() {

    const users = useSelector(state => state.users);
    const user = useSelector(state => state.authentication.user);
    const data = useSelector(state => state.data);
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(userActions.getAll());
      if ( "id" in user ) {dispatch(dataActions.getYears(user.id));}
    }, [dispatch, user]);

    function handleDeleteUser(id) {
      dispatch(userActions.delete(id));
    }

    const styles = {
      container: { 
        backgroundColor: '#F0F0F0', 
        marginTop: '40px',
        width: '100%',
        height: '100%',
        minHeight: '100vh',
        paddingLeft: '20vh',
        paddingRight: '8vh'
      },
    }
  
    return (    
      <div>
        <NavBar />
        <br></br> <br></br>
        <Container fluid style={styles.container}>
          <Row>
            <Col>
                <Card style={{height:'50vh'}}>
                  <Card.Header><h4>USER DATA</h4></Card.Header>
                  <Card.Body className='text-center' >
                    <Image src={user_image} roundedCircle style={{height: '13vh', border: '1px'}} className='p-2 m-3'/>
                    <ListGroup variant="flush">
                      <ListGroup.Item><b>Username </b> -  {user.username}</ListGroup.Item>
                      <ListGroup.Item><b>First Name </b> -  {user.firstname}</ListGroup.Item>
                      <ListGroup.Item><b>Last Name </b> -  {user.lastname}</ListGroup.Item>
                      <ListGroup.Item><b>User ID </b> -  {user.id}</ListGroup.Item>
                    </ListGroup>
                  </Card.Body>
                </Card>
            </Col>

            <Col xs={9}>
              <Card style={{height:'50vh'}}>
                <Card.Header><h4>DATA IMPORT</h4></Card.Header>
                <Card.Body>
                  <p>Import yearly dividends data from CSV file.</p>
                  <div className="ui segment">
                  <div className="ui two column very relaxed stackable grid" style={{height: '35vh'}}>
                      <div className="middle aligned column text-center">
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
                </Card.Body>
              </Card>
            </Col>
          </Row>

          <Row className="mt-4">
            <Col>
              <Card style={{height:'35vh'}}>
                  <Card.Header><h4>USERS</h4></Card.Header>
                  <Card.Body>
                    <p>All registered users: </p>
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
                                      : <span>   <Button variant="light" style={{fontSize: "10px", boxShadow:'none'}} onClick={() => handleDeleteUser(user.id)}>
                                        Delete</Button></span>
                                  }
                              </li>
                          )}
                      </ul>
                  }
                  </Card.Body>
                </Card>
            </Col>

            <Col xs={9}>
            <Card style={{height:'35vh'}}>
                <Card.Header><h4>EDIT DATA</h4></Card.Header>

                <Card.Body>
                <p>Listed below are the year(s) of your transaction data.
                  Click delete for the corresponding year to delete that year's transactions.
                </p>
 
                    <CardDeck>
                      {data.items && data.items.years &&
                        data.items.years.map((year) =>
                        <Card className="text-center" key={year.year}>
                        <Card.Header>Transaction Data for:</Card.Header>
                          <Card.Body>
                            <h1 style={{fontSize: '2.7vh'}}>{year.year}</h1>
                            <Button variant="light" style={{fontSize: "10px", boxShadow:'none'}} key={year.year}
                            onClick={() => dispatch(dataActions.deleteYear(user.id, year.year))}>
                                        Delete</Button>
                          </Card.Body>
                        </Card>                    
                       ) } 
                    </CardDeck>

                </Card.Body>
              </Card>

            </Col>
          </Row>

          {data.items && !data.items.loading &&
          <Row className="text-center pb-4" style={{marginTop: '12vh'}}> 
            <Col>
              <Image src={logo} style={{height: '18vh', border: '1px'}} className='p-2 m-3'/>
            </Col>
          </Row> }

        </Container>
      </div>

    );
  
}


