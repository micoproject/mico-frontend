import React, { Component } from "react";
import "./CreateMico.css";
import uuid from "uuid/v4";

class CreateMico extends Component {
  // Adds a class constructor that assigns the initial state values:
  constructor(props) {
    super();
    //this.props = props;
    this.state = {
      projectName: props.match.params.projectname,
      firstPhaseName: "",
      firstPhaseRatio: "",
      fundingToken: "",
      projectDescription: "",
      rewardsWallet: "",
      tokenName: "",
      tokenSymbol: "",
      creatingMICO: false,
      creatingPercent: 0,
      createdMico: ""
    };

    this.setProjectName = this.setProjectName.bind(this);
    this.setFirstPhaseName = this.setFirstPhaseName.bind(this);
    this.setFirstPhaseRatio = this.setFirstPhaseRatio.bind(this);
    this.setFundingToken = this.setFundingToken.bind(this);
    this.setProjectDescription = this.setProjectDescription.bind(this);
    this.setRewardsWallet = this.setRewardsWallet.bind(this);
    this.setTokenName = this.setTokenName.bind(this);
    this.settokenSymbol = this.settokenSymbol.bind(this);
    this.next = this.next.bind(this);
    this.cancel = this.cancel.bind(this);
    this.toManager = this.toManager.bind(this);
  }

  setProjectName(event) {
    this.setState({ projectName: event.target.value });
  }

  setFirstPhaseName(event) {
    this.setState({ firstPhaseName: event.target.value });
  }

  setFirstPhaseRatio(event) {
    this.setState({ firstPhaseRatio: event.target.value });
  }

  setFundingToken(event) {
    this.setState({ fundingToken: event.target.value });
  }

  setProjectDescription(event) {
    this.setState({ projectDescription: event.target.value });
  }

  setRewardsWallet(event) {
    this.setState({ rewardsWallet: event.target.value });
  }

  setTokenName(event) {
    this.setState({ tokenName: event.target.value });
  }

  settokenSymbol(event) {
    this.setState({ tokenSymbol: event.target.value });
  }

  next() {
    console.log(this.state);
    this.setState({ creatingMICO: true });
    this.creationTimer = setInterval(() => {
      if (this.state.creatingPercent >= 100) {
        clearInterval(this.creationTimer);

        let id = uuid();
        let micos = {};

        // let phases = {};
        // phases[uuid()] = {
        //     name: this.state.firstPhaseName,
        //     ratio: this.state.firstPhaseRatio
        // };

        micos[id] = {
          name: this.state.projectName,
          description: this.state.projectDescription,
          //phases: phases,
          token: {
            address: "0x1234",
            name: this.state.tokenName,
            symbol: this.state.tokenSymbol
          },
          boarddata:  {
            lanes: [
              {
                id: uuid(),
                title: this.state.firstPhaseName,
                label: this.state.firstPhaseRatio,
                cards: [
                //   {
                //     id: "Fase",
                //     title: "Landingpage",
                //     description: "Create a landingpage for MICO",
                //     label: "open for funding",
                //     price: "10 ETH"
                //   },
                //   {
                //     id: "Card2",
                //     title: "Build MICO board",
                //     description:
                //       "Build MICO manager board. Refer to <...> for more details",
                //     label: "draft",
                //     metadata: { sha: "be312a1" }
                //   }
                ]
              },
            //   {
            //     id: "lane2",
            //     title: "Phase 1",
            //     label: "0/0",
            //     cards: []
            //   },
            //   {
            //     id: "lane3",
            //     title: "Phase 2",
            //     label: "0/0",
            //     cards: []
            //   }
            ]
          }
        };
       
        localStorage.setItem(
            "micos",
            JSON.stringify(micos)
          );

        this.setState({
          //micos: micos,
          createdMico: id
        });
      } else {
        this.setState({ creatingPercent: this.state.creatingPercent + 10 });
      }
    }, 10);
  }

  cancel() {
    console.log("cancel...");
  }

  toManager() {
    this.props.history.push("/manage/" + this.state.createdMico);
  }

