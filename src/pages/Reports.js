import React, { useEffect } from 'react';
import { LineChart } from "../features/LineChart";
import { Table } from "../features/Table";
// import { CSVUploaderDrag } from "../features/CSVUploaderDrag";
import NavBar from '../features/NavBar'
import { useSelector, useDispatch } from 'react-redux'
import { dataActions } from '../reducers/actions';

// import { getAllData, selectUserData } from '../reducers/chartDataSlice'

function get_selected_data(data) {
  var selected = data.selected_year;
  return data.data.find(ele => ele.year === selected)
}

function getChart(data) {
  if ("items" in data) {
    if (data.items.selected_year !== "") {
      return (
        <div className="row justify-content-center ">
        <LineChart data={get_selected_data(data.items)} year={data.items.selected_year} />  
        </div>
      )
    }
  }
  else {
    return (<div></div>)
  }
}


function getTables(data) {
  if ("items" in data) {
    if (data.items.selected_year !== "") {

      return (
        <div className="row justify-content-center ">
        <Table data={get_selected_data(data.items)} />  
        </div>
      )
    }
  }
  else {
    return (<div></div>)
  }

}

export function Reports() {
  const user = useSelector(state => state.authentication.user);
  const dispatch = useDispatch();

  useEffect(() => {
      dispatch(dataActions.getAllData(user.id));
  }, []);

  const data = useSelector(state => state.data);

  console.log("user_id: " + user.id);
  console.log(data);
  


  function year_buttons(data) {

    if ("items" in data) {
      if (data.items.selected_year !== "") {
        var data = data.items;
        var selected = data.selected_year;
        var years = data.years;
        years.sort();
      
        years = years.map(year => {
          if (year === selected) return {"year": year, "ui": "ui button active"}
          else return {"year": year, "ui" : "ui button"}
        })
      
        console.log(years);
      
        return (
          <div className="row justify-content-center">
          <div className="ui buttons">
            { years.map((year, index) =>
                  <button key={index} className={year.ui} onClick={() => dispatch(dataActions.selectYear(year.year))}>{year.year}</button> )}
          </div>
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
        <div className="mt-4 container ui segment">
          <h1>Reports Page</h1>

        <div className="mt-4 container">        

        {getChart(data)}

        <br></br> <br></br>

        {year_buttons(data)}

        <br></br> <br></br>

        {getTables(data)}

        {/* <div className="mt-5 row justify-content-center">
          <div class="col">
            <CSVUploaderDrag />
          </div>
        </div> */}

        </div>

        </div>
      </div>
    );
  
}
