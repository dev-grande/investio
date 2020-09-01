import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { dataActions } from '../reducers/actions';
import {  Container, Row, Col, DropdownButton, Dropdown, ButtonGroup } from 'react-bootstrap';

import { getPortfolio, switchPortfolio } from "../reducers/navigationSlice"

export function PortfolioDropdown(vals) {
        // var stocks = vals.stocks;
        // var selected_stock = vals.selected_stock;
        // var user_id = vals.user_id

        const user_id = useSelector(state => state.authentication.user.id);
        const dispatch = useDispatch();

        const data = useSelector(state => state.data);
        const portfolio = useSelector(getPortfolio);

        function handleSelect(dispatch, selected_portfolio) {
            dispatch(dataActions.getDashboardData(user_id, selected_portfolio));
            dispatch(switchPortfolio(selected_portfolio));

        }

        return (
          <Container>
              <Row className="text-center align-middle mb-2">
                <Col>
                <h3> Portfolio </h3>
                </Col>
                </Row>
              <Row className="text-center align-middle mb-2">
                <Col>
                  <DropdownButton
                      as={ButtonGroup}
                      key="stocks"
                      id='dropdown-button-drop-stocks'
                      variant="link"
                      title={portfolio}
                    //   style={{ marginTop: '-4px', marginLeft: '-6px'}}
                    >
                    <Dropdown.Item eventKey="ALL"
                    // className={stock.ui} 
                    onSelect={() => handleSelect(dispatch, "ALL")}>{"ALL"}
                    </Dropdown.Item>

                    {data.items && data.items.portfolios && (
                    data.items.portfolios.map((p, index) => 
                        <Dropdown.Item eventKey={p.portfolio} 
                        // className={stock.ui} 
                        onSelect={() => 
                        handleSelect(dispatch, p.portfolio)}>{p.portfolio}
                        </Dropdown.Item>
                    )
                    )}
                    </DropdownButton>
                </Col>
              </Row>
          </Container>
        );
        
  } 