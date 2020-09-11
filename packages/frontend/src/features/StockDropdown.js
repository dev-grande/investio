import React from 'react';
import { useDispatch } from 'react-redux';
import { dataActions } from '../reducers/actions';
import {  Container, Row, Col, DropdownButton, Dropdown, ButtonGroup } from 'react-bootstrap';

export function StockDropdown(vals) {
        var stocks = vals.stocks;
        var selected_stock = vals.selected_stock;
        var user_id = vals.user_id
        const dispatch = useDispatch();

        return (
          <Container>
              <Row className="text-center align-middle mb-2">
                <Col  >  
                <h3>Dividend Earnings for: 
                  <DropdownButton
                      as={ButtonGroup}
                      key="stocks"
                      id='dropdown-button-drop-stocks'
                      variant="link"
                      title={selected_stock}
                      style={{ marginTop: '-4px', marginLeft: '-6px'}}
                    >
                      { stocks.map((stock, index) =>
                      <Dropdown.Item eventKey={index} 
                        className={stock.ui} 
                        onSelect={() => 
                        dispatch(dataActions.getStockDiv(user_id, stock.symbol))}>{stock.symbol}
                      </Dropdown.Item> )}
                    </DropdownButton>
                    </h3>
               
                </Col>
              </Row>
          </Container>
        );
        
  } 