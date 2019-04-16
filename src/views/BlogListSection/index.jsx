import React from "react";

// core components
import Helmet from "components/Helmet/Helmet.jsx";
import IndexNavbar from "components/Navbars/IndexNavbar.jsx";
import PageHeader from "./components/PageHeader.jsx";
import List from "./components/List.jsx";

import Footer from "components/Footer/Footer.jsx";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {articleActions} from "../../actions";

import Container from "reactstrap/es/Container";


// sections for this page/view


class ProjectListPage extends React.Component {

    static propTypes = {
        selectedArticlesTag: PropTypes.string.isRequired,
        selectedArticlesOffset:PropTypes.number.isRequired,
        isFetching: PropTypes.bool.isRequired,
        lastUpdated: PropTypes.number,
        dispatch: PropTypes.func.isRequired,
        starredRepos: PropTypes.array.isRequired,
        getTags: PropTypes.array.isRequired,
        totalCount:PropTypes.number.isRequired
    }


    componentDidMount() {
        document.body.classList.toggle("blog-list-page");
        window.scrollTo(0, 0);
        document.body.scrollTop = 0;
        const {dispatch, selectedArticlesTag,selectedArticlesOffset} = this.props
        const pageId = this.props.match.params.page || 0
        // dispatch(fetchPostsIfNeeded(selectedArticlesTag))
        dispatch(articleActions.loadArticles(selectedArticlesTag,selectedArticlesOffset))
        dispatch(articleActions.loadArticleTags())
    }

    componentDidUpdate(prevProps) {
        if (this.props.selectedArticlesTag !== prevProps.selectedArticlesTag) {
            const {dispatch, selectedArticlesTag,} = this.props
            dispatch(articleActions.selectArticlesOffset(0))
            dispatch(articleActions.loadArticles(selectedArticlesTag,0))
        }
        if (this.props.selectedArticlesOffset !== prevProps.selectedArticlesOffset) {
            const {dispatch, selectedArticlesTag,selectedArticlesOffset} = this.props
            dispatch(articleActions.loadArticles(selectedArticlesTag,selectedArticlesOffset))
        }
    }

    componentWillUnmount() {
        document.body.classList.toggle("blog-list-page");
    }

    render() {
        const {isFetching, starredRepos, getTags} = this.props
        return (
            <>
                <Helmet title={'My Blog'} />
                <IndexNavbar/>
                <div className="wrapper">
                    <PageHeader/>
                    <div className="main">
                        <Container>
                            <List posts={starredRepos} tags={getTags}
                                  selectedArticlesTag={this.props.selectedArticlesTag}
                                  isFetching={this.props.isFetching}
                                  totalCount = {this.props.totalCount}
                            />
                        </Container>
                    </div>
                    <Footer/>
                </div>
            </>
        );
    }
}


function mapStateToProps(state) {

    const {
        selectedArticlesTag,
        selectedArticlesOffset,
        pagination: {postsByTag},
        entities: {articlesTags, articles},
    } = state || {
        selectedArticlesTag: 'all',
        selectedArticlesOffset: 0
    }

    const {
        isFetching,
        ids,
        totalCount,
    } = postsByTag[selectedArticlesTag] || {
        isFetching: true,
        ids: [],
        totalCount: 1,
    }

    const getTags = articlesTags || []

    const starredRepos = ids.map(id => articles[id])
    return {
        selectedArticlesTag,
        selectedArticlesOffset,
        isFetching,
        starredRepos,
        getTags,
        totalCount,
    }
}

export default connect(mapStateToProps)(ProjectListPage)

