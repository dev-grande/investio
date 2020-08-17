import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { dataActions } from '../reducers/actions';
import {LineChart} from '../features/LineChart';
import {BarChart} from '../features/BarChart';
import NavBar from '../features/NavBar'
import { CardDeck, Card, Container, Row, Col} from 'react-bootstrap';
import { Table } from "../features/Table";

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
  const dispatch = useDispatch();

  useEffect(() => {
    if ( "id" in user ) {dispatch(dataActions.getDashboardData(user.id));}
  }, [dispatch, user]);

  const data = useSelector(state => state.data);

  function stock_buttons(data) {
    if ("items" in data) if("div_stocks" in data.items) { {
      
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
          <div>
            <br></br>
            <div className="row justify-content-center">
              {!data.items.selected_stock && <h4>Select a dividend stock below to see your stock's dividend history.</h4>}
              <div className="ui buttons">
                { stock_b.map((stock, index) =>
                      <button key={index} className={stock.ui} onClick={() => dispatch(dataActions.getStockDiv(user.id, stock.stock))}>{stock.stock}</button> )}
              </div>         
            </div>
            <br></br> <br></br>
          </div>
        );
        
      } }
      return ( <div></div>)
  } 

    return (    
    <div>
      <NavBar />
      <br></br> <br></br>
      <div className="mt-4 container ui segment">
            <h1>Dashboard</h1>
            <h2>Hi {user.firstname}!</h2>
      <Container>

    { data.items && 
    ( data.items.div_total &&
      <Row className="justify-content-center mb-4">
            <CardDeck>
              <Card className="text-center">
                <Card.Body>
                  <Card.Title><b>Cash Value: </b>  </Card.Title>
                  <Card.Text>${data.items.cash_value[0].sum}</Card.Text>
                </Card.Body>
              </Card>

              <Card className="text-center">
                <Card.Body>
                  <Card.Title><b>Total Invested: </b>  </Card.Title>
                  <Card.Text>${data.items.invested[0].sum*-1}</Card.Text>
                </Card.Body>
              </Card>
            

              <Card className="text-center">
                <Card.Body>
                  <Card.Title><b>Dividend Earnings: </b>  </Card.Title>
                  <Card.Text>${data.items.div_total[0].amount}</Card.Text>
                </Card.Body>
              </Card>
            </CardDeck>
      </Row>

    )}

{ data.items && 
    ( data.items.current_stocks &&
      <Row className="justify-content-center">
        <Col xs={9} className="m-4">
          <BarChart data= {get_bar_chart_data(data.items.current_stocks, 'symbol', 'quantity')}/>
        </Col>
        <Col className="m-4">
          <Table vals={data.items.current_stocks} />
        </Col>
      </Row>
    )}

    { data.items && 
    ( data.items.aggregated &&
      <Row className="justify-content-center">
          <LineChart data={get_line_chart_data(data.items.aggregated, 'date', 'amount', 'dividend earnings')}
                      title="Monthly Dividend Earnings" />
      </Row>
    )}


    {stock_buttons(data)}

    {data.items && (
      data.items.selected_stock && data.items.individual_div &&
      <Row className="justify-content-center">
          <LineChart data={get_line_chart_data(data.items.individual_div, 'date', 'amount', 'dividend earnings')}
                      title={"Dividend Earnings for " + data.items.selected_stock} />
      </Row>
      
    )}






</Container>

      </div>

    </div>
    );
  
}


