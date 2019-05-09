import React, { Component } from "react";
import TextFieldGroup from "./components/TextFieldGroup";

import "../App.css";

class GraphCreationPanel extends Component {
  render() {
    return (
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
    );
  }
}

export default GraphCreationPanel;
