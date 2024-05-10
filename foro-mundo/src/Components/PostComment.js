import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const PostComment = ({ title, author, upvotes, downvotes, date }) => {
  return (
    <Row className="gy-3">
      <Col className="p-3 m-auto">
        <Container className="border border-dark-subtle bg-light">
          <Row className="border-bottom border-dark-subtle p-3">
            <Col>
              <h4>{title}</h4>
            </Col>
            <Col>
              <h5>Author</h5>
              <NavLink to={`/profile/id`} style={{ color: "inherit" }}>
                <p>{author}</p>
              </NavLink>
            </Col>
          </Row>
          <Row className="p-3">
            <Col>
              <h5>Upvotes</h5>
              <p>{upvotes}</p>
            </Col>
            <Col>
              <h5>Downvotes</h5>
              <p>{downvotes}</p>
            </Col>
            <Col>
              <p>{date.toLocaleString()}</p>
            </Col>
          </Row>
        </Container>
      </Col>
    </Row>
  );
};

export default PostComment;
