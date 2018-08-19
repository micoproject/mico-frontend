import React, { Component } from "react";
import "./MicoManager.css";
import Board from "react-trello";
import ipfsAPI from "ipfs-api";

class MicoManager extends Component {
  // Adds a class constructor that assigns the initial state values:
  constructor() {
    super();
    this.ipfs = ipfsAPI("ipfsapi.swarm.city", "443", { protocol: "https" }); // leaving out the arguments will default to these values

    this.setEventBus = this.setEventBus.bind(this);
    this.dataChanged = this.dataChanged.bind(this);
    this.eventBus = undefined;
    this.state = {
      faucetinfo: null,
      data: {
        lanes: [
          {
            id: "lane1",
            title: "Backlog",
            label: "2/2",
            cards: [
              {
                id: "Card1",
                title: "Landingpage",
                description: "Create a landingpage for MICO",
                label: "open for funding",
                price: "10 ETH"
              },
              {
                id: "Card2",
                title: "Build MICO board",
                description: "Build MICO manager board. Refer to <...> for more details",
                label: "draft",
                metadata: { sha: "be312a1" }
              }
            ]
          },
          {
            id: "lane2",
            title: "Phase 1",
            label: "0/0",
            cards: []
          },
          {
            id: "lane3",
            title: "Phase 2",
            label: "0/0",
            cards: []
          }
        ]
      }
    };
  }

  setEventBus(handle) {
    this.eventBus = handle;
    //To add a card
    this.eventBus.publish({
      type: "ADD_CARD",
      laneId: "lane2",
      card: {
        id: "M1",
        title: "Setup Association",
        label: "funded",
        description: "Create Swiss Association for MICO"
      }
    });
  }

  dataChanged(newData) {
    console.log("new data", newData);
    this.ipfs.add(new this.ipfs.Buffer(JSON.stringify(newData)), function(err, res) {
      console.log('new state saved => ' + res[0].hash);
    });
  }

  // The render method contains the JSX code which will be compiled to HTML.
  render() {
    return (
      <section className="section">
        <Board
          data={this.state.data}
          draggable
          editable
          eventBusHandle={this.setEventBus}
          onDataChange={this.dataChanged}
        />
      </section>
    );
  }
}

export default MicoManager;
