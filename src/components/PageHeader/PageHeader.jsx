import React from "react";

// reactstrap components
import { Container } from "reactstrap";

const String = [
    "👋 Hi there, Welcome!",
    "I am a Coffee lover ☕",
    "💻 A Full-Stack Developer",
    "Believe IOT is the future 🤖",
    "🕹️ An Overwatch fan"];

class PageHeader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            timeRemainingInSeconds: 0
        };
    }

    decrementTimeRemaining = () => {
        if (this.state.timeRemainingInSeconds < String.length-1) {
            this.setState({
                timeRemainingInSeconds: this.state.timeRemainingInSeconds + 1
            });
        } else {
            this.setState({
                timeRemainingInSeconds: 0
            });
        }
    };

    componentDidMount() {
        this.timer = setInterval(() => {
            this.decrementTimeRemaining();
        }, 5000);

        console.log(this.timer);
    }

    _string(){
        return(
            <div className={"terminal"}>
                <h3>
                    {String[this.state.timeRemainingInSeconds]}<span className="cursor">|</span>
                </h3>
            </div>
        )
    }
    render() {
    return (
      <div className="page-header header-filter">
        <div className="squares square1" />
        <div className="squares square2" />
        <div className="squares square3" />
        <div className="squares square4" />
        <div className="squares square5" />
        <div className="squares square6" />
        <div className="squares square7" />
        <Container>
          <div className="content-center brand">
            <h1 className="h1-seo">Yihua.ca</h1>
              {/*<div className={"terminal"}>*/}
                  {/*<h3>*/}
                      {/*{String[this.state.timeRemainingInSeconds]}<span className="cursor">|</span>*/}
                  {/*</h3>*/}
              {/*</div>*/}

              { this._string()}
          </div>
        </Container>
      </div>
    );
  }
}

export default PageHeader;
