import React, { Component } from "react";
import update from "immutability-helper";
import {
  RIEToggle,
  RIEInput,
  RIETextArea,
  RIENumber,
  RIETags,
  RIESelect
} from "riek";

class EditCard extends Component {
  // Adds a class constructor that assigns the initial state values:
  constructor(props) {
    super();
    this.state = {
      card: {
        laneid: props.card.laneid,
        cardid: props.card.cardid,
        data: {
          title: props.card.data.title || "",
          description: props.card.data.description || ""
        }
      }
    };

    // callbacks
    this.cancel = props.onCancel.bind(this);

    this.setCardTitle = this.setCardTitle.bind(this);
    this.setCardProperty = this.setCardProperty.bind(this);

    this.setCardDescription = this.setCardDescription.bind(this);
    this.saveCard = this.saveCard.bind(this);
    this.onSaveCard = props.onSaveCard.bind(this);
  }

  setCardProperty(prop) {
    debugger;
    const name = Object.keys(prop)[0];
    this.setState({
      card: update(this.state.card, {
        data: { [name]: { $set: prop[name] } }
      })
    });
  }

  setCardTitle(e) {
    debugger;
    this.setState({
      card: update(this.state.card, {
        data: { title: { $set: e.target.value } }
      })
    });
  }

  setCardDescription(e) {
    this.setState({
      card: update(this.state.card, {
        data: { description: { $set: e.target.value } }
      })
    });
  }
  saveCard() {
    this.onSaveCard(this.state.card);
  }

  // The render method contains the JSX code which will be compiled to HTML.
  render() {
    return (
      <div className="card">
        <header className="card-header">
          <p class="card-header-title">
            <RIEInput
              value={this.state.card.data.title}
              change={this.setCardProperty}
              propName="title"
              classEditing="input"
            />
          </p>
          {/* {title} */}
          {/* <a href="#" className="card-header-icon" aria-label="more options">
            <span className="icon">
              <i className="fas fa-angle-down" aria-hidden="true" />
            </span>
          </a> */}
        </header>

        <div className="card-content">
          <div className="content">
            <div className="field">
              <div className="control">
                <RIETextArea
                  value={this.state.card.data.description}
                  change={this.setCardProperty}
                  propName="description"
                  classEditing="input"
                  rows="10"
                />

                {/* <input
                  className="input"
                  type="text"
                  placeholder="card title"
                  value={this.state.card.data.description}
                  onChange={this.setCardDescription}
                /> */}
              </div>
            </div>

            <div className="field is-grouped">
              <div className="control">
                <button className="button is-link" onClick={this.saveCard}>
                  Save
                </button>
              </div>
              <div className="control">
                <button className="button is-text" onClick={this.cancel}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default EditCard;
