import React, { useState } from 'react';

export function Table (p)  {

    var sort_vals = {};
    Object.keys(p.vals[0]).map((key) => {
        sort_vals[key] = 'desc';
    });

    const [vals, setVals] = useState({
        sort_asc_desc: sort_vals,
        full_data: p.vals
    })

    const {sort_asc_desc, full_data} = vals;

    if (p.vals !== full_data) {
        setVals(vals => ({ ...vals, full_data: p.vals }));
    }

      
    function sort_column (key) {
        console.log("in sort column");
        var data = p.vals;
        var new_sort = sort_asc_desc;
        if (sort_asc_desc[key] == 'desc') {
            data.sort((a, b) => (a[key] < b[key]) ? 1 : -1);
            new_sort[key] = 'asc'
        }
        else {
            data.sort((a, b) => (a[key] > b[key]) ? 1 : -1);
            new_sort[key] = 'desc'
        }

        setVals(vals => ({ ...vals, full_data: data, sort_asc_desc: new_sort }));
        
    }

    function generate_table( ) {
        var data = full_data;
        var keys = Object.keys(data[0]);

        var child_div =  {
          height: '100%',
          marginRight: '-50px', /* Maximum width of scrollbar */
          paddingRight: '50px', /* Maximum width of scrollbar */
          overflowY: 'scroll'
        }
    
        return (
            <div style={child_div}>
            <table className="ui celled table">
            <thead >
                <tr>{keys.map( (key, index) => {
                        if (key === "quantity") 
                            return (<th key={index} style={{position: 'sticky', top: '0'}}>
                                <button onClick={() => sort_column(key)} style={{border: "0", height: '3vh'}}>#</button>
                            </th>);
                        else if (key === "symbol")
                            return (<th key={index} style={{position: 'sticky', top: '0'}}>
                                <button onClick={() => sort_column(key)} style={{border: "0", height: '3vh'}}>STOCK</button>
                            </th>);
                       if (key !== "percent") 
                        return <th key={index} style={{position: 'sticky', top: '0'}}>
                            <button onClick={() => sort_column(key)} style={{border: "0", height: '3vh'}}>{key.toUpperCase()}</button>
                        </th>;
                    }
                )}</tr>
            </thead>
            <tbody>
                {data.map((row, index) =>
                    <tr key={index}>{keys.map(function (key, index) {

                        if (key === "close"  || key === "amount" ) {
                            return <td data-label={key} key={index} >${row[key].toLocaleString('en')}</td>
                        }

                        else if ( key === "price") {
                            if (row["change"] > 0) return <td data-label={key} key={index} style={{color: "#34B244"}}>${row[key].toLocaleString('en')}</td>
                            return <td data-label={key} key={index} style={{color: "#E30000"}}>${row[key].toLocaleString('en')}</td>
                        }

                        else if ( key === "change"|| key === "price") {
                            if (row["change"] > 0) return <td data-label={key} key={index} style={{color: "#34B244"}}>+{row[key].toLocaleString('en')}    ({row.percent}%) </td>
                            return <td data-label={key} key={index} style={{color: "#E30000"}}>{row[key].toLocaleString('en')}   ({row.percent}%) </td>
                        }
                        
                        else if (key === "percent"){
                            return;
                        }

                        return <td data-label={key} key={index}>{row[key].toLocaleString('en')}</td> 
                    
                    }
                    )}</tr>
                )}
            </tbody>
            </table>
            </div>
        )
    
    }


    return (
        <div style={{height: '40vh',overflow: 'hidden' }} >
            {generate_table()}
        </div>
    )
    
  }

