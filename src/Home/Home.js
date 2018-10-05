import React, { Component } from "react";
import "./Home.css";
import config from "react-global-configuration";
//import axios from "axios";
import heroimg from "./hero-img1.jpg";
import { Link } from "react-router-dom";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projectName: ""
    }
    // const myGalleries = localStorage.getItem("mygalleries")
    //   ? JSON.parse(localStorage.getItem("mygalleries"))
    //   : [];
    // this.state = { mygalleries: myGalleries };
    // this.addGallery = this.addGallery.bind(this);
    this.setProjectName = this.setProjectName.bind(this);
  }


  setProjectName(event) {
    this.setState({ projectName: event.target.value });
  }


  // addGallery(hash) {
  //   axios.get(config.get("ipfsendpoint") + "/" + hash).then(res => {
  //     const gallery = res.data;
  //     if (gallery.images) {
  //       const newGalleries = [
  //         ...this.state.mygalleries,
  //         {
  //           title: gallery.title,
  //           previousversion: gallery.previousversion,
  //           hash: hash,
  //           titleimage: gallery.images[0].thumbnail,
  //           imagecount: gallery.images.length
  //         }
  //       ];
  //       // if this gallery replaces an older one - remove that one.
  //       var index = newGalleries.findIndex(function(element) {
  //         return element.hash === gallery.previousversion;
  //       });
  //       if (index !== -1) {
  //         newGalleries.splice(index, 1);
  //       }

  //       localStorage.setItem(
  //         "mygalleries",
  //         JSON.stringify(newGalleries.reverse())
  //       );
  //       this.setState({ mygalleries: newGalleries });
  //     }
  //   });
  // }

  render() {
    return (
      <div>
        <section className="hero is-fullheight is-default is-bold">
          <div className="hero-head">
            <nav className="navbar">
              <div className="container">
                <div className="navbar-brand">
                  <a className="navbar-item" href="../" />
                  <span
                    className="navbar-burger burger"
                    data-target="navbarMenu"
                  >
                    <span />
                    <span />
                    <span />
                  </span>
                </div>
                <div id="navbarMenu" className="navbar-menu">
                  <div className="navbar-end">
                    <div className="tabs is-right">
                      <ul>
                        <li className="is-active">
                          <a>Home</a>
                        </li>
                        <li>
                          <a href="#about">About</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </nav>
          </div>
          <div className="hero-body">
            <div className="container">
              <div className="columns is-vcentered">
                <div className="column is-5">
                  <figure className="image is-4by3">
                    <img src={heroimg} alt="Description" />
                  </figure>

                  <div className="card">
                    <div className="card-content">
                      <p className="title">Create your first project</p>
                      <div className="field">
                        <label className="label">Project name</label>
                        <div className="control">
                          <input
                            className="input"
                            type="text"
                            placeholder="Project Name"
                            onChange={this.setProjectName}
                          />
                        </div>
                      </div>
                      <Link
                        className="button is-medium is-info is-outlined"
                        to={`/createnew/${this.state.projectName}`}
                      >
                        Create Project
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="column is-6 is-offset-1 ">
                  <h1 className="title is-2">MICO</h1>
                  <h2 className="subtitle is-4">The bounty compatible DAICO</h2>
                  <br />
                  <p className="has-text-centered">
                    <a
                      className="button is-medium is-info is-outlined"
                      href="#about"
                    >
                      Learn more
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* <div className="hero-foot">
            <div className="container">
              <div className="tabs is-centered">
                <ul>
                  <li>
                    <a>And this is the bottom</a>
                  </li>
                </ul>
              </div>
            </div>
          </div> */}
        </section>

        <section className="section">
          <a name="about" />
          Explainer for MiCO
        </section>
      </div>
    );
  }
}

export default Home;
