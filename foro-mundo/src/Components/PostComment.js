import React, { useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const PostComment = ({
  title,
  author,
  initialUpvotes,
  initialDownvotes,
  date,
}) => {
  const [upvotes, setUpvotes] = useState(initialUpvotes);
  const [downvotes, setDownvotes] = useState(initialDownvotes);
  const [userVote, setUserVote] = useState(null);

  const handleUpvote = () => {
    if (userVote === "upvote") {
      setUpvotes(upvotes - 1);
      setUserVote(null);
    } else if (userVote === "downvote") {
      setDownvotes(downvotes - 1);
      setUpvotes(upvotes + 1);
      setUserVote("upvote");
    } else {
      setUpvotes(upvotes + 1);
      setUserVote("upvote");
    }
  };

  const handleDownvote = () => {
    if (userVote === "downvote") {
      setDownvotes(downvotes - 1);
      setUserVote(null);
    } else if (userVote === "upvote") {
      setUpvotes(upvotes - 1);
      setDownvotes(downvotes + 1);
      setUserVote("downvote");
    } else {
      setDownvotes(downvotes + 1);
      setUserVote("downvote");
    }
  };

  return (
    <Row className="gy-3">
      <Col className="p-3 m-auto">
        <Container className="border border-dark-subtle bg-light">
          <Row>
            <Col className="border-end border-dark-subtle p-3">
              <Row>
                <Col>
                  <Row>
                    <p>{title}</p>
                  </Row>
                </Col>
              </Row>
            </Col>
            <Col>
              <Row className="p-3">
                <Col className="text-center">
                  <Button
                    className="btn"
                    onClick={handleUpvote}
                    variant={userVote === "upvote" ? "success" : "primary"}
                  >
                    +
                  </Button>
                  <Row>
                    <span className="h5">Votos positivos</span>
                  </Row>
                  <Row>
                    <p>{upvotes}</p>
                  </Row>
                </Col>
                <Col className="text-center">
                  <Button
                    className="btn"
                    onClick={handleDownvote}
                    variant={userVote === "downvote" ? "danger" : "primary"}
                  >
                    -
                  </Button>
                  <Row>
                    <span className="h5">Votos negativos</span>
                  </Row>
                  <Row>
                    <p>{downvotes}</p>
                  </Row>
                </Col>
                <Col className="text-center">
                  <Row>
                    <Col>
                      <NavLink className="custom-text-link" to={`/profile/${author}`}>
                        <span>{author}</span>
                      </NavLink>
                    </Col>
                  </Row>
                  <Row>
                    <p>{new Date(date).toLocaleString()}</p>
                  </Row>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </Col>
    </Row>
  );
};

export default PostComment;
