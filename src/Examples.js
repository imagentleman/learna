import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Examples.css";

class Examples extends Component {
  state = {
    title: "Learna",
    links: [
      {
        text: "Home",
        url: "/"
      },
      {
        text: "Examples",
        url: "/examples"
      }
    ],
    newCtaText: "Create",
    saveCtaText: "Save",
    repo: {
      url: "https://github.com/imagentleman/learna",
      text: "Github"
    },
    headerTitle: "Examples",
    examples: [
      {
        title: "Hello World!",
        url: "/examples/hello-world.html",
        learna: "/learna/agtzfmxlYXJuYWFwcHITCxIGTGVhcm5hGICAgID4woQKDA"
      },
      {
        title: "Wave",
        url: "/examples/wave.html",
        learna: "/learna/agtzfmxlYXJuYWFwcHITCxIGTGVhcm5hGICAgID4lpUKDA"
      },
      {
        title: "Stranger Things",
        url: "/examples/stranger-things.html",
        learna: "/learna/agtzfmxlYXJuYWFwcHITCxIGTGVhcm5hGICAgIDa44YKDA"
      },
      {
        title: "Gradients",
        url: "/examples/gradients.html",
        learna: "/learna/agtzfmxlYXJuYWFwcHITCxIGTGVhcm5hGICAgICAgIAKDA"
      },
      {
        title: "Matrix",
        url: "/examples/matrix.html",
        learna: "/learna/agtzfmxlYXJuYWFwcHITCxIGTGVhcm5hGICAgIC8oYIKDA"
      }
    ]
  };

  background = {};
  editor = {};

  componentDidMount() {
    if (window.interval) {
      window.clearInterval(window.interval);
    }
  }

  render() {
    const links = this.state.links.map(link => {
      return (
        <Link className="header-link" to={link.url} key={link.url}>
          {link.text}
        </Link>
      );
    });

    const repoLink = (
      <a
        className="header-link"
        href={this.state.repo.url}
        key={this.state.repo.url}
      >
        {this.state.repo.text}
      </a>
    );

    links.push(repoLink);

    let saveButton = (
      <button className="header-save-cta">{this.state.saveCtaText}</button>
    );

    let newButton = (
      <Link to="/learna" className="header-cta">
        {this.state.newCtaText}
      </Link>
    );

    const examples = this.state.examples.map(ex => {
      return (
        <div className="example" key={ex.url}>
          <iframe src={ex.url} title={ex.title} />
          <a className="example-link" href={ex.learna}>
            {" "}
          </a>
        </div>
      );
    });

    return (
      <div className="app">
        <header>
          {saveButton}

          <div className="title-container">
            <span className="title">{this.state.title}</span>

            <div className="header-links">{links}</div>
          </div>

          {newButton}
        </header>

        <div className="examples">
          <h1 className="main-heading">{this.state.headerTitle}</h1>

          <div className="examples-container">{examples}</div>
        </div>
      </div>
    );
  }
}

export default Examples;
