import React, {Component} from 'react';
import LineChart from "./LineChart";
// import data from "./data.js"
import Papa from 'papaparse';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    // Bind this to function updateData (This eliminates the error)
    this.updateData = this.updateData.bind(this);
  }

  componentWillMount() {
    // Your parse code, but not seperated in a function
    var csvFilePath = require("./data_2019.csv");
    Papa.parse(csvFilePath, {
      header: true,
      download: true,
      skipEmptyLines: true,
      // Here this is also available. So we can call our custom class method
      complete: this.updateData
    });
  }

  updateData(result) {
    const vals = result.data;
    var data = [];
    var colors = ["hsl(109, 70%, 50%)", "hsl(155, 70%, 50%)", "hsl(62, 70%, 50%)", "hsl(358, 70%, 50%)", "hsl(163, 70%, 50%)"];

    for (var ndx in vals) {
      var row = vals[ndx];
      var val1 = {};
      val1["data"] = [];
      val1["color"] = colors[ndx];

      for (var key in row) {
        if (key === "id") {
          val1[key] = row[key];
        }
        else {
          var val = {}
          val["x"] = key; 
          val["y"] = Number(row[key]);
          val1["data"].push(val);
        }
      }
      data.push(val1);
    }
    this.setState({ data: data });
  }

  render() {
    if (!this.state.data) {
      return <div />;
    }
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
      <LineChart data={this.state.data}/>
    </div>;
  }
}

export default App;