  render() {
    return (
      <div className="container">
        <div className="columns">
          <div className="column is-3">
            <aside className="menu">
              <p className="menu-label">General</p>
              <ul className="menu-list">
                <li>
                  <a href="#description">Description</a>
                </li>
                <li>
                  <a href="#token">Project Token</a>
                </li>
                <li>
                  <a href="#fundingtoken">Funding Token</a>
                </li>
              </ul>
              <p className="menu-label">Team</p>
              <ul className="menu-list">
                <li>
                  <a href="#team">Reward Address</a>
                </li>
              </ul>
              {/* <p className="menu-label">Administration</p>
              <ul className="menu-list">
                <li>
                  <a>Team Settings</a>
                </li>
                <li>
                  <a>Manage Your Team</a>
                  <ul>
                    <li>
                      <a>Members</a>
                    </li>
                    <li>
                      <a>Plugins</a>
                    </li>
                    <li>
                      <a>Add a member</a>
                    </li>
                  </ul>
                </li>
                <li>
                  <a>Invitations</a>
                </li>
                <li>
                  <a>Cloud Storage Environment Settings</a>
                </li>
                <li>
                  <a>Authentication</a>
                </li>
              </ul>
              <p className="menu-label">Transactions</p>
              <ul className="menu-list">
                <li>
                  <a>Payments</a>
                </li>
                <li>
                  <a>Transfers</a>
                </li>
                <li>
                  <a>Balance</a>
                </li>
              </ul> */}
            </aside>
          </div>
          <div className="column is-9">
            {/* <nav className="breadcrumb" aria-label="breadcrumbs">
                    <ul>
                        <li><a href="../">Bulma</a></li>
                        <li><a href="../">Templates</a></li>
                        <li><a href="../">Examples</a></li>
                        <li className="is-active"><a href="#" aria-current="page">Admin</a></li>
                    </ul>
                </nav> */}
            <section className="hero is-info welcome is-small">
              <div className="hero-body">
                <div className="container">
                  <h1 className="title">
                    New project: {this.state.projectName}
                  </h1>
                  <h2 className="subtitle">Let's configure your project!</h2>
                </div>
              </div>
            </section>

            <div className="columns">
              <div className="column is-12">
                <div className="card events-card">
                  <a name="description" />
                  <header className="card-header">
                    <p className="card-header-title">Project description</p>
                  </header>
                  <div className="card-content">
                    <div className="field">
                      <label className="label">Name</label>
                      <div className="control">
                        <input
                          className="input"
                          type="text"
                          placeholder="your projects' name"
                          value={this.state.projectName}
                          onChange={this.setProjectName}
                        />
                      </div>
                    </div>
                    <div className="field">
                      <label className="label">Description</label>
                      <textarea
                        className="textarea"
                        placeholder="Describe your project"
                        rows="10"
                        value={this.state.projectDescription}
                        onChange={this.setProjectDescription}
                      />
                    </div>
                  </div>
                </div>
                <div className="card events-card">
                  <a name="token" />
                  <header className="card-header">
                    <p className="card-header-title">Project Token</p>
                  </header>

                  <div className="card-content">
                    <div className="field">
                      <label className="label">Name</label>
                      <div className="control">
                        <input
                          className="input"
                          type="text"
                          placeholder="your token name"
                          value={this.state.tokenName}
                          onChange={this.setTokenName}
                        />
                      </div>
                    </div>
                    <div className="field">
                      <label className="label">Ticker name</label>
                      <div className="control">
                        <input
                          className="input"
                          type="text"
                          placeholder="your token 3 or 4 letter abbreviation (ex. MPT)"
                          value={this.state.tokenSymbol}
                          onChange={this.settokenSymbol}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="card events-card">
                  <a name="token" />
                  <header className="card-header">
                    <p className="card-header-title">funding Token</p>
                  </header>

                  <div className="card-content">
                    <div className="field">
                      <label className="label">Name</label>
                      <div className="control">
                        <div className="select">
                          <select
                            value={this.state.fundingToken}
                            onChange={this.setFundingToken}
                          >
                            <option>ETH - Ether</option>
                            <option>SWT - Swarm City Token</option>
                            <option>DAI - Dai</option>
                          </select>
                        </div>
                        <p className="help">
                          Which token will be used to fund cards ?
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="card events-card">
                  <a name="initialphase" />
                  <header className="card-header">
                    <p className="card-header-title">inital project phase</p>
                  </header>

                  <div className="card-content">
                    <div className="field">
                      <label className="label">Name</label>
                      <div className="control">
                        <input
                          className="input"
                          type="text"
                          placeholder="What is the first phase in your project?"
                          value={this.state.firstPhaseName}
                          onChange={this.setFirstPhaseName}
                        />
                        <p className="help">
                          note: you can add more project phases later
                        </p>
                      </div>
                    </div>
                    <div className="field">
                      <label className="label">Token reward ratio</label>
                      <div className="control">
                        <input
                          className="input"
                          type="text"
                          placeholder="How many tokens will there be rewarded for each unit of funding token ?"
                          value={this.state.firstPhaseRatio}
                          onChange={this.setFirstPhaseRatio}
                        />
                        <p className="help">
                          ex. 400: 400 Tokens will be created for each 1{" "}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="card events-card">
                  <a name="team" />
                  <header className="card-header">
                    <p className="card-header-title">Project team</p>
                  </header>

                  <div className="card-content">
                    <div className="field">
                      <label className="label">Rewards wallet</label>
                      <div className="control">
                        <input
                          className="input"
                          type="text"
                          placeholder="wallet address of your team rewards"
                          value={this.state.rewardsWallet}
                          onChange={this.setRewardsWallet}
                        />
                        <p className="help">
                          this can be an account, a contract or a multisig
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="field is-grouped">
                  <p className="control">
                    <a className="button" onClick={this.next}>
                      Next
                    </a>
                  </p>
                  <p className="control">
                    <a className="button is-light" onClick={this.cancel}>
                      Cancel
                    </a>
                  </p>
                </div>
                {this.state.creatingMICO && (
                  <div className="modal is-active">
                    <div className="modal-background" />
                    <div className="modal-card">
                      <header className="modal-card-head">
                        <p className="modal-card-title">
                          Creating MICO project
                        </p>
                        <button className="delete" aria-label="close" />
                      </header>
                      <section className="modal-card-body">
                        <progress
                          class="progress is-info"
                          value={this.state.creatingPercent}
                          max="100"
                        >
                          {this.state.creatingPercent}%
                        </progress>
                      </section>
                      <footer className="modal-card-foot">
                        <button
                          className="button is-success"
                          onClick={this.toManager}
                          disabled={this.state.createdMico === ""}
                        >
                          Next
                        </button>
                      </footer>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CreateMico;
