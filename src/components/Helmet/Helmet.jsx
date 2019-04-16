import React from "react";

import PropTypes from "prop-types";
import HelmetHeader from "react-helmet";

function Helmet({ ...props }) {
    const { title } = props;

    return (
        <HelmetHeader>
            <meta charSet="utf-8" />
            <title>{title ? `${title} - Yihua's Website` :`Yihua's Website`}</title>
            <link rel="canonical" href="https://yihua.ca" />
        </HelmetHeader>
    );
}

Helmet.propTypes = {
    title: PropTypes.object.isRequired,
};

export default (Helmet);