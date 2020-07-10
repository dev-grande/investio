import React, {Component} from 'react';
import LineChart from "./LineChart";
import CSVUploader from "./CSVUploader"

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {data: []};
  }

  handleData = (dataVal) => {
    console.log(dataVal);
    this.setState({data: dataVal});
  }

  render() {
    // if (!this.state.data) {
    //   return <div />;
    // }

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
      <CSVUploader onSelectFile={this.handleData}/>
      <LineChart data={this.state.data}/>
    </div>;
  }
}

export default App;
