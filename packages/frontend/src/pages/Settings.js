import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userActions, dataActions } from '../reducers/actions';
import NavBar from '../features/NavBar'
import { CSVUploader } from '../features/CSVUploader'
import { CSVUploaderDrag } from "../features/CSVUploaderDrag"
import logo from '../images/logo_name.png';
import { Image, Card, Container, Row, Col, Button, ListGroup, CardDeck, Nav} from 'react-bootstrap';
import user_image from '../images/user_image.png';

import { getPortfolio, switchPortfolio } from "../reducers/navigationSlice"

export function Settings() {
  const [inputs, setInputs] = useState({
    new_portfolio: '' });

    const { new_portfolio } = inputs;
    const users = useSelector(state => state.users);
    const user = useSelector(state => state.authentication.user);
    const data = useSelector(state => state.data);
    const portfolio = useSelector(getPortfolio);
    const dispatch = useDispatch();

    function handleChange(e) {
      const { name, value } = e.target;
      setInputs(inputs => ({ ...inputs, [name]: value }));
    }

    function handlePortfolio(dispatch, selectedKey) {
      dispatch(switchPortfolio(selectedKey))
      dispatch(dataActions.getYears(user.id, selectedKey));
    }

    useEffect(() => {
      dispatch(userActions.getAll());
      if ( "id" in user ) {
        dispatch(dataActions.getYears(user.id, portfolio));
        dispatch(dataActions.getPortfolios(user.id));
      }
    }, [dispatch, user, portfolio]);

    function handleDeleteUser(id) {
      dispatch(userActions.delete(id, portfolio));
    }

    function handleDeletePortfolio(id, portfolio) {
      dispatch(dataActions.deletePortfolio(id, portfolio));
      dispatch(switchPortfolio(""))
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
                <Card style={{height:'45vh'}}>
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
              <Card style={{height:'45vh'}}>
                <Card.Header><h4>DATA IMPORT</h4>
                <Nav variant="tabs" defaultActiveKey={portfolio} onSelect={(selectedKey) => handlePortfolio(dispatch, selectedKey)}  >
                 
                 {data.items && data.items.portfolios && (
                    data.items.portfolios.map((p, index) => 
                      <Nav.Item key={index}>
                      <Nav.Link eventKey={p.portfolio}>{p.portfolio}</Nav.Link>
                      </Nav.Item>
                    )
                 )}

                 <Nav.Item className="ml-auto" style={{marginTop: "-15px", marginRight: "20px"}}>
                 <div className="ui action input">
                  <input type="text" placeholder="Portfolio Name" name="new_portfolio" value={new_portfolio}  onChange={handleChange} ></input>
                  <button className="ui button" onClick={() => 
                  dispatch(dataActions.addPortfolio(user.id, new_portfolio))}>Add</button>
                  </div>
                 </Nav.Item>

                </Nav>
                
                </Card.Header>
                
                
                { portfolio === "" &&  
                  <Card.Body>
                  <div className="ui segment">
                  <div className="ui one column very relaxed stackable grid" style={{height: '30vh'}}>
                      <div className="middle aligned column text-center">
                      <h3>Select or add a portfolio name above to upload transaction data to.</h3>
                      </div>
                  </div>
                  </div>
                  </Card.Body>
                }
                
                { portfolio !== "" &&
                <Card.Body>
                  <p>Import yearly dividends data from CSV file.</p>
                  <div className="ui segment">
                  <div className="ui two column very relaxed stackable grid" style={{height: '25vh'}}>
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
                }

              </Card>
            </Col>
          </Row>

          <Row className="mt-4">
            <Col>
              <Card style={{height:'40vh'}}>
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
            <Card style={{height:'40vh'}}>
                <Card.Header><h4>EDIT DATA</h4></Card.Header>
                {portfolio !== "" &&
                <Card.Body>

                

                <p>Listed below are the year(s) of your transaction data for the selected portfolio.
                </p>
 
                    <CardDeck>
                      {data.items && data.items.years &&
                        data.items.years.map((year) =>
                        <Card className="text-center" key={year.year}>
                        <Card.Header>Transaction Data for:</Card.Header>
                          <Card.Body>
                            <h1 style={{fontSize: '2.7vh'}}>{year.year}</h1>
                            <Button variant="light" style={{fontSize: "10px", boxShadow:'none'}} key={year.year}
                            onClick={() => dispatch(dataActions.deleteYear(user.id, year.year, portfolio))}>
                                        Delete</Button>
                          </Card.Body>
                        </Card>                    
                       ) } 
                    </CardDeck>

                    <Button variant="light" style={{fontSize: "12px", boxShadow:'none', border: '0'}} className="mt-4"
                            onClick={() => handleDeletePortfolio(user.id, portfolio)}>
                                        Delete Portfolio: {portfolio}</Button>
                  </Card.Body> }
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


