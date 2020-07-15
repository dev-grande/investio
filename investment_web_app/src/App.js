import React, { useState } from 'react';
import { LineChart } from "./features/LineChart";
import { CSVUploader } from "./features/CSVUploader";
import { CSVUploaderDrag } from "./features/CSVUploaderDrag";
import { Navbar,Nav,NavDropdown,Form,FormControl,Button } from 'react-bootstrap'


export function App() {
    return (    
    <div>
      
      <Navbar bg="dark" expand="lg" variant="dark" >
        <Navbar.Brand bg="light" href="#home">Investment Web App</Navbar.Brand>
        <Nav class="ml-auto">
          <CSVUploader />
        </Nav>
      </Navbar>

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


