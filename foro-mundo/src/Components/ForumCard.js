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
    <Link onClick={handleClick} className="custom-link m-0 p-0">
      <Container className="border border-dark-subtle bg-light mb-2 mx-0 p-0">
        <Row className="custom-link-container m-0 p-0">
          <Col className="p-3 d-flex align-items-center">
            <span className=" h4">{topic}</span>
          </Col>
          <Col className="p-3">
            <Row>
              <Col className="m-auto">
                <span className="h5">Número de posts</span>
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
    </Link>
  );
};

export default ForumCard;
