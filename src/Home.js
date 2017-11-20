import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Home.css";

class LearnaSample extends Component {
  state = {
    codeTitle: "Code",
    previewTitle: "Preview",
    backgroundCode: `<div>hello world!</div>

<style>
  body {
    background: aliceblue;
    font-family: sans-serif;
    font-size: 18px;
    text-align: center;
  }
</style>
`
  };

  background = {};
  editor = {};

  componentDidMount() {
    const background = document.querySelector(".background-textarea");
    const textarea = document.querySelector(".textarea");

    this.background = window.CodeMirror.fromTextArea(background, {
      readOnly: true,
      mode: "plain/text",
      cursorBlinkRate: 0
    });
    this.editor = window.CodeMirror.fromTextArea(textarea, {
      mode: "htmlmixed",
      tabSize: 2,
      readOnly: "nocursor",
      cursorBlinkRate: 0
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

    window.interval = setInterval(this.type, 100);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.backgroundCode !== this.state.backgroundCode) {
      this.background.setValue(this.state.backgroundCode);
      this.editor.setValue(this.state.backgroundCode);

      this.editor.focus();
    }
  }

  type = () => {
    let newWord;

    if (this.editor.getValue().length < this.state.backgroundCode.length) {
      newWord = this.state.backgroundCode.slice(
        0,
        this.editor.getValue().length + 1
      );
    } else {
      newWord = this.state.backgroundCode.slice(0, 1);
    }
    this.editor.setValue(newWord);
  };

  render() {
    return (
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

        <div className="blocker" />
      </div>
    );
  }
}

class Home extends Component {
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
    headerTitle: "Simple Tutorials Learning by Doing",
    secondHeaderTitle: "Try these examples",
    heroCopy:
      "See a piece of code in the background. Type it to see the result.",
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

  componentDidMount() {}

  componentDidUpdate(prevProps, prevState) {}

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

        <LearnaSample />

        <div className="about">
          <h1 className="hero-heading">
            <span className="hero-title">{this.state.title}</span>{" "}
            {this.state.headerTitle}
          </h1>

          <p className="hero-p">{this.state.heroCopy}</p>

          <p className="hero-p">
            See some examples below or{" "}
            <Link to="/learna" className="hero-a">
              Create
            </Link>{" "}
            your first tutorial.
          </p>
        </div>

        <div className="examples">
          <h1 className="main-heading">{this.state.secondHeaderTitle}</h1>

          <div className="examples-container">{examples}</div>
        </div>
      </div>
    );
  }
}

export default Home;
