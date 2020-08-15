import React from 'react';

function generate_table( keys, data ){
    return (
        <table className="ui celled table">
        <thead>
            <tr>{keys.map((key, index) =>
                    <th key={index}>{key.toUpperCase()}</th>
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
    var full_data = vals.vals;

    var full_data_keys = Object.keys(full_data[0]);
    return (
        <div>

            {/* <div className="row justify-content-center"><h3>{title}</h3></div> */}
            {generate_table( full_data_keys, full_data )}
            <br></br> <br></br>

        </div>
    )

    


    

}