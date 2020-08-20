import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { dataActions } from '../reducers/actions';
import { LineChart } from '../features/LineChart';
import { BarChart } from '../features/BarChart';
import  { Table }  from "../features/Table";
import NavBar from '../features/NavBar'
import logo from '../images/logo_name.png';
import { getDashboardNav, switchDashboardNav } from "../reducers/navigationSlice"
import {  CardDeck, Card, 
          Container, Row, Col, 
          Nav, 
          Image,
          DropdownButton, Dropdown,
          ButtonGroup } from 'react-bootstrap';

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
    if ( "id" in user ) {dispatch(dataActions.getDashboardData(user.id));}
  }, [dispatch, user]);

  const data = useSelector(state => state.data);

  function stock_buttons(data) {
    if ("items" in data) { if("div_stocks" in data.items) {
      
        var stocks = data.items.div_stocks.map(val => {
          return val.symbol;
        })

        var data_in = data.items;
        var selected = data_in.selected_stock;
        stocks.sort();
      
        var stock_b = stocks.map(stock => {
          if (stock === selected) return {"stock": stock, "ui": "ui button active"}
          else return {"stock": stock, "ui" : "ui button"}
        })
      
        return (
          <Container>
            <br></br>
              {!data.items.selected_stock && 
              <Row className="text-center mb-3">
                <Col>
                <div>                
                  <h4>Select a dividend stock from the drowdown below to see your stock's dividend history.</h4>
                </div>

                </Col>
              </Row>
              }

              <Row className="text-center">
                <Col>
                  <DropdownButton
                      as={ButtonGroup}
                      key="stocks"
                      id='dropdown-button-drop-stocks'
                      variant="light"
                      title={data.items.selected_stock}
                      style={{fontSize: "10px", boxShadow:'none'}}
                    >
                      { stock_b.map((stock, index) =>
                      <Dropdown.Item eventKey={index} 
                        className={stock.ui} 
                        onSelect={() => 
                        dispatch(dataActions.getStockDiv(user.id, stock.stock))}>{stock.stock}
                      </Dropdown.Item> )}
                    </DropdownButton>
               
                </Col>
              </Row>
            <br></br> <br></br>
          </Container>
        );
        
      } }
      return ( <div></div>)
  } 

    const styles = {
      container: { 
        marginTop: '30px',
        width: '100%',
        height: '100%',
        minHeight: '100vh',
        marginLeft: '68px',
        paddingLeft: '55px',
        paddingRight: '90px'
      },

      monthly_margin: { top: 60, right: 60, bottom: 130, left: 70 },
      monthly_div: { height: "66vh" , width: "50vw"},

      stock_margin: { top: 40, right: 40, bottom: 80, left: 70 },
      stock_div: { height: "57vh" , width: "50vw"}

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
          <Col>
              <CardDeck>
                <Card className="text-center" style={{height:'12vh'}}>
                <Card.Header>Cash Value:</Card.Header>
                  <Card.Body>
                    <h1 style={{fontSize: '2.7vh'}}>${data.items.cash_value.toLocaleString('en')}</h1>
                  </Card.Body>
                </Card>

                <Card className="text-center" style={{height:'12vh'}}>
                <Card.Header>Stock Value: </Card.Header>
                  <Card.Body>
                    <h1 style={{fontSize: '2.7vh'}}>${data.items.invested.toLocaleString('en')}</h1>
                  </Card.Body>
                </Card>

                <Card className="text-center" style={{height:'12vh'}}>
                <Card.Header>Account Value: </Card.Header>
                  <Card.Body>
                    <h1 style={{fontSize: '2.7vh'}}>${data.items.account_value.toLocaleString('en')}</h1>
                  </Card.Body>
                </Card>

                <Card className="text-center" style={{height:'12vh'}}>
                <Card.Header>Dividend Earnings: </Card.Header>
                  <Card.Body>
                    <h1 style={{fontSize: '2.7vh'}}>${data.items.div_total.toLocaleString('en')}</h1>
                  </Card.Body>
                </Card>

                <Card className="text-center" style={{height:'12vh'}}>
                <Card.Header>Need to Find: </Card.Header>
                  <Card.Body>
                    <h1 style={{fontSize: '2.7vh'}}>$1,234.56</h1>
                  </Card.Body>
                </Card>
              
              </CardDeck>
              </Col>
        </Row>
      )}

{ data.items && 
      ( data.items.current_stocks && data.items.aggregated &&
  <Row className='mt-4'>
    <Col xs={7}>
      <Card style={{height: '75.4vh'}} >
        <Card.Header>
          <Nav variant="tabs" defaultActiveKey={dashboard_nav} onSelect={(selectedKey) => dispatch(switchDashboardNav(selectedKey))} >
            <Nav.Item>
              <Nav.Link eventKey="monthly">Monthly Dividends</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="stock">Stock Dividends</Nav.Link>
            </Nav.Item>
          </Nav>
        </Card.Header>
        <Card.Body>

          {dashboard_nav==='monthly' && 
            <LineChart data={get_line_chart_data(data.items.aggregated, 'date', 'amount', 'dividend earnings')}
            title="Monthly Dividend Earnings" div={styles.monthly_div} margin={styles.monthly_margin} /> }

          {dashboard_nav==='stock' && data.items && (
            data.items.selected_stock && data.items.individual_div &&
            <div>
                <LineChart data={get_line_chart_data(data.items.individual_div, 'date', 'amount', 'dividend earnings')}
                            title={"Dividend Earnings for " + data.items.selected_stock} 
                            div={styles.stock_div} margin={styles.stock_margin} />
            </div> )} 

          {dashboard_nav==='stock' && stock_buttons(data) }

        </Card.Body>
      </Card>
    </Col>

    <Col>
        <Row>
          <Col>
            <Card style={{height: '43vh'}}>
            <Card.Body>
                <BarChart data= {get_bar_chart_data(data.items.current_stocks, 'symbol', 'amount')}/>
              </Card.Body>
            </Card>
          </Col>

          <Col className="mt-4">
            <Card style={{height: '29.8vh'}}>
            <Card.Body>
              <Table vals={data.items.current_stocks} />
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


