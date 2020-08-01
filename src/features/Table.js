import React from 'react';

function generate_table( keys, data ){
    return (
        <table className="ui celled table">
        <thead>
            <tr>{keys.map((key, index) =>
                    <th key={index}>{key}</th>
            )}</tr>
        </thead>
        <tbody>
            {data.map((row, index) =>
                <tr key={index}>{keys.map((key, index) =>
                    <td data-label={key} key={index}>{row[key]}</td>
                )}</tr>
            )}
        </tbody>
        </table>
    )

}

export function Table ( vals ) {
    var aggregated_data = vals.data.chart_data[0].data.map(row => ( { MONTH: row.x,  AMOUNT: row.y.toFixed(2)}))
    var aggregated_data_keys = Object.keys(aggregated_data[0]);

    var full_data = vals.data.full_data;
    var full_data_keys = Object.keys(full_data[0]);

    return (
        <div>
            
            <div className="row justify-content-center"><h3>Aggregated Dividends {vals.data.year}</h3></div>
            {generate_table( aggregated_data_keys, aggregated_data )}

            <br></br> <br></br>

            <div className="row justify-content-center"><h3>Full List of Dividends {vals.data.year}</h3></div>
            {generate_table( full_data_keys, full_data )}
        </div>
    )

    


    

}