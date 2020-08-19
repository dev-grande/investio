import React, { useEffect } from 'react';
import { TablePagination } from "../features/TablePagination";
import NavBar from '../features/NavBar'
import { useSelector, useDispatch } from 'react-redux'
import { dataActions } from '../reducers/actions';
import { Card, Container, Row} from 'react-bootstrap';

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
      marginLeft: '70px',
      paddingLeft: '55px',
      paddingRight: '100px'
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
                  <TablePagination vals={data.items.aggregated_div} title="Monthly Dividend Totals"/>
              </Card.Body>
            </Card>
          </Row>
          ) }

          {data.items && (data.items.raw_div && 
          <Row className="mt-4">
            <Card style={{width: "180vh", marginLeft: "2vh", marginRight: '1.5vh'}}>
              <Card.Header className="text-center"><h4>Dividend Earnings</h4></Card.Header>
              <Card.Body className="px-5 pt-1">
                  <TablePagination vals={data.items.raw_div} />
              </Card.Body>
            </Card>
          </Row>
          ) }

          {data.items && (data.items.buy_sell && 
          <Row className="mt-4 pb-5">
            <Card style={{width: "180vh", marginLeft: "2vh", marginRight: '1.5vh'}}>
              <Card.Header className="text-center"><h4>Buy and Sell Transactions</h4></Card.Header>
              <Card.Body className="px-5 pt-1">
                  <TablePagination vals={data.items.buy_sell}/>
              </Card.Body>
            </Card>
          </Row>
          ) }


      </Container>
      </div>
    );
  
}
