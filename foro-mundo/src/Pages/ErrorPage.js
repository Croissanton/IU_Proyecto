import React from "react";
import MainLayout from "../layout/MainLayout.js";
import NotFound from "../Components/NotFound.js";
import { Container, Row, Col } from "react-bootstrap";
import BackButton from "../Components/BackButton.js";

function ErrorPage() {
  return (
    <MainLayout>
      <BackButton />
      <Container>
        <Row
          className="justify-content-center align-items-center"
          style={{ minHeight: "80vh" }}
        >
          <Col xs={12} sm={6} md={4}>
            <NotFound />
          </Col>
        </Row>
      </Container>
    </MainLayout>
  );
}

export default ErrorPage;
