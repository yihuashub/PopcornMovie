import React from "react";
// reactstrap components
import {
    Collapse,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    UncontrolledDropdown,
    NavbarBrand,
    Navbar,
    NavItem,
    NavLink,
    Nav,
    Container,
    Row,
    Col, Card, CardBody, CardTitle, Button
} from "reactstrap";
import {Link} from "react-router-dom";
//

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';

import { okaidia } from 'react-syntax-highlighter/dist/esm/styles/prism';

const Component = () => {
    const codeString =
        '          while(!life())\n' +
        '          {\n' +
        '              keepLearning();\n' +
        '          }';
    return <SyntaxHighlighter language='c' style={okaidia}>{codeString}</SyntaxHighlighter>;
}

class AboutMe extends React.Component {
    render() {
        return (

            <section className="section section-lg section-safe">
                {/*<img*/}
                    {/*alt="..."*/}
                    {/*className="path"*/}
                    {/*src={require("assets/img/path5.png")}*/}
                {/*/>*/}
                <Container>
                    <Row className="align-items-center justify-content-center">
                        <Col md="5">
                            <div className="shell-wrap">
                                <p className="shell-top-bar">🏠 yihua 一 -bash 一 80×24</p>
                                <ul className="shell-body">
                                    <li>Yihuas-MacBook-Pro:~ yihua$ man yihua<span className="cursor">_</span></li>
                                </ul>
                            </div>
                        </Col>
                        <Col md="6">
                            <div className="px-md-5">
                                <hr className="line-success" />
                                <h3>Who Am I</h3>
                                {Component()}
                                <br />
                                <div className={"text-center"}>
                                    <Link to="/about_me">
                                        <Button color="info" size="md">
                                            Get More
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        );
    }
}

export default AboutMe;
