import React from "react";

// core components
import Helmet from "components/Helmet/Helmet.jsx";
import IndexNavbar from "components/Navbars/IndexNavbar.jsx";
import PageHeader from "./components/PageHeader.jsx";
import List from "./components/List.jsx";

import Footer from "components/Footer/Footer.jsx";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {projectActions} from "../../actions";

import Container from "reactstrap/es/Container";


// sections for this page/view


class BlogList extends React.Component {

    static propTypes = {
        selectedProjectsTag: PropTypes.string.isRequired,
        selectedProjectsOffset:PropTypes.number.isRequired,
        isFetching: PropTypes.bool.isRequired,
        lastUpdated: PropTypes.number,
        dispatch: PropTypes.func.isRequired,
        starredRepos: PropTypes.array.isRequired,
        getTags: PropTypes.array.isRequired,
        totalCount:PropTypes.number.isRequired
    }


    componentDidMount() {
        document.body.classList.toggle("project-list-page");
        window.scrollTo(0, 0);
        document.body.scrollTop = 0;
        const {dispatch, selectedProjectsTag,selectedProjectsOffset} = this.props
        const pageId = this.props.match.params.page || 0
        // dispatch(fetchPostsIfNeeded(selectedProjectsTag))
        dispatch(projectActions.loadProjects(selectedProjectsTag,selectedProjectsOffset))
        dispatch(projectActions.loadProjectTags())
    }

    componentDidUpdate(prevProps) {
        if (this.props.selectedProjectsTag !== prevProps.selectedProjectsTag) {
            const {dispatch, selectedProjectsTag,} = this.props
            this.props.dispatch(projectActions.selectProjectsOffset(0))
            dispatch(projectActions.loadProjects(selectedProjectsTag,0))
        }
        if (this.props.selectedProjectsOffset !== prevProps.selectedProjectsOffset) {
            const {dispatch, selectedProjectsTag,selectedProjectsOffset} = this.props
            dispatch(projectActions.loadProjects(selectedProjectsTag,selectedProjectsOffset))
        }
    }

    componentWillUnmount() {
        document.body.classList.toggle("project-list-page");
    }

    render() {
        const {isFetching, starredRepos, getTags,selectedProjectsTag,totalCount} = this.props
        return (
            <>
                <Helmet title={'My Projects'} />
                <IndexNavbar/>
                <div className="wrapper">
                    <PageHeader/>
                    <div className="main">
                        <Container>
                            <List posts={starredRepos} tags={getTags}
                                  selectedProjectsTag={selectedProjectsTag}
                                  isFetching={isFetching}
                                  totalCount = {totalCount}
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
        selectedProjectsTag,
        selectedProjectsOffset,
        pagination: {projectByTag},
        entities: {projectsTags, projects},
    } = state || {
        selectedProjectsTag: 'all',
        selectedProjectsOffset: 0
    }

    const {
        isFetching,
        ids,
        totalCount,
    } = projectByTag[selectedProjectsTag] || {
        isFetching: true,
        ids: [],
        totalCount: 1,
    }

    const getTags = projectsTags || []

    console.log("getTags" + getTags);
    const starredRepos = ids.map(id => projects[id])
    return {
        selectedProjectsTag,
        selectedProjectsOffset,
        isFetching,
        starredRepos,
        getTags,
        totalCount,
    }
}

export default connect(mapStateToProps)(BlogList)

