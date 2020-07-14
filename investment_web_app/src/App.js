import React, { useState } from 'react';
import { LineChart } from "./features/LineChart";
import { CSVUploader } from "./features/CSVUploader";

export function App() {
    // const { showHideUpload, showHideChart } = this.state;
    return  <div>
      <h1>Investment Web App </h1>
      <style jsx global>{`
            body {
                height: 100vh;
                width: 100vw;
                display: grid;
                text-align: center;
                justify-content: center;
                align-items: center;
            }
        `}</style>
      
      <CSVUploader />
      <LineChart />


      {/* { showHideChart &&
      <div>
        <button onClick={() => this.hideComponent()}>
              Upload new CSV file
        </button>
      </div>
      } */}

    </div>;
  
}


