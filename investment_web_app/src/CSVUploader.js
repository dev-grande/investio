import React, { Component } from 'react'
import { CSVReader } from 'react-papaparse'
export default class CSVUploader extends Component {

  handleOnDrop = (data) => {
    console.log('---------------------------')
    console.log("before parse")
    console.log(data)

    var result = [];
    var colors = ["hsl(109, 70%, 50%)", "hsl(155, 70%, 50%)", "hsl(62, 70%, 50%)", "hsl(358, 70%, 50%)", "hsl(163, 70%, 50%)"];

    var dates = []
    for (var ndx in data) {
      console.log(ndx);
      var vals = data[ndx].data;
      console.log(vals);

      if (ndx == 0) {
        dates = vals;
        dates.shift();
        console.log(dates);
      }
      else {
        var val1 = {};
        var row = vals;
        var id = row.shift();
        val1["id"] = id;
        val1["data"] = [];
        val1["color"] = colors[ndx];
        var date_ndx = 0;

        for (var val in row) {
          var v = {}
          v["x"] = dates[date_ndx]; 
          v["y"] = Number(row[val]);
          val1["data"].push(v);
          date_ndx = date_ndx + 1;
        }
        result.push(val1); 
      }
    }

    console.log("after parse")
    console.log(result);

    this.props.onSelectFile(result);
    console.log('---------------------------')
  }

  handleOnError = (err, file, inputElem, reason) => {
    console.log(err)
  }

  handleOnRemoveFile = (data) => {
    console.log('---------------------------')
    console.log(data)
    console.log('---------------------------')
  }

  render() {
    return (
      <CSVReader
        onDrop={this.handleOnDrop}
        onError={this.handleOnError}
        addRemoveButton
        onRemoveFile={this.handleOnRemoveFile}
      >
        <span>Drop CSV file here or click to upload.</span>
      </CSVReader>
    )
  }
}