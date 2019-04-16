/* eslint-disable no-undef */

import React, {Component} from 'react'
import PropTypes from 'prop-types'
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
import classnames from "classnames";

import {connect} from "react-redux";


import {css} from '@emotion/core';
import {ClipLoader,BarLoader} from 'react-spinners';
import CardBlock from "reactstrap/es/CardBlock";
const override = css`
    display: block;
    margin: 20vh auto 20vh auto;
    border-color: red;
`;

class MyProfile extends Component {
    static propTypes = {
        isFetching: PropTypes.bool,
        user: PropTypes.object.isRequired,
    }

    constructor(props) {
        super(props)
    }


    render() {
        const { user } = this.props

        return (
            <div>
                <Row>
                    <Col lg="6" md="6">
                        <h1 className="profile-title text-left">About me</h1>
                        <h5 className="text-on-back">01</h5>
                        {/*<p className="profile-description">*/}
                        {/*    Offices parties lasting outward nothing age few resolve.*/}
                        {/*    Impression to discretion understood to we interested he*/}
                        {/*    excellence. Him remarkably use projection collecting. Going*/}
                        {/*    about eat forty world has round miles.*/}
                        {/*</p>*/}
                        <div className="btn-wrapper profile pt-3">
                            <Button
                                className="btn-icon btn-round"
                                color="github"
                                href={user.htmlUrl}
                                id="tooltip639225725"
                                target="_blank"
                            >
                                <i className="fab fa-github" />
                            </Button>
                            <UncontrolledTooltip delay={0} target="tooltip639225725">
                                Follow me
                            </UncontrolledTooltip>
                        </div>
                    </Col>
                    <Col className="ml-auto mr-auto" lg="4" md="6">
                        <Card className="card-coin card-plain">
                            <CardHeader>
                                <img
                                    alt="..."
                                    className="img-center img-fluid rounded-circle"
                                    src={user.avatarUrl}
                                />
                                <h4 className="title">{ user.name }</h4>
                                <Row className={"text-center"}>
                                    <Col xs={12}>
                                        <h4>{ user.bio }</h4>
                                    </Col>
                                </Row>
                            </CardHeader>
                            <CardBody >
                                <Row className={"text-center"}>
                                    <Col xs={4}>
                                        <span className="twPc-StatLabel twPc-block">Public Repos</span>
                                        <span className="twPc-StatValue">{user.publicRepos}</span>
                                    </Col>
                                    <Col xs={4}>
                                        <span className="twPc-StatLabel twPc-block">Following</span>
                                        <span className="twPc-StatValue">{user.following}</span>
                                    </Col>
                                    <Col xs={4}>
                                        <span className="twPc-StatLabel twPc-block">Followers</span>
                                        <span className="twPc-StatValue">{user.followers}</span>
                                    </Col>
                                </Row>
                                <Row className={"text-center"}>
                                    <CardBlock/>

                                    <Col xs={12}>
                                        <Button
                                            data-placement="bottom"
                                            rel="noopener noreferrer"
                                            target="_blank"
                                            color="info"
                                            href={user.htmlUrl}
                                        >Follow</Button>
                                    </Col>
                                </Row>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
        )
    }
}

function mapStateToProps(state) {
}

export default connect(mapStateToProps)(MyProfile)
