import React, { Component, Fragment } from "react";

class QuoteGenerator extends Component {
  state = {
    quote: {
      content: "",
      title: "",
      link: ""
    },
    hasQuote: false
  };

  getRandomQuote = event => {
    const pageNumber = String(Math.floor(Math.random() * 20));
    console.log(typeof pageNumber);
    this.END_POINT =
      "http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=" +
      pageNumber;

    fetch(this.END_POINT)
      .then(response => response.json())
      .then(data => {
        if (data[0].content && data[0].title && data[0].link) {
          let { quote } = this.state;
          let quoteData = data[0];
          quote.content = quoteData.content;
          quote.title = quoteData.title;
          quote.link = quoteData.link;

          this.setState({ quote }, () => {
            if (this.state.hasQuote === false) {
              this.setState({ hasQuote: true });
            }
          });
        } else return console.error("No Quote Found Error 404");
      });
  };

  renderQuote = () => {
    const { title, content, link } = this.state.quote;
    const trimOne = content.substr(3);
    const trimmedContent = trimOne.substr(0, trimOne.length - 5);
    return (
      <div className="row flex-center">
        <div className="sm-8 col border border-warning customPaper">
          <h1>{title}</h1>

          <h4>" {trimmedContent} "</h4>
        </div>
      </div>
    );
  };

  noQuote = () => {
    return (
      <div className="row flex-center">
        <div className="sm-8 col border border-warning customPaper">
          <h1 />
          <p />
        </div>
      </div>
    );
  };

  shareOnTwitter = (text, url) => {
    window.open(
      "http://twitter.com/share?url=" +
        encodeURIComponent(url) +
        "&text=" +
        encodeURIComponent(text),
      "",
      "left=0,top=0,width=550,height=450,personalbar=0,toolbar=0,scrollbars=0,resizable=0"
    );
  };

  render() {
    const { hasQuote } = this.state;
    const { title, link } = this.state.quote;
    return (
      <Fragment>
        <h1>Quote Machine</h1>
        {hasQuote === true ? this.renderQuote() : this.noQuote()}

        <button
          className="btn-success shadow shadow-large"
          onClick={this.getRandomQuote}
        >
          Click me to Get Daily Quote
        </button>
        <button
          className="btn-secondary shadow shadow-large"
          onClick={() => this.shareOnTwitter(title, link)}
        >
          Share On Twitter
        </button>
      </Fragment>
    );
  }
}
export default QuoteGenerator;
