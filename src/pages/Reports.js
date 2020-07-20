import React from 'react';
import { LineChart } from "../features/LineChart";
import { CSVUploaderDrag } from "../features/CSVUploaderDrag";
import NavBar from '../features/NavBar'

export function Reports() {

    return (    

      <div>
        <NavBar />
        <div class="mt-4 container ui segment">
          <h1>Reports Page</h1>

        <div class="mt-4 container">

        <div class="row justify-content-center ">
          <LineChart />
        </div>

        <br></br> <br></br>

        <div class="mt-5 row justify-content-center">
          <div class="col">
            <CSVUploaderDrag />
          </div>
        </div>

        </div>

        </div>
      </div>
    );
  
}
