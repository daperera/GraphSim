import React, { Component } from "react";
import Graph from "react-graph-vis";
import TextFieldGroup from "./components/TextFieldGroup";
import "./App.css";

class App extends Component {
  componentDidMount() {
    window.addEventListener("resize", this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize);
  }

  handleResize = () => {
    console.log("trying to reload page");
    //window.location.reload();
  };

  render() {
    var graph = {
      nodes: [
        { id: 1, label: "Node 1" },
        { id: 2, label: "Node 2" },
        { id: 3, label: "Node 3" },
        { id: 4, label: "Node 4" },
        { id: 5, label: "Node 5" }
      ],
      edges: [
        { from: 1, to: 2 },
        { from: 1, to: 3 },
        { from: 2, to: 4 },
        { from: 2, to: 5 }
      ]
    };

    var options = {
      layout: {
        hierarchical: false
      },
      edges: {
        color: "#000000"
      }
    };

    var events = {
      select: function(event) {
        var { nodes, edges } = event;
      }
    };

    return (
      <div className="App">
        <header className="App-header"> Graph Simulation </header>
        <div className="d-flex flex-row">
          <TextFieldGroup
            name="row"
            value={this.row}
            type="number"
            label="Row:"
          />
          <TextFieldGroup
            name="col"
            value={this.col}
            type="number"
            label="Col:"
          />
        </div>
        <div className="border border-dark w-100 h-75">
          <Graph graph={graph} options={options} events={events} />
        </div>
      </div>
    );
  }
}

export default App;
