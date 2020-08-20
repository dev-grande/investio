import React, { useEffect } from 'react';
import { TablePagination } from "../features/TablePagination";
import NavBar from '../features/NavBar'
import { useSelector, useDispatch } from 'react-redux'
import { dataActions } from '../reducers/actions';
import logo from '../images/logo_name.png';
import { Card, Container, Row, Image, Col} from 'react-bootstrap';

export function Reports() {
  const user = useSelector(state => state.authentication.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if ( "id" in user ) {dispatch(dataActions.getReportsData(user.id));}
  }, [dispatch, user]);

  const data = useSelector(state => state.data);

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
        {data.loading &&  <div className="ui active inverted dimmer">
                <div className="ui text loader">Loading</div>
            </div>  }
        <Container fluid style={styles.container}>

          {data.items && (data.items.aggregated_div && 
          <Row className="pt-1">
            <Card style={{width: "180vh", marginLeft: "2vh", marginRight: '1.5vh'}}>
              <Card.Header className="text-center"><h4>Monthly Dividend Totals </h4></Card.Header>
              <Card.Body className="px-5 pt-1">
                  <TablePagination vals={data.items.aggregated_div} export_name="monthly_dividends.csv"/>
              </Card.Body>
            </Card>
          </Row>
          ) }

          {data.items && (data.items.raw_div && 
          <Row className="mt-4">
            <Card style={{width: "180vh", marginLeft: "2vh", marginRight: '1.5vh'}}>
              <Card.Header className="text-center"><h4>Dividend Earnings</h4></Card.Header>
              <Card.Body className="px-5 pt-1">
                  <TablePagination vals={data.items.raw_div} export_name="dividend_earnings.csv"/>
              </Card.Body>
            </Card>
          </Row>
          ) }

          {data.items && (data.items.buy_sell && 
          <Row className="mt-4 pb-5">
            <Card style={{width: "180vh", marginLeft: "2vh", marginRight: '1.5vh'}}>
              <Card.Header className="text-center"><h4>Buy and Sell Transactions</h4></Card.Header>
              <Card.Body className="px-5 pt-1">
                  <TablePagination vals={data.items.buy_sell} export_name="buy_sell.csv"/>
              </Card.Body>
            </Card>
          </Row>
          ) }

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
