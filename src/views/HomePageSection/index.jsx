import React from "react";

// core components
import Helmet from "components/Helmet/Helmet.jsx";
import IndexNavbar from "components/Navbars/IndexNavbar.jsx";
import PageHeader from "components/PageHeader/PageHeader.jsx";
import Footer from "components/Footer/Footer.jsx";

// sections for this page/view
import Navigation from "./components/Navigation.jsx";
import AboutMe from "./components/AboutMe";

class HomePage extends React.Component {
    componentDidMount() {
        document.body.classList.toggle("index-page");
    }

    componentWillUnmount() {
        document.body.classList.toggle("index-page");
    }

    render() {
        return (
            <>
                <Helmet title={null} />
                <IndexNavbar/>
                <div className="wrapper">
                    <PageHeader/>
                    <div className="main">
                        <AboutMe/>
                        <Navigation/>
                    </div>
                    <Footer/>
                </div>
            </>
        );
    }
}

export default HomePage;
