import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const Post = () => {
  return (
    <Row className="gy-3">
      <Col className="border-end border-dark-subtle">
        {/* First column */}
        <Container>
          <h4>Topic</h4>
          <p>Author</p>
          <p>Date</p>
        </Container>
      </Col>
      <Col>
        {/* Second column */}
        <Container>
          <Row>
            <Col>
              <h4>Number of Responses</h4>
            </Col>
            <Col>
              <h4>Number of Views</h4>
            </Col>
            <Col>
              <Row>
                <p>Last Message</p>
              </Row>
              <Row>
                <p>Last Message Author</p>
              </Row>
              <Row>
                <p>Last Message Date</p>
              </Row>
            </Col>
          </Row>
        </Container>
      </Col>
    </Row>
  );
};

export default Post;
