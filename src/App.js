import React, { Component } from "react";
import Graph from "react-graph-vis";

import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);

    // grid size
    const nrow = 5;
    const ncol = 5;

    // create grid
    const graph = [];
    for (var i = 0; i < nrow; i++) {
      for (var j = 0; j < ncol; j++) {
        // define node
        const currId = i * nrow + j;
        const label = "(" + i + "," + j + ")";
        var state = nodeState.suspected;
        if (i === 0) {
          state = nodeState.infected;
        }
        if (i === 1) {
          state = nodeState.killed;
        }
        if (i > 2) {
          state = nodeState.safe;
        }
        const x = i;
        const y = j;

        // define edges
        const edges = [];
        if (i > 0) {
          const neighId = (i - 1) * nrow + j;
          edges.push(neighId);
        }
        if (j > 0) {
          const neighId = i * nrow + j - 1;
          edges.push(neighId);
        }
        if (i < nrow - 1) {
          const neighId = (i + 1) * nrow + j;
          edges.push(neighId);
        }
        if (j < ncol - 1) {
          const neighId = i * nrow + j + 1;
          edges.push(neighId);
        }

        // add node to graph
        graph.push({
          id: currId,
          label: label,
          state: state,
          x: x,
          y: y,
          edges: edges
        });
      }
    }

    // graph parameter
    const options = {
      layout: {
        hierarchical: false
      },
      edges: {
        color: "#000000"
      }
    };

    this.state = {
      graph: graph,
      options: options
    };
  }

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
    // grid styling
    const nodeDistance = 100;

    // define graph
    const nodes = [];
    const edges = [];

    for (var i = 0; i < this.state.graph.length; i++) {
      const { id, label, state, x, y } = this.state.graph[i];
      const nodeEdges = this.state.graph[i].edges;
      // define node
      var color;
      if (state === nodeState.infected) {
        color = "red";
      } else if (state === nodeState.killed) {
        color = "gray";
      } else if (state === nodeState.suspected) {
        color = "DodgerBlue ";
      } else if (state === nodeState.safe) {
        color = "SpringGreen ";
      }

      nodes.push({
        id: id,
        label: label,
        x: x * nodeDistance,
        y: y * nodeDistance,
        color: color,
        physics: false
      });

      // add edges
      for (var j = 0; j < nodeEdges.length; j++) {
        const neighId = nodeEdges[j];
        edges.push({ from: id, to: neighId });
      }
    }

    const graph = { nodes: nodes, edges: edges };

    const options = this.state.options;

    var events = {
      select: function(event) {
        var { nodes, edges } = event;
      }
    };

    return (
      <div className="App">
        <header className="App-header"> Graph Simulation </header>
        <div className="border border-dark w-100 h-75">
          <Graph graph={graph} options={options} events={events} />
        </div>
      </div>
    );
  }
}

const nodeState = {
  suspected: "suspected",
  infected: "infected",
  killed: "killed",
  safe: "safe"
};

export default App;
