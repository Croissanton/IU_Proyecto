import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import Cookies from "universal-cookie";

const cookies = new Cookies();
const cookieUser = cookies.get("user");

const PostComment = ({
  id,
  postId,
  title,
  author,
  initialUpvotes,
  initialDownvotes,
  date,
  onDelete,
}) => {
  const [upvotes, setUpvotes] = useState(initialUpvotes);
  const [downvotes, setDownvotes] = useState(initialDownvotes);
  const [userVote, setUserVote] = useState(null);

  const updateLocalStorage = (newUpvotes, newDownvotes) => {
    const comments = JSON.parse(localStorage.getItem('comments')) || [];
    const commentIndex = comments.findIndex(comment => comment.id === id);

    if (commentIndex !== -1) {
      comments[commentIndex].upvotes = newUpvotes;
      comments[commentIndex].downvotes = newDownvotes;
    } else {
      comments.push({
        id,
        postId,
        title,
        author,
        upvotes: newUpvotes,
        downvotes: newDownvotes,
        date,
      });
    }

    localStorage.setItem('comments', JSON.stringify(comments));
  };

  const handleUpvote = () => {
    let newUpvotes = upvotes;
    let newDownvotes = downvotes;

    if (userVote === "upvote") {
      newUpvotes -= 1;
      setUserVote(null);
    } else if (userVote === "downvote") {
      newDownvotes -= 1;
      newUpvotes += 1;
      setUserVote("upvote");
    } else {
      newUpvotes += 1;
      setUserVote("upvote");
    }

    setUpvotes(newUpvotes);
    setDownvotes(newDownvotes);
    updateLocalStorage(newUpvotes, newDownvotes);
  };

  const handleDownvote = () => {
    let newUpvotes = upvotes;
    let newDownvotes = downvotes;

    if (userVote === "downvote") {
      newDownvotes -= 1;
      setUserVote(null);
    } else if (userVote === "upvote") {
      newUpvotes -= 1;
      newDownvotes += 1;
      setUserVote("downvote");
    } else {
      newDownvotes += 1;
      setUserVote("downvote");
    }

    setUpvotes(newUpvotes);
    setDownvotes(newDownvotes);
    updateLocalStorage(newUpvotes, newDownvotes);
  };

  const handleDelete = () => {
    const comments = JSON.parse(localStorage.getItem('comments')) || [];
    const updatedComments = comments.filter(comment => comment.id !== id);
    localStorage.setItem('comments', JSON.stringify(updatedComments));
    onDelete(id);
  };

  useEffect(() => {
    // Initialize the upvotes and downvotes from local storage if available
    const comments = JSON.parse(localStorage.getItem('comments')) || [];
    const storedComment = comments.find(comment => comment.id === id);

    if (storedComment) {
      setUpvotes(storedComment.upvotes);
      setDownvotes(storedComment.downvotes);
    }
  }, [id]);

  return (
    <Row className="gy-3">
      <Col className="p-3 m-auto">
        <Container className="border border-dark-subtle bg-light" role="region" aria-labelledby="comment-title">
          <Row>
            <Col className="border-end border-dark-subtle p-3">
              <Row>
                <Col>
                  <Row>
                    <p id="comment-title">{title}</p>
                  </Row>
                </Col>
              </Row>
            </Col>
            <Col>
              <Row className="p-3">
                <Col className="text-center" tabIndex="0">
                  <Button
                    aria-label="Upvote"
                    disabled={!cookies.get("user")}
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
                <Col className="text-center" tabIndex="0">
                  <Button
                    aria-label="Downvote"
                    className="btn"
                    disabled={!cookies.get("user")}
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
                      <NavLink
                        className="custom-text-link"
                        to={`/profile/${author}`}
                        aria-label={`Perfil de ${author}`}
                        tabIndex="0"
                      >
                        <span>{author}</span>
                      </NavLink>
                    </Col>
                  </Row>
                  <Row>
                    <p>{new Date(date).toLocaleString()}</p>
                  </Row>
                </Col>
                <Col className="text-center">
                {cookieUser.username !== author ? (
                  <div></div>
                ) : (
                  <Button
                    aria-label="Eliminar"
                    className="btn btn-danger"
                    onClick={handleDelete}
                  >
                    Eliminar
                  </Button>
                )}
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
