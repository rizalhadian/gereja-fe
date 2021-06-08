import React from "react";
import { Container, Row, Col } from "shards-react";


const NoPanel = ({ children, noNavbar, noFooter }) => (
  <Container fluid>
    <Row>
      <Col
        className="main-content py-4"
        lg="12"
        md="12"
        sm="12"
      >
        {children}
      </Col>
    </Row>
  </Container>
);

export default NoPanel;
