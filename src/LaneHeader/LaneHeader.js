import React, { Component } from "react";
import update from "immutability-helper";
import {
  RIEToggle,
  RIEInput,
  RIETextArea,
  RIENumber,
  RIETags,
  RIESelect
} from "@attently/riek";

class LaneHeader extends Component {
  // Adds a class constructor that assigns the initial state values:
  constructor(props) {
    super();
    this.state = {
      lane: {
        id: props.id,
        title: props.title
      },
      showbuttons: false
    };
    this.setLaneProperty = this.setLaneProperty.bind(this);
    this.showButtons = this.showButtons.bind(this);
    this.hideButtons = this.hideButtons.bind(this);
    this.cancel = this.cancel.bind(this);
    this.onSaveLane = props.onSaveLane.bind(this);
  }

  setLaneProperty(prop) {
    const name = Object.keys(prop)[0];
    this.setState(
      {
        lane: update(this.state.lane, {
          [name]: { $set: prop[name] }
        })
      },
      () => {
        this.onSaveLane(this.state.lane);
      }
    );
  }

  showButtons() {
    this.setState({ showbuttons: true });
  }

  hideButtons() {
    this.setState({ showbuttons: false });
  }

  cancel() {
    this.hideButtons();
  }

  // The render method contains the JSX code which will be compiled to HTML.
  render() {
    return (
      <div>
        <div className="field">
          <div className="control has-icons-right">
            <RIEInput
              value={this.state.lane.title || "Click to edit"}
              change={this.setLaneProperty}
              propName="title"
              classEditing="input"
              beforeStart={this.showButtons}
              afterFinish={this.hideButtons}
              editing={this.state.showbuttons}
            />
            <span className="icon is-right">
              <i className="fas fa-check fa-sm" />
            </span>
          </div>
        </div>

        {this.state.showbuttons && (
          <div className="field is-grouped">
            <div className="control">
              <button className="button is-link">Save</button>
            </div>
            <div className="control">
              <button className="button is-text" onClick={this.cancel}>
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default LaneHeader;
