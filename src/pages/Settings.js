import React from 'react';
import NavBar from '../features/NavBar'
import { CSVUploader } from '../features/CSVUploader'

export function Settings() {

    return (    
      <div>
        <NavBar />
        <div class="mt-4 container  ui segment">
          <h1>Settings Page</h1>
          <h4>DATA IMPORT</h4>
          <CSVUploader />
        </div>
      </div>
    );
  
}


