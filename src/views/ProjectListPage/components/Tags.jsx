import React, {  Component } from 'react'
import PropTypes from 'prop-types'
import {Badge, Col} from "reactstrap";
import {connect} from "react-redux";
import { selectProjectsTag } from '../../../actions'
class Tags extends Component {

    constructor(props) {
        super(props)
        this.handleChange = this.handleChange.bind(this)
    }

    static propTypes = {
        tags: PropTypes.array.isRequired
    };


     handleChange(newTag) {
        this.props.dispatch(selectProjectsTag(newTag))
    }

    render() {
        return (
            <div className="sidebar"><p>Popular Tags</p>
                <div className="tag-list">
                {(this.props.tags && this.props.tags.length) && this.props.tags.map((tag,i) =>
                        <Badge className="badge-default" pill key={i} onClick={() => this.handleChange(tag)} >{tag}</Badge>
                )}
                </div>
            </div>
        )
    }
}


function mapStateToProps(state) {
}

export default connect(mapStateToProps)(Tags)
