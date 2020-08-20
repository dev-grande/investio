import React from 'react';
import { MDBDataTableV5 } from 'mdbreact';
import { CSVLink } from "react-csv";
import { Row, Button} from 'react-bootstrap';

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
        <MDBDataTableV5
        hover 
        small
        entriesOptions={[5, 10, 20, 25]} 
        entries={10} 
        pagesAmount={4} 
        data={data} 
        pagingTop
        searchTop
        searchBottom={false}
        sortable={false}
        />

    <Row>
    <CSVLink data={vals.vals} filename={vals.export_name}>
          <Button variant="light" style={{fontSize: "13px", boxShadow: 'none', border: '0'}}> Export </Button>
          </CSVLink>

    </Row>
    </div>

  );
}

