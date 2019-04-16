import React from "react";
import classnames from "classnames";
// reactstrap components
import {
    TabContent,
    TabPane,
    Container,
    Row,
    Col,
    Card,
    CardHeader,
    CardBody,
    Nav,
    NavItem,
    NavLink, DropdownItem, DropdownMenu
} from "reactstrap";
import {Link} from "react-router-dom";

class Navigation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            iconTabs: 1,
            textTabs: 4
        };
    }
    toggleTabs = (e, stateName, index) => {
        e.preventDefault();
        this.setState({
            [stateName]: index
        });
    };
    render() {
        return (
            <div className="section section-tabs">
                <Container>
                    <div className="title">
                        <h3 className="mb-3">A little bit more about me...</h3>
                    </div>
                    <Row>
                        <Col className="ml-auto mr-auto" md="6" xl="6">
                            <Link to="/blogs">
                                <div className="navigation-button" >
                                    <span><h3>My Blogs</h3></span>
                                </div>
                            </Link>
                        </Col>
                        <Col className="ml-auto mr-auto" md="6" xl="6">
                            <Link to="/projects">
                                <div className="navigation-button">
                                    <span><h3>My Projects</h3></span>
                                </div>
                            </Link>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default Navigation;
