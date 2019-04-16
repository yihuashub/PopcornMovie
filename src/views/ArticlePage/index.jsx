import React from "react";
import Disqus from 'disqus-react';

import classnames from "classnames";
// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from "perfect-scrollbar";
// reactstrap components
import {
    Row,
    Col,
    Container,
    Button,
} from "reactstrap";

// core components
import Footer from "components/Footer/Footer.jsx";
import IndexNavbar from "components/Navbars/IndexNavbar.jsx";
import Helmet from "components/Helmet/Helmet.jsx";
import PageHeader from "./components/PageHeader";
import {connect} from "react-redux";
import {articleActions} from "../../actions";
import PropTypes from "prop-types";
const ReactMarkdown = require('react-markdown')

class ArticlePage extends React.Component {
    constructor(props) {
        super(props);
        this.goBack = this.goBack.bind(this);
    }

    static propTypes = {
        article: PropTypes.object.isRequired
    };

    goBack(){
        this.props.history.goBack();
    }

    componentDidMount() {
        document.body.classList.toggle("blog-list-page");
        window.scrollTo(0, 0);
        document.body.scrollTop = 0;
        const {dispatch } = this.props
        const articleId = this.props.match.params.id

        if(!this.props.article)
        {
            dispatch(articleActions.loadArticle(articleId))
        }
    }

    componentWillUnmount() {
        document.body.classList.toggle("blog-list-page");
    }
    render() {
        const { article } = this.props

        if(article)
        {
            const disqusShortname = 'yihua';
            const disqusConfig = {
                url: `https://www.yihua.ca/blog/${article.slug}`,
                identifier: article.slug,
                title: article.title,
            };

            return (
                <>
                    <Helmet title={article.title + " - Blog "} />
                    <IndexNavbar />
                    <PageHeader article={article}/>

                    <div className={"jss2153 jss2154"}>
                        <div className={"top-border"}>
                            <div className={"back-button-layout"}>
                                <Button
                                    className="btn-icon btn-round"
                                    color="info"
                                    type="button"
                                    onClick={this.goBack}
                                >
                                    <i className="fas fa-arrow-left" />
                                </Button>
                            </div>
                        </div>
                        <div className={"bottom-border"}>
                            <div className={"inner-container"}>
                                <ReactMarkdown source={article.body} />
                            </div>
                        </div>
                    </div>
                    <div className={"article-bottom"}></div>

                    <Container>
                        <Row>
                            <Col sm={"12"}>
                                <Disqus.DiscussionEmbed shortname={disqusShortname} config={disqusConfig} />
                            </Col>
                        </Row>
                    </Container>
                    <Footer />
                </>
            );
        }else{
            return (<></>)
        }

    }
}

function mapStateToProps(state,ownProps) {
    const articleId = ownProps.match.params.id
    const {
        entities: {articles}
    } = state

    const article = articles[articleId] || null
    return {
        article,
    }
}

export default connect(mapStateToProps)(ArticlePage)
