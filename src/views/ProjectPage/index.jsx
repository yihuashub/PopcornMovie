import React from "react";
import classnames from "classnames";
// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from "perfect-scrollbar";

// core components
import Footer from "components/Footer/Footer.jsx";
import IndexNavbar from "components/Navbars/IndexNavbar.jsx";
import Helmet from "components/Helmet/Helmet.jsx";
import PageHeader from "./components/PageHeader";
import {connect} from "react-redux";
import { projectActions } from "../../actions";
import PropTypes from "prop-types";
import {Button} from "reactstrap";
const ReactMarkdown = require('react-markdown')


class ProjectPage extends React.Component {
    constructor(props) {
        super(props);
        this.goBack = this.goBack.bind(this);
    }

    static propTypes = {
        project: PropTypes.object.isRequired
    };

    goBack(){
        this.props.history.goBack();
    }

    componentDidMount() {
        document.body.classList.toggle("project-list-page");
        window.scrollTo(0, 0);
        document.body.scrollTop = 0;
        const {dispatch } = this.props
        const projectId = this.props.match.params.id

        if(!this.props.project)
        {
            dispatch(projectActions.loadProject(projectId))
        }
    }

    componentWillUnmount() {
        document.body.classList.toggle("project-list-page");
    }
    render() {
        const { project} = this.props
        if(project)
        {
            return (
                <>
                    <Helmet title={project.title + " - Project "} />
                    <IndexNavbar />
                    <PageHeader project={project}/>

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
                                <ReactMarkdown source={project.body} />
                            </div>
                        </div>
                    </div>
                    <div className={"article-bottom"}></div>
                    <Footer />
                </>
            );
        }else{
            return (<></>)
        }

    }
}

function mapStateToProps(state,ownProps) {
    const projectId = ownProps.match.params.id

    const {
        selectedProjectsTag,
        entities: {projects}
    } = state


    const project = projects[projectId] || null
    return {
        selectedProjectsTag,
        project,
    }
}

export default connect(mapStateToProps)(ProjectPage)
