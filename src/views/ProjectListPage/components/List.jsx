/* eslint-disable no-undef */

import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Badge, Button, Card, CardBody, CardGroup, CardText, CardTitle, Col, Row} from "reactstrap";
import Container from "reactstrap/es/Container";
import Posts from "./Posts";
import Tags from "./Tags";
import Pagination from "./Pagination.jsx";
import {selectProjectsTag} from '../../../actions'
import {connect} from "react-redux";


import {css} from '@emotion/core';
import {ClipLoader,BarLoader} from 'react-spinners';
const override = css`
    display: block;
    margin: 20vh auto 20vh auto;
    border-color: red;
`;

class List extends Component {
    static propTypes = {
        isFetching: PropTypes.bool.isRequired,
        posts: PropTypes.array.isRequired,
        tags: PropTypes.array.isRequired,
        selectedProjectsTag: PropTypes.string.isRequired,
        totalCount:PropTypes.number.isRequired,
    }

    constructor(props) {
        super(props)
        this.handleChange = this.handleChange.bind(this)
    }

    static defaultProps = {
        // isFetching: true,
        // loadingLabel: 'Loading...'
    }

    handleChange() {
        this.props.dispatch(selectProjectsTag('all'))
    }


    render() {

        return (
            <div>
                <Container>

                    <Row>
                        <Col lg={"8"} md={"10"} sm={"12"}>
                            {(this.props.selectedProjectsTag !== 'all') &&
                            <Row>
                                <Col md={"3"} sm={"12"}>
                                    <CardGroup>
                                        <Card>
                                            <CardBody>
                                                <CardTitle>
                                                    <Button onClick={() => this.handleChange()} close/>
                                                </CardTitle>
                                                {this.props.isFetching ?
                                                    <BarLoader
                                                        sizeUnit={"px"}
                                                        size={5}
                                                        color={'#1d8cf8'}
                                                    /> :
                                                    <CardText
                                                        className={'text-center'}>{this.props.selectedProjectsTag}</CardText>
                                                }
                                            </CardBody>
                                        </Card>
                                    </CardGroup>
                                </Col>
                            </Row>
                            }
                            {(this.props.isFetching) ?
                                <Row className={"justify-content-center"}>
                                    <div className='sweet-loading'>
                                        <ClipLoader
                                            css={override}
                                            sizeUnit={"px"}
                                            size={22}
                                            color={'#1d8cf8'}
                                        />
                                    </div>
                                </Row>
                                :
                                <div>
                                    <Row>
                                        <Posts posts={this.props.posts} key={this.props.selectedProjectsTag}/>
                                    </Row>
                                    <Row className={"justify-content-center"}>
                                        <Pagination totalCount={this.props.totalCount} />
                                    </Row>
                                </div>
                            }


                        </Col>
                        <Col lg={"4"} md={"2"} sm={"12"}>
                            <Tags tags={this.props.tags}/>
                        </Col>
                    </Row>

                </Container>
            </div>
        )
    }
}

function mapStateToProps(state) {
}

export default connect(mapStateToProps)(List)
