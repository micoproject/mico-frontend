import React, { Component } from "react";
import "./MicoManager.css";
import "./modal-fx.min.css";
import Board from "react-trello";
import ipfsAPI from "ipfs-mini";
import update from "immutability-helper";
import EditCard from "../EditCard/EditCard";
import isIpfs from "is-ipfs";

class MicoManager extends Component {
  constructor(props) {
    super();
    this.ipfs = new ipfsAPI({
      host: "ipfs.web3.party",
      port: 5001,
      protocol: "https"
    });
    // this.ipfs = new ipfsAPI({
    //   host: "127.0.0.1",
    //   port: 5001,
    //   protocol: "http"
    // });

    this.dataChanged = this.dataChanged.bind(this);

    this.onCardClick = this.onCardClick.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);

    this.getCard = this.getCard.bind(this);
    this.saveCard = this.saveCard.bind(this);

    this.state = { loading: true };
    this.projectid = props.match.params.projectid;
  }

  async componentDidMount() {
    var mico;
    if (isIpfs.multihash(this.projectid)) {
      //it's IPFS
      await this.ipfs.cat(this.projectid, (err, res) => {
        console.log("new state loaded => " + res);
        res = JSON.parse(res);
        this.setState({
          loading: false,
          mico: res,
          boarddata: res.boarddata
        });
      });
    } else {
      //it's localstorage
      const micos = localStorage.getItem("micos")
        ? JSON.parse(localStorage.getItem("micos"))
        : [];

      let micoID = this.projectid;
      mico = micos[micoID];

      this.setState({
        loading: false,
        mico: mico,
        boarddata: mico.boarddata
      });
    }
  }

  getCard(laneId, cardId) {
    var lane, card;
    lane = this.state.boarddata.lanes.find(item => {
      return item.id === laneId;
    });
    card = lane.cards.find(item => {
      return item.id === cardId;
    });
    return card;
  }

  saveCard(newCard) {
    console.log("new card", newCard);
    var lane, card;
    lane = this.state.boarddata.lanes.findIndex(item => {
      return item.id === newCard.laneid;
    });
    card = this.state.boarddata.lanes[lane].cards.findIndex(item => {
      return item.id === newCard.cardid;
    });

    const newBoardState = update(this.state.boarddata, {
      lanes: {
        [lane]: {
          cards: {
            [card]: {
              title: { $set: newCard.data.title },
              description: { $set: newCard.data.description }
            }
          }
        }
      }
    });
    console.log("mico", newBoardState);
    this.setState({
      boarddata: newBoardState
    });
    this.handleCloseModal();
  }

  onCardClick(cardId, metadata, laneId) {
    var c = this.getCard(laneId, cardId);
    this.setState({
      editCard: true,
      editedCard: { laneid: laneId, cardid: cardId, data: c }
      //editedCardData: c
    });
    this.closeModalListener = document.addEventListener("keyup", e => {
      if (e.keyCode === 27) this.handleCloseModal();
    });
  }

  handleCloseModal() {
    this.setState({
      editCard: false,
      editedCard: null,
      editedCardData: null
    });
  }

  dataChanged(newData) {
    console.log("new data", newData);
    this.setState({
      boarddata: newData
    });
    var newMico = this.state.mico;
    newMico.boarddata = newData;

    this.ipfs.add(JSON.stringify(newMico), (err, res) => {
      console.log("new state saved => " + res);
      this.props.history.push("/manage/" + res);
    });
  }

  // The render method contains the JSX code which will be compiled to HTML.
  render() {
    if (this.state.loading) {
      return <div>Loading</div>;
    } else {
      return (
        <div>
          <section className="section">
            <Board
              data={this.state.boarddata}
              draggable
              editable
              onDataChange={this.dataChanged}
              onCardClick={this.onCardClick}
            />
          </section>
          {this.state.editCard && (
            <div
              id="modal-card2"
              className="modal is-clippe is-active modal-fx-3dSlit"
            >
              <div className="modal-background" />
              <div className="modal-content is-tiny">
                <EditCard
                  onSaveCard={this.saveCard}
                  onCancel={this.handleCloseModal}
                  card={this.state.editedCard}
                />
              </div>
            </div>
          )}
        </div>
      );
    }
  }
}

export default MicoManager;
