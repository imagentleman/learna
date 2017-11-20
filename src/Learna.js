import React, { Component } from "react";
import { Link } from "react-router-dom";

class Learna extends Component {
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
    newCtaText: "New",
    saveCtaText: "Save",
    repo: {
      URL: "https://github.com/imagentleman/learna",
      text: "Github"
    },
    codeTitle: "Code",
    previewTitle: "Preview",
    backgroundCode: ""
  };

  background = {};
  editor = {};

  componentDidMount() {
    if (window.interval) {
      window.clearInterval(window.interval);
    }

    const background = document.querySelector(".background-textarea");
    const textarea = document.querySelector(".textarea");

    this.background = window.CodeMirror.fromTextArea(background, {
      readOnly: true,
      mode: "plain/text",
      viewportMargin: Infinity
    });
    this.editor = window.CodeMirror.fromTextArea(textarea, {
      mode: "htmlmixed",
      autofocus: true,
      tabSize: 2,
      viewportMargin: Infinity
    });

    this.editor.on("change", cm => {
      const doc = document.implementation.createHTMLDocument();
      doc.body.innerHTML = cm.getValue();

      const frame = document.querySelector("iframe");
      const destDocument = frame.contentDocument;
      const srcNode = doc.documentElement;
      const newNode = destDocument.importNode(srcNode, true);

      destDocument.replaceChild(newNode, destDocument.documentElement);

      this.setState({
        code: cm.getValue()
      });
    });

    const pathname = window.location.pathname;
    const parts = pathname.split("/");

    if (parts.length === 3 && parts[2]) {
      const _this = this;
      fetch("/get/" + parts[2])
        .then(function(response) {
          return response.text();
        })
        .then(function(data) {
          _this.background.setValue(data);
          _this.setState({
            backgroundCode: data
          });
        });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.isNew) {
      this.background.setValue(this.state.backgroundCode);
      this.editor.setValue(this.state.backgroundCode);

      this.editor.focus();

      this.setState({ isNew: false });
    }
  }

  newHandler = () => {
    window.history.pushState({}, "", "/learna");

    this.setState({
      backgroundCode: "",
      code: "",
      isNew: true
    });
  };

  saveHandler = () => {
    const code = this.editor.getValue();

    fetch("/save", {
      method: "post",
      body: JSON.stringify({
        code: code
      })
    })
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        window.history.pushState({}, "", "/learna/" + data.url);
      });
  };

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
        href={this.state.repo.URL}
        key={this.state.repo.URL}
      >
        {this.state.repo.text}
      </a>
    );

    links.push(repoLink);

    let saveButton;

    if (this.state.code && this.state.backgroundCode === "") {
      saveButton = (
        <button className="header-save-cta visible" onClick={this.saveHandler}>
          {this.state.saveCtaText}
        </button>
      );
    } else {
      saveButton = (
        <button className="header-save-cta">{this.state.saveCtaText}</button>
      );
    }

    let newButton = (
      <button className="header-new-cta" onClick={this.newHandler}>
        {this.state.newCtaText}
      </button>
    );

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
        <div className="workspace">
          <div className="code">
            <span className="code-title">{this.state.codeTitle}</span>

            <div className="background">
              <textarea
                className="background-textarea"
                value={this.state.backgroundCode}
                readOnly
              />
            </div>

            <div className="editor">
              <textarea className="textarea" />
            </div>
          </div>

          <div className="preview">
            <span className="preview-title">{this.state.previewTitle}</span>

            <iframe className="window" title="Preview" />
          </div>
        </div>
      </div>
    );
  }
}

export default Learna;
