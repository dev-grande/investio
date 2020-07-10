import React, {Component} from 'react';
import LineChart from "./components/LineChart";
import CSVUploader from "./components/CSVUploader"

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      showHideUpload: true,
      showHideChart: false
    };

    this.hideComponent = this.hideComponent.bind(this);
  }

  handleData = (dataVal) => {
    console.log(dataVal);
    this.setState({data: dataVal});
  }

  hideComponent() {
    this.setState({ showHideUpload: !this.state.showHideUpload })
    this.setState({ showHideChart: !this.state.showHideChart });

  }

  render() {
    const { showHideUpload, showHideChart } = this.state;

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
      
      { showHideUpload &&
        <CSVUploader onSelectFile={this.handleData} onDataLoaded={this.hideComponent}/>
      }
      
      {/* { showHideUpload &&
      <div>
        <button onClick={() => this.hideComponent()}>
              Create Chart
        </button>
      </div>
      } */}

      { showHideChart &&
      <div>
        <button onClick={() => this.hideComponent()}>
              Upload new CSV file
        </button>
      </div>
      }

      { showHideChart &&
        <LineChart data={this.state.data}/>
      }




    </div>;
  }
}

export default App;
