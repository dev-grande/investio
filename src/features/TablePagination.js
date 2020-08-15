import React from 'react';
import { MDBDataTableV5 } from 'mdbreact';

export function TablePagination(vals){
    if (vals.vals.length === 0) return (<div></div>);
    var data = {
        columns : [],
        rows : []
    }

    var header_vals = Object.keys(vals.vals[0]);
    data.columns = header_vals.map( (header) => 
        ({  label: header.toUpperCase(),
            field: header,
            sort: "asc" })
    )

    data.rows = vals.vals;
 
  return (
<div>
    <div className="row justify-content-center">

        <h3>{vals.title}</h3> 
    </div> 

    {/* <div className="row justify-content-center"> */}

        <MDBDataTableV5
        hover 
        // bordered
        small
        entriesOptions={[5, 10, 20, 25]} 
        entries={10} 
        pagesAmount={4} 
        data={data} 
        pagingTop
        searchTop
        searchBottom={false}
        />

    {/* </div> */}
    </div>

  );
}

