import React from "react";

import PropTypes from "prop-types";
import Moment from 'react-moment';
//

class PageHeader extends React.Component {
    constructor(props) {
        super(props);
    }

    static propTypes = {
        article: PropTypes.object.isRequired
    };
    state = {
        squares1to6: "",
        squares7and8: ""
    };

    componentDidMount() {
        document.body.classList.toggle("register-page");
        document.documentElement.addEventListener("mousemove", this.followCursor);
    }

    componentWillUnmount() {
        document.body.classList.toggle("register-page");
        document.documentElement.removeEventListener(
            "mousemove",
            this.followCursor
        );
    }

    followCursor = event => {
        let posX = event.clientX - window.innerWidth / 2;
        let posY = event.clientY - window.innerWidth / 6;
        this.setState({
            squares1to6:
                "perspective(300px) rotateY(" +
                posX * 0.05 +
                "deg) rotateX(" +
                posY * -0.05 +
                "deg)",
            squares7and8:
                "perspective(300px) rotateY(" +
                posX * 0.02 +
                "deg) rotateX(" +
                posY * -0.02 +
                "deg)"
        });
    };

    render() {
        const {article} = this.props;

        return (
            <header className={"masthead"}>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 col-md-10 mx-auto">
                            <div className="site-heading">
                                <h1>{article && article.title}</h1>
                                <span className="subheading">{
                                    article && `Posted by ${article.author.username} on`} <Moment format="LLLL">{article.createdAt}</Moment></span>
                            </div>
                        </div>
                    </div>


                    <div className="page-header-image"/>
                    <div>

                        <div
                            className="square square-7"
                            id="square7"
                            style={{transform: this.state.squares7and8}}
                        />
                        <div
                            className="square square-8"
                            id="square8"
                            style={{transform: this.state.squares7and8}}
                        />

                        <div
                            className="square square-1"
                            id="square1"
                            style={{transform: this.state.squares1to6}}
                        />
                        <div
                            className="square square-2"
                            id="square2"
                            style={{transform: this.state.squares1to6}}
                        />
                        <div
                            className="square square-3"
                            id="square3"
                            style={{transform: this.state.squares1to6}}
                        />
                        <div
                            className="square square-4"
                            id="square4"
                            style={{transform: this.state.squares7and8}}
                        />
                        <div
                            className="square square-5"
                            id="square5"
                            style={{transform: this.state.squares1to6}}
                        />
                        <div
                            className="square square-6"
                            id="square6"
                            style={{transform: this.state.squares1to6}}
                        />
                    </div>
                </div>
            </header>


        );
    }
}

export default PageHeader;
