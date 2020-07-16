import React from 'react';
import { LineChart } from "../features/LineChart";
import { CSVUploaderDrag } from "../features/CSVUploaderDrag";

export function Dashboard() {

    return (    
    <div>
      
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
    );
  
}


