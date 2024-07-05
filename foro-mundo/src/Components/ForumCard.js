import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

const ForumCard = ({ id, topic, post_num, view_num, onTopicClick }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    onTopicClick(id);
    navigate(`/search/${id}`);
  };

  return (
    <Link onClick={handleClick} className="custom-link">
      <Row className="gy-3">
        <Col className="p-3 m-auto">
          <Container className="border border-dark-subtle bg-light">
            <Row className="custom-link-container">
              <Col className="border-end border-dark-subtle p-3">
                <Row>
                  <Col>
                    <Row>
                      <span className="my-3 h4">{topic}</span>
                    </Row>
                  </Col>
                </Row>
              </Col>
              <Col className="p-3">
                <Row>
                  <Col className="m-auto">
                    <span className="h5">Posts</span>
                    <p>{post_num}</p>
                  </Col>
                  <Col className="m-auto">
                    <span className="h5">Número de visualizaciones</span>
                    <p>{view_num}</p>
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

export default ForumCard;
