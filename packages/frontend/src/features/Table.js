import React from 'react';

export class Table extends React.Component {
    constructor(props) {
        super(props);
        var full_data = props.vals;
    
        const parent_div ={
            height: '40vh',
            overflow: 'hidden'
          };
    
        var full_data_keys = Object.keys(full_data[0]);

        var sort_asc_desc = {};
        full_data_keys.map((key) => {
            sort_asc_desc[key] = 'desc';
            }
        );

        this.state = {
          full_data,
          parent_div,
          full_data_keys,
          sort_asc_desc
        };

        // this.sort_column = this.sort_column.bind(this);
        // this.generate_table = this.generate_table.bind(this);
      }

       sort_column (key) {
        console.log("in sort column");
        var data = this.state.full_data;
        var new_sort = this.state.sort_asc_desc;
        if (this.state.sort_asc_desc[key] == 'desc') {
            data.sort((a, b) => (a[key] < b[key]) ? 1 : -1);
            new_sort[key] = 'asc'
        }
        else {
            data.sort((a, b) => (a[key] > b[key]) ? 1 : -1);
            new_sort[key] = 'desc'
        }
        
        this.setState( {
            full_data: data,
            sort_asc_desc: new_sort
        })
    }

    generate_table = ( keys, data ) => {
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
                                <button onClick={() => this.sort_column(key)} style={{border: "0", height: '3vh'}}>#</button>
                            </th>);
                        else if (key === "symbol")
                            return (<th key={index} style={{position: 'sticky', top: '0'}}>
                                <button onClick={() => this.sort_column(key)} style={{border: "0", height: '3vh'}}>STOCK</button>
                            </th>);
                       if (key !== "percent") 
                        return <th key={index} style={{position: 'sticky', top: '0'}}>
                            <button onClick={() => this.sort_column(key)} style={{border: "0", height: '3vh'}}>{key.toUpperCase()}</button>
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

    render() {
        return (
            <div style={this.state.parent_div} >
                {this.generate_table( this.state.full_data_keys, this.state.full_data )}
            </div>
        )
    }
  }
