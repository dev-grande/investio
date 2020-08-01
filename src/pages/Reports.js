import React, { useEffect } from 'react';
import { LineChart } from "../features/LineChart";
import { Table } from "../features/Table";
import NavBar from '../features/NavBar'
import { useSelector, useDispatch } from 'react-redux'
import { dataActions } from '../reducers/actions';

function get_selected_data(data) {
  var selected = data.selected_year;
  return data.data.find(ele => ele.year === selected)
}

export function Reports() {
  const user = useSelector(state => state.authentication.user);
  const dispatch = useDispatch();

  useEffect(() => {
      dispatch(dataActions.getAllData(user.id));
  }, []);

  const data = useSelector(state => state.data);

  function year_buttons(data) {

    if ("items" in data) {
      if (data.items.selected_year !== "") {
        var data_in = data.items;
        var selected = data_in.selected_year;
        var years = data_in.years;
        years.sort();
      
        years = years.map(year => {
          if (year === selected) return {"year": year, "ui": "ui button active"}
          else return {"year": year, "ui" : "ui button"}
        })
      
        return (
          <div>
            <br></br>
            <div className="row justify-content-center">
              <div className="ui buttons">
                { years.map((year, index) =>
                      <button key={index} className={year.ui} onClick={() => dispatch(dataActions.selectYear(year.year))}>{year.year}</button> )}
              </div>         
            </div>
            <br></br> <br></br>
          </div>
        );
        }
      }
      return ( <div></div>)
  }
  
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


            {data.items && (data.items.data.length == 0 && <h3> No data found :(  Please upload data on the Settings Page. </h3>) }

            {data.items && (data.items.selected_year !== "" &&
                <div>
                  <div className="row justify-content-center ">
                    <LineChart data={get_selected_data(data.items)} year={data.items.selected_year} />  
                  </div> 

                  {year_buttons(data)}

                  <div className="row justify-content-center ">
                    <Table data={get_selected_data(data.items)} />  
                  </div> 
                </div>
            ) }

          </div>
        </div>
      </div>
    );
  
}
