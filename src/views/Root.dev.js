import React from 'react'
import PropTypes from 'prop-types'
import {Provider} from 'react-redux'
import DevTools from './DevTools'



import ReactDOM from "react-dom";
import {BrowserRouter, Route, Switch, Redirect, BrowserRouter as Router} from "react-router-dom";

import "assets/css/nucleo-icons.css";
//import "assets/scss/blk-design-system-react.scss?v=1.0.0";
import "assets/css/blk-design-system-react.css";
import "assets/demo/demo.css";

import HomePage from "./HomePageSection";
import ArticlePage from "./ArticlePage";
import BlogList from "./BlogListSection";
import AboutMePage from "./AboutMePage";
import ProjectListPage from "./ProjectListPage";
import ProjectPage from "./ProjectPage";
const Root = ({store}) => (
    <Router>
        <Provider store={store}>
            <Switch>
                <Route
                    path="/about_me"
                    render={props => <AboutMePage {...props} />}
                />
                <Route
                    path="/project/:id"
                    render={props => <ProjectPage {...props} />}
                />
                <Route
                    path="/projects"
                    render={props => <ProjectListPage {...props} />}
                />
                <Route
                    path="/projects/:page"
                    render={props => <ProjectListPage {...props} />}
                />
                <Route
                    path="/blog/:id"
                    render={props => <ArticlePage {...props} />}
                />
                <Route
                    path="/blogs/:page"
                    render={props => <BlogList {...props} />}
                />
                <Route
                    path="/blogs"
                    render={props => <BlogList {...props} />}
                />

                <Route path="/" component={HomePage} />
                {/*<Route path="/" render={props => <Index {...props} />} />*/}
                {/*<Route path="/" component={Index}/>*/}
                {/*<Route path="/:login/:name"*/}
                {/*       component={RepoPage}/>*/}
                {/*<Route path="/:login"*/}
                {/*       component={UserPage}/>*/}
                {/*<DevTools/>*/}
            </Switch>
        </Provider>
    </Router>
)


Root.propTypes = {
    store: PropTypes.object.isRequired,
}

export default Root
