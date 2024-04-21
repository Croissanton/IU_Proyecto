import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const ForumCard = ({
  topic,
  post_num,
  view_num,
}) => {
  return (
    <Row className="gy-3">
      <Col className="p-3 m-auto">
        <Container className="border border-dark-subtle bg-light">
          <Row>
            <Col className="border-end border-dark-subtle p-3">
              <Row>
                <Col>
                  <Row>
                    <h4>{topic}</h4>
                  </Row>
                </Col>
              </Row>
            </Col>
            <Col className="p-3">
              <Row>
                <Col className="m-auto">
                  <h5>Posts</h5>
                  <p>{post_num}</p>
                </Col>
                <Col className="m-auto">
                  <h5>Número de visualizaciones</h5>
                  <p>{view_num}</p>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </Col>
    </Row>
  );
};

export default ForumCard;
