import React, { useEffect } from 'react';
import { TablePagination } from "../features/TablePagination";
import NavBar from '../features/NavBar'
import { useSelector, useDispatch } from 'react-redux'
import { dataActions } from '../reducers/actions';

export function Reports() {
  const user = useSelector(state => state.authentication.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if ( "id" in user ) {dispatch(dataActions.getAllData(user.id));}
  }, [dispatch, user]);

  const data = useSelector(state => state.data);


    return (    
      <div>
        <NavBar />
        <br></br> <br></br>
        {data.loading &&  <div className="ui active inverted dimmer">
                <div className="ui text loader">Loading</div>
            </div>  }
        <div className="mt-4 container ui segment">
          <h1>Reports Page</h1>
          <div className="mt-4 container">

          {data.items && (data.items.aggregated_div && <TablePagination vals={data.items.aggregated_div} title="Monthly Dividend Totals"/> ) }
          <br></br> <br></br>
 
          {data.items && (data.items.raw_div && <TablePagination vals={data.items.raw_div} title="Dividend Earnings"/> ) }
          <br></br> <br></br>

          {data.items && (data.items.buy_sell && <TablePagination vals={data.items.buy_sell} title="Buy and Sell Transactions"/> ) }
          </div>
        </div>


      </div>
    );
  
}
