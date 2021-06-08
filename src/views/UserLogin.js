import React from "react";
import { Container, Col } from "shards-react";
import Login from "../components/auth/login";

const UserLogin = () => (
    <Container fluid className="main-content-container px-4 pb-4">
        <Col lg="12">
            <Login />
        </Col>
    </Container>
);

export default UserLogin;
