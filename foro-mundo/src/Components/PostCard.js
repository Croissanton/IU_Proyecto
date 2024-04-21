import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const PostCard = ({
  topic,
  author,
  date,
  res_num,
  view_num,
  lm_author,
  lm_date,
}) => {
  return (
    <Link to={`/post/${topic}`} className="custom-link">
      <Row className="gy-3">
        <Col className="p-3 m-auto ">
          <Container className="border border-dark-subtle bg-light">
            <Row className="custom-link-container">
              <Col className="border-end border-dark-subtle p-3">
                <Row>
                  <Col>
                    <Row>
                      <h4>{topic}</h4>
                    </Row>
                    <Row>
                      <p>{author}</p>
                    </Row>
                    <Row>
                      <p>{date}</p>
                    </Row>
                  </Col>
                </Row>
              </Col>
              <Col className="p-3">
                <Row>
                  <Col className="m-auto">
                    <h5>Respuestas</h5>
                    <p>{res_num}</p>
                  </Col>
                  <Col className="m-auto">
                    <h5>Número de visualizaciones</h5>
                    <p>{view_num}</p>
                  </Col>
                  <Col className="m-auto">
                    <Row>
                      <p>Último mensaje por:</p>
                    </Row>
                    <Row>
                      <p>{lm_author}</p>
                    </Row>
                    <Row>
                      <p>{lm_date}</p>
                    </Row>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Container>
        </Col>
      </Row>
    </Link>
  );
};

export default PostCard;
