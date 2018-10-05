import React, { Component } from "react";
import update from "immutability-helper";

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
        },
        edittitle: false
      }
    };

    // callbacks
    this.cancel = props.onCancel.bind(this);

    this.setCardTitle = this.setCardTitle.bind(this);
    this.setCardDescription = this.setCardDescription.bind(this);
    this.saveCard = this.saveCard.bind(this);
    this.onSaveCard = props.onSaveCard.bind(this);
    this.toggleEditTitle = this.toggleEditTitle.bind(this);
  }

  toggleEditTitle() {
    var edittitle = this.state.edittitle;
    this.setState({ edittitle: !edittitle });
  }

  setCardTitle(e) {
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
    var title;
    if (!this.state.edittitle) {
      title = (
        <p onClick={this.toggleEditTitle} className="card-header-title">
          {this.state.card.data.title}
        </p>
      );
    } else {
      title = (
        <div className="field">
          <div className="control">
            <input
              className="input"
              type="text"
              placeholder="card title"
              value={this.state.card.data.title}
              onChange={this.setCardTitle}
            />
          </div>
        </div>
      );
    }

    return (
      <div className="card">
        <header className="card-header">
          {title}
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
                <input
                  className="input"
                  type="text"
                  placeholder="card title"
                  value={this.state.card.data.description}
                  onChange={this.setCardDescription}
                />
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
