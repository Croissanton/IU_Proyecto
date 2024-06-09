import React from "react";
import MainLayout from "../layout/MainLayout.js";
import NotFound from "../Components/NotFound.js";
import { Container, Row, Col } from "react-bootstrap";
import { useEffect } from "react";
import { Breadcrumb } from "react-bootstrap";
import { Link } from "react-router-dom";

function ErrorPage() {
  useEffect(() => {
    document.title = "Error";
  }, []);

  return (
    <MainLayout>
      <div className="container-xxl my-3">
        <Breadcrumb className="custom-breadcrumb">
          <Breadcrumb.Item as={Link} to="/">Inicio</Breadcrumb.Item>
          <Breadcrumb.Item active>ERROR</Breadcrumb.Item> {/* */}
        </Breadcrumb>
        <h1>ERROR</h1>
      </div>
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
