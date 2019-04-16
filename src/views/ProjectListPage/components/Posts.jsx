import React, {  Component } from 'react'
import PropTypes from 'prop-types'
import {Link} from "react-router-dom";
import TextTruncate from 'react-text-truncate';
import Moment from "react-moment"; // recommend

export default class Posts extends Component {
    static propTypes = {
        posts: PropTypes.array.isRequired
    };
    render() {
        return (
            <div>
                {this.props.posts.map((post, i) =>
                    <>
                    <div className={"post-preview"} key={i}>
                        <Link to= {`/project/${post.slug}`}>
                            <h2 className="post-title">
                                {post.title}
                            </h2>
                            <h3 className="post-subtitle">
                                <TextTruncate
                                    line={1}
                                    truncateText="…"
                                    text={post.description}
                                    textTruncateChild={<Link to= {`/project/${post.slug}`}>
                                        Read on</Link>}
                                />
                            </h3>
                        </Link>
                        <p className="post-meta">Posted by
                            {" "}{post.author.username}{" "}
                            on <Moment format="LLLL">{post.createdAt}</Moment></p>
                    </div>
                    <hr/>
                    </>
                )}
            </div>
        )
    }
}

