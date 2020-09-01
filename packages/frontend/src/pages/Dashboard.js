import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { dataActions } from '../reducers/actions';
import { LineChart } from '../features/LineChart';
import { BarChart } from '../features/BarChart';
import { Table }  from "../features/Table";
import { StockDropdown } from '../features/StockDropdown';
import { PortfolioDropdown } from '../features/PortfolioDropdown';
import NavBar from '../features/NavBar';
import logo from '../images/logo_name.png';
import { getDashboardNav, switchDashboardNav } from "../reducers/navigationSlice"
import {  CardDeck, Card, 
          Container, Row, Col, 
          Nav, Image, Collapse,
        } from 'react-bootstrap';

function get_line_chart_data(data, keyx, keyy, title) {
  var result = []
  for (var index in data) {
    var point = {}
      point.x = data[index][keyx]
      point.y = Number(data[index][keyy]);
    result.push(point)
  }
  return [{id: title, data: result}];
}

function get_bar_chart_data(data, id, val) {
  var result = [];
    for (var index in data) {
      var point = {}
        point.id = data[index][id]
        point.value = Number(data[index][val]);
        result.push(point)
    }
  return result;
}

export function Dashboard() {

  const user = useSelector(state => state.authentication.user);
  const dashboard_nav = useSelector(getDashboardNav);
  const dispatch = useDispatch();

  useEffect(() => {
    if ( "id" in user ) {dispatch(dataActions.getDashboardData(user.id, "ALL"));
    dispatch(dataActions.getPortfolios(user.id));
  }
  }, [dispatch, user]);

  const data = useSelector(state => state.data);

  const styles = {
      container: { 
        marginTop: '4vh',
        width: '100%',
        height: '100%',
        minHeight: '100vh',
        marginLeft: '68px',
        paddingLeft: '55px',
        paddingRight: '90px'
      },

      monthly_margin: { top: 35, right: 60, bottom: 90, left: 70 },
      monthly_div: { height: "57vh" , width: "40vw"},

      stock_margin: { top: 40, right: 40, bottom: 80, left: 70 },
      stock_div: { height: "57vh" , width: "40vw"},

      topCards: {
        height:'12vh'
      }
  }

  return (    

  <div >
      <NavBar />
      <br></br> <br></br>
      <Container fluid style={styles.container}>

      {data.items && !data.items.div_total && data.items.loading &&
      <div className="ui active inverted dimmer">
                <div className="ui text loader">Loading</div>
            </div> }
      { data.items && 
      ( data.items.div_total &&
        <Row>
          <Col xs={1}>
          <div  style={{height:'12vh', width: "10wh"}}>
          <PortfolioDropdown  stocks = {data.items.div_stocks}  user_id = {user.id}
                              selected_stock = {data.items.selected_stock} />
          </div>

          </Col>
          <Col>
              <CardDeck>
              {/* <Card className="text-center" style={{height:'12vh', width: "10wh"}}>
                // <Card.Header>Cash Value:</Card.Header>
                  <Card.Body>
                    <h1 style={{fontSize: '2.7vh'}}>${data.items.cash_value.toLocaleString('en')}</h1>
                  </Card.Body>
                </Card> */}
                
                <Card className="text-center" style={styles.topCards}>
                <Card.Header>Cash Value:</Card.Header>
                  <Card.Body>
                    <h1 style={{fontSize: '2.7vh'}}>${data.items.cash_value.toLocaleString('en')}</h1>
                  </Card.Body>
                </Card>

                <Card className="text-center" style={styles.topCards}>
                <Card.Header>Change Percentage: </Card.Header>
                  <Card.Body>
                    { data.items.account_percent > 0 &&
                      <h1 style={{fontSize: '2.7vh', color: "#34B244"}}>+{data.items.account_percent}% </h1>
                    }

                    { data.items.account_percent < 0 &&
                      <h1 style={{fontSize: '2.7vh', color: "#E30000"}}>{data.items.account_percent}% </h1>
                    }
                    
                  </Card.Body>
                </Card>

                <Card className="text-center" style={styles.topCards}>
                <Card.Header>Account Value: </Card.Header>
                  <Card.Body>
                    <Card.Text>
                    <p style={{fontSize: '2.7vh'}}>${data.items.account_value.toLocaleString('en')}
                    </p> 
                    </Card.Text>
                  </Card.Body>
                </Card>


                <Card className="text-center" style={styles.topCards}>
                <Card.Header>Change Amount: </Card.Header>
                  <Card.Body>
                    {data.items.change > 0 && 
                      <h1 style={{fontSize: '2.7vh', color: "#34B244"}}>+ ${data.items.change.toLocaleString('en') }</h1>
                    }

                    {data.items.change < 0 && 
                      <h1 style={{fontSize: '2.7vh', color: "#E30000"}}>- ${(data.items.change*-1).toLocaleString('en') }</h1>
                    }
                    
                  </Card.Body>
                </Card>
                

                <Card className="text-center" style={styles.topCards}>
                <Card.Header>Stock Value: </Card.Header>
                  <Card.Body>
                    <h1 style={{fontSize: '2.7vh'}}>${data.items.invested.toLocaleString('en')  }</h1>
                  </Card.Body>
                </Card>


              
              </CardDeck>
              </Col>
        </Row>
      )}

{ data.items && 
      ( data.items.current_stocks && data.items.aggregated &&
  <Row className='mt-4'>
    <Col xs={6}>
      <Card style={{height: '76vh'}} >
        <Card.Header>
          <Nav variant="tabs" defaultActiveKey={dashboard_nav} onSelect={(selectedKey) => dispatch(switchDashboardNav(selectedKey))} >
            <Nav.Item>
              <Nav.Link eventKey="monthly">Monthly Dividends</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="stock">Stock Dividends</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="stocks">All Stocks</Nav.Link>
            </Nav.Item>
          </Nav>
        </Card.Header>
        <Card.Body>

          {dashboard_nav==='monthly' && data.items && (
            data.items.aggregated &&
            <Row className="text-center">
              <Col> <LineChart data={get_line_chart_data(data.items.aggregated, 'date', 'amount', 'dividend earnings')}
              title="Monthly Dividend Earnings" div={styles.monthly_div} margin={styles.monthly_margin} /> </Col>
              <Col>
                <h4>Total Dividend Earnings: <h3> ${data.items.div_total.toLocaleString('en')}</h3> </h4>
              </Col>
            </Row>
            ) }

          {dashboard_nav==='stock' && data.items && (
            data.items.selected_stock && data.items.individual_div &&
            <div>
              <StockDropdown  stocks = {data.items.div_stocks}  user_id = {user.id}
                              selected_stock = {data.items.selected_stock} />
                <LineChart data={get_line_chart_data(data.items.individual_div, 'date', 'amount', 'dividend earnings')}
                            div={styles.stock_div} margin={styles.stock_margin} />
                          
            </div> )} 

          {dashboard_nav==='stock' && data.items && (
          !data.items.selected_stock && !data.items.individual_div &&
          <h2>There are no stocks with dividends to display</h2> )}

          {dashboard_nav==='stocks'  && data.items && ( data.items.current_stocks &&
            <div style={{marginTop:'1vh'}}>
              <BarChart title="All Stocks" bottom={null} left={{}} 
              dimension={{height: "58vh" , width: "40vw"}} layout="horizonal"
              margin={{ top: 30, right: 10, bottom: 30, left: 50 }}
              data= {get_bar_chart_data(data.items.current_stocks.sort((a, b) => (a.amount > b.amount) ? 1 : -1), 
                    'symbol', 'amount')}/>
            </div>
    
          )}

        </Card.Body>
      </Card>
    </Col>

    <Col>
        <Row >


          <Col>
            {/* <Card style={{height: '29.4vh'}}> */}
            <Card style={{height: '45vh', width: "43.8vw"}}  >
            {/* <Card style={{height: '45vh', width: "36.2vw"}}> */}
            <Card.Body className="pr-1">
              <Table vals={data.items.current_stocks} />
              </Card.Body>
            </Card>
          </Col>

          <Col className="mt-3">
            <Card style={{height: '29.4vh'}}>
            <Card.Body>
                <BarChart title="Your Top Stocks" bottom={{}} left={null} 
                          dimension={{height: "21vh" , width: "32vw"}} layout="vertical"
                          margin={{ top: 20, right: 10, bottom: 30, left: 10 }}
                          data= {get_bar_chart_data(data.items.current_stocks.sort((a, b) => (a.amount < b.amount) ? 1 : -1).slice(0, 6), 
                          'symbol', 'amount')}/>
              </Card.Body>
            </Card>
          </Col>

        </Row>
    </Col>

  </Row>
      )}  

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


