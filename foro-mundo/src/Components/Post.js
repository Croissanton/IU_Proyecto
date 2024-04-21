import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const Post = () => {
  return (
    <Container>
      <Row className="gy-3">
        <Col className="p-3">
          <Container className="border border-dark-subtle bg-light">
            <Row>
              <Col className="border-end border-dark-subtle p-3">
                <Row>
                  <Col>
                    <Row>
                      <h4>Topic</h4>
                    </Row>
                    <Row>
                      <p>Author</p>
                    </Row>
                    <Row>
                      <p>Date</p>
                    </Row>
                  </Col>
                </Row>
              </Col>
              <Col className="p-3">
                <Row>
                  <Col className="m-auto">
                    <h5>Respuestas</h5>
                    <p>10231</p>
                  </Col>
                  <Col className="m-auto">
                    <h5>Number of Views</h5>
                    <p>10231</p>
                  </Col>
                  <Col className="m-auto">
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
              </Col>
            </Row>
          </Container>
        </Col>
      </Row>
    </Container>
  );
};

export default Post;
