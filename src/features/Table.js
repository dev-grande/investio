import React from 'react';

function generate_table( keys, data ){
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
            <tr>{keys.map((key, index) =>
                    <th key={index} style={{position: 'sticky', top: '0'}}>{key.toUpperCase()}</th>
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
        </div>
    )

}

export function Table ( vals ) {
    var full_data = vals.vals;

    const parent_div ={
        height: '25vh',
        overflow: 'hidden'
      };

    var full_data_keys = Object.keys(full_data[0]);
    return (
        <div style={parent_div} >
            {generate_table( full_data_keys, full_data )}
        </div>
    )
}


// import React from 'react';
// import { MDBDataTableV5 } from 'mdbreact';

// const Table = (vals) => {
//     if (vals.vals.length === 0) return (<div></div>);
//     var data = {
//         columns : [],
//         rows : []
//     }

//     var header_vals = Object.keys(vals.vals[0]);
//     data.columns = header_vals.map( (header) => 
//         ({  label: header.toUpperCase(),
//             field: header })
//     )

//     data.rows = vals.vals;

//   return (
// <div>
//     <div className="row justify-content-center">
//         <h3>{vals.title}</h3> 
//     </div> 
//     <MDBDataTableV5
//       scrollY
//       maxHeight="20vh"
//       // striped
//       // bordered
//       small
//       data={data}
//       info={false}
//       paging={false}
//       searching={false}
//       sortable={false}
//     />

//     {/* <MDBDataTableV5 
//     hover 
//     // scrollY 
//     // maxHeight='25vh' 
//     entries={4} 
//     data={data} 
//     info={false}
//     entriesOptions={[2, 4]} 
//     small
//     // paging={false}
//     searching={false}
//     sortable={false} 
//     /> */}
// </div>
//   );
// }

