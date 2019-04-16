import React from "react";
import classnames from "classnames";
// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from "perfect-scrollbar";
// reactstrap components
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    Label,
    FormGroup,
    Form,
    Input,
    FormText,
    NavItem,
    NavLink,
    Nav,
    Table,
    TabContent,
    TabPane,
    Container,
    Row,
    Col,
    UncontrolledTooltip,
    UncontrolledCarousel
} from "reactstrap";

// core components
import IndexNavbar from "components/Navbars/IndexNavbar.jsx";
import Footer from "components/Footer/Footer.jsx";
import MyProfile from "./components/MyProfile";
import Helmet from "components/Helmet/Helmet.jsx";
import {Link} from "react-router-dom";

import {connect} from "react-redux";
import {githubActions} from "../../actions";


import {css} from '@emotion/core';
import {ClipLoader, BarLoader} from 'react-spinners';

const override = css`
    display: block;
    margin: 20vh auto 20vh auto;
    border-color: red;
`;


const carouselItems = [
    {
        src: require("assets/img/dichanjingji.com.jpg"),
        altText: "dichanjingji.com",
        caption: "Square Meter Really"
    },
    {
        src: require("assets/img/niuvisionmedia.jpg"),
        altText: "niuvisionmedia",
        caption: "Niu Vision Media"
    },
    {
        src: require("assets/img/wcaauto.com.jpg"),
        altText: "wcaauto.com",
        caption: "WCA Auto"
    }
];


class AboutMePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tabs: 1
        };
    }

    componentDidMount() {
        window.scrollTo(0, 0);
        document.body.scrollTop = 0;

        document.body.classList.toggle("profile-page");

        const {dispatch} = this.props

        dispatch(githubActions.loadUser('yihuashub', ['name']))


    }

    componentWillUnmount() {
        document.body.classList.toggle("profile-page");
    }

    render() {
        const {user} = this.props

        return (
            <>
                <Helmet title={'About me'} />
                <IndexNavbar/>
                <div className="wrapper">
                    <div className="page-header">
                        <img
                            alt="..."
                            className="dots"
                            src={require("assets/img/dots.png")}
                        />
                        <img
                            alt="..."
                            className="path"
                            src={require("assets/img/path4.png")}
                        />
                        <Container className="align-items-center">

                            {
                                user ? <MyProfile user={user}/> :
                                    <BarLoader
                                        sizeUnit={"px"}
                                        size={5}
                                        color={'#1d8cf8'}
                                    />}

                        </Container>
                    </div>
                    <div className="section">
                        <Container>
                            <Row className="justify-content-between">
                                <Col md="6">
                                    <Row className="justify-content-between align-items-center">
                                        <UncontrolledCarousel items={carouselItems}/>
                                    </Row>
                                </Col>
                                <Col md="5">
                                    <h1 className="profile-title text-left">Projects</h1>
                                    <h5 className="text-on-back">02</h5>
                                    <p className="profile-description text-left">
                                        I am focusing on web application, also include JavaScript based platform, such
                                        like React, React Native, Electron etc.<br/>
                                        Now I am working on my IOT project based on Arduino.
                                    </p>
                                    <div className="btn-wrapper pt-3">
                                        <Link to={'/projects'}>
                                            <Button
                                                className="btn-simple"
                                                color="primary"
                                            >
                                                <i className="tim-icons icon-book-bookmark"/> View All Available
                                                Projects
                                            </Button>
                                        </Link>
                                    </div>
                                </Col>
                            </Row>
                        </Container>
                    </div>
                    <section className="section">
                        <Container>
                            <Row>
                                <Col md="6">
                                    <Card className="card-plain">
                                        <CardHeader>
                                            <h1 className="profile-title text-left">Contact</h1>
                                            <h5 className="text-on-back">03</h5>
                                        </CardHeader>
                                        <CardBody>
                                            <Form>
                                                <Row>
                                                    <Col md="6">
                                                        <FormGroup>
                                                            <label>Your Name</label>
                                                            <Input type="text"/>
                                                        </FormGroup>
                                                    </Col>
                                                    <Col md="6">
                                                        <FormGroup>
                                                            <label>Email address</label>
                                                            <Input
                                                                type="email"
                                                            />
                                                        </FormGroup>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col md="6">
                                                        <FormGroup>
                                                            <label>Phone</label>
                                                            <Input type="text"/>
                                                        </FormGroup>
                                                    </Col>
                                                    <Col md="6">
                                                        <FormGroup>
                                                            <label>Company</label>
                                                            <Input type="text"/>
                                                        </FormGroup>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col md="12">
                                                        <FormGroup>
                                                            <label>Message</label>
                                                            <Input placeholder="Hello there!" type="text"/>
                                                        </FormGroup>
                                                    </Col>
                                                </Row>
                                                <Button
                                                    className="btn-round float-right"
                                                    color="primary"
                                                    data-placement="right"
                                                    id="tooltip341148792"
                                                    type="button"
                                                >
                                                    Send text
                                                </Button>
                                                <UncontrolledTooltip
                                                    delay={0}
                                                    placement="right"
                                                    target="tooltip341148792"
                                                >
                                                    Can't wait for your message
                                                </UncontrolledTooltip>
                                            </Form>
                                        </CardBody>
                                    </Card>
                                </Col>
                                <Col className="ml-auto" md="4">
                                    <div className="info info-horizontal">
                                        <div className="icon icon-primary">
                                            <i className="tim-icons icon-square-pin"/>
                                        </div>
                                        <div className="description">
                                            <h4 className="info-title">I am living in</h4>
                                            <p>
                                                <a
                                                    data-placement="bottom"
                                                    rel="noopener noreferrer"
                                                    target="_blank"
                                                    id="whywinnipeg"
                                                    href={"https://www.prepareforcanada.com/choosing-a-city/winnipeg/living-in-winnipeg/#.XKE1M6ROlhE"}
                                                >
                                                    Winnipeg
                                                </a>
                                                <UncontrolledTooltip
                                                    delay={0}
                                                    placement="top"
                                                    target="whywinnipeg"
                                                >
                                                    Why Winnipeg?
                                                </UncontrolledTooltip>,{" "}
                                                <a
                                                    data-placement="bottom"
                                                    rel="noopener noreferrer"
                                                    target="_blank"
                                                    id="whymanitoba"
                                                    href={"https://www.immigratemanitoba.com/choose-manitoba/live-in-manitoba/"}
                                                >
                                                    Manitoba
                                                </a>
                                                <UncontrolledTooltip
                                                    delay={0}
                                                    placement="top"
                                                    target="whymanitoba"
                                                >
                                                    Why Manitoba?
                                                </UncontrolledTooltip>,{" "}
                                                <a
                                                    data-placement="bottom"
                                                    rel="noopener noreferrer"
                                                    target="_blank"
                                                    id="whycanada"
                                                    href={"https://www.canada.ca/en/immigration-refugees-citizenship/services/new-immigrants/new-life-canada.html"}
                                                >
                                                    Canada
                                                </a>
                                                <UncontrolledTooltip
                                                    delay={0}
                                                    placement="top"
                                                    target="whycanada"
                                                >
                                                    Why Canada?
                                                </UncontrolledTooltip>
                                            </p>
                                        </div>
                                    </div>
                                    <div className="info info-horizontal">
                                        <div className="icon icon-primary">
                                            <i className="tim-icons icon-email-85"/>
                                        </div>
                                        <div className="description">
                                            <h4 className="info-title">The best way to contact me</h4>
                                            <p>
                                                yihuashub<i className="fa fa-at" aria-hidden="true"></i>gmail.com
                                            </p>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                        </Container>
                    </section>
                    <Footer/>
                </div>
            </>
        );
    }
}


function mapStateToProps(state) {
    const {
        pagination: {starredByUser},
        entities: {users, repos}
    } = state

    const user = users['yihuashub'] || null

    return {
        user
    }
}

export default connect(mapStateToProps)(AboutMePage)

