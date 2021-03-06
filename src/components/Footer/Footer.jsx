import React from "react";
import { Link } from "react-router-dom";
// reactstrap components
import {
  Button,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col,
  UncontrolledTooltip
} from "reactstrap";
//
import packageJson from '../../../package.json';

class Footer extends React.Component {
  render() {
    return (
      <footer className="footer">
          <Container>
              <Row>
                  <Col>
                      <p>Copyright &copy; {1900 + new Date().getYear()}{" "}YIHUA All rights reserved.</p>
                  </Col>
                  <div className="col-md-auto">
                      Version: {packageJson.version} BUILD {packageJson.build}
                  </div>
                  <div className="col col-lg-2">
                      <p>Terms</p>
                  </div>
              </Row>

              {/*<Row>*/}
                  {/*<Col md="12">*/}
              {/*<div className="float-md-right">*/}
                    {/*<Row>*/}
                      {/*<Col md="6">*/}
                          {/*<p>Copyright ©2019 ARTICLES All rights reserved</p>*/}
                      {/*</Col>*/}
                      {/*<Col md="6">*/}
                          {/*<p>Web Terms</p>*/}
                      {/*</Col>*/}
                  {/*</Row>*/}
              {/*</div>*/}
                  {/*</Col>*/}
              {/*</Row>*/}
          </Container>

            {/*<Col md="3">*/}
              {/*<h1 className="title">BLK•</h1>*/}
            {/*</Col>*/}
            {/*<Col md="3">*/}
              {/*<Nav>*/}
                {/*<NavItem>*/}
                  {/*<NavLink to="/" tag={Link}>*/}
                    {/*Home*/}
                  {/*</NavLink>*/}
                {/*</NavItem>*/}
                {/*<NavItem>*/}
                  {/*<NavLink to="/landing-page" tag={Link}>*/}
                    {/*Landing*/}
                  {/*</NavLink>*/}
                {/*</NavItem>*/}
                {/*<NavItem>*/}
                  {/*<NavLink to="/register-page" tag={Link}>*/}
                    {/*Register*/}
                  {/*</NavLink>*/}
                {/*</NavItem>*/}
                {/*<NavItem>*/}
                  {/*<NavLink to="/profile-page" tag={Link}>*/}
                    {/*Profile*/}
                  {/*</NavLink>*/}
                {/*</NavItem>*/}
              {/*</Nav>*/}
            {/*</Col>*/}
            {/*<Col md="3">*/}
              {/*<Nav>*/}
                {/*<NavItem>*/}
                  {/*<NavLink href="https://creative-tim.com/contact-us?ref=blkdsr-footer">*/}
                    {/*Contact Us*/}
                  {/*</NavLink>*/}
                {/*</NavItem>*/}
                {/*<NavItem>*/}
                  {/*<NavLink href="https://creative-tim.com/about-us?ref=blkdsr-footer">*/}
                    {/*About Us*/}
                  {/*</NavLink>*/}
                {/*</NavItem>*/}
                {/*<NavItem>*/}
                  {/*<NavLink href="https://creative-tim.com/blog?ref=blkdsr-footer">*/}
                    {/*Blog*/}
                  {/*</NavLink>*/}
                {/*</NavItem>*/}
                {/*<NavItem>*/}
                  {/*<NavLink href="https://opensource.org/licenses/MIT">*/}
                    {/*License*/}
                  {/*</NavLink>*/}
                {/*</NavItem>*/}
              {/*</Nav>*/}
            {/*</Col>*/}
            {/*<Col md="3">*/}
              {/*<h3 className="title">Follow us:</h3>*/}
              {/*<div className="btn-wrapper profile">*/}
                {/*<Button*/}
                  {/*className="btn-icon btn-neutral btn-round btn-simple"*/}
                  {/*color="default"*/}
                  {/*href="https://twitter.com/creativetim"*/}
                  {/*id="tooltip622135962"*/}
                  {/*target="_blank"*/}
                {/*>*/}
                  {/*<i className="fab fa-twitter" />*/}
                {/*</Button>*/}
                {/*<UncontrolledTooltip delay={0} target="tooltip622135962">*/}
                  {/*Follow us*/}
                {/*</UncontrolledTooltip>*/}
                {/*<Button*/}
                  {/*className="btn-icon btn-neutral btn-round btn-simple"*/}
                  {/*color="default"*/}
                  {/*href="https://www.facebook.com/creativetim"*/}
                  {/*id="tooltip230450801"*/}
                  {/*target="_blank"*/}
                {/*>*/}
                  {/*<i className="fab fa-facebook-square" />*/}
                {/*</Button>*/}
                {/*<UncontrolledTooltip delay={0} target="tooltip230450801">*/}
                  {/*Like us*/}
                {/*</UncontrolledTooltip>*/}
                {/*<Button*/}
                  {/*className="btn-icon btn-neutral btn-round btn-simple"*/}
                  {/*color="default"*/}
                  {/*href="https://dribbble.com/creativetim"*/}
                  {/*id="tooltip318450378"*/}
                  {/*target="_blank"*/}
                {/*>*/}
                  {/*<i className="fab fa-dribbble" />*/}
                {/*</Button>*/}
                {/*<UncontrolledTooltip delay={0} target="tooltip318450378">*/}
                  {/*Follow us*/}
                {/*</UncontrolledTooltip>*/}
              {/*</div>*/}
            {/*</Col>*/}

      </footer>
    );
  }
}

export default Footer;
