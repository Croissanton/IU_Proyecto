import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";

const PostCard = ({
  id,
  title,
  text,
  upvotes,
  downvotes,
  author,
  date,
  res_num,
  view_num,
  lm_author,
  lm_date,
  onPostClick,
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onPostClick) {
      onPostClick(id);
      navigate(`/post/${id}`);
    }
  };

  return (
    <div
      onClick={handleClick}
      className="custom-link m-0 p-0"
      role="button"
      tabIndex="0"
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          handleClick();
        }
      }}
    >
      <Container className="border border-dark-subtle bg-light">
        <Row className="custom-link-container">
          <Col className="p-3">
            <Row>
              <span
                className="h4"
                style={{
                  whiteSpace: "normal",
                  wordBreak: "break-word",
                  overflowWrap: "break-word",
                }}
              >
                {title}
              </span>
            </Row>
            <Row>
              <p
                style={{
                  whiteSpace: "normal",
                  wordBreak: "break-word",
                  overflowWrap: "break-word",
                }}
              >
                {text}
              </p>
            </Row>
            <Row onClick={(e) => e.stopPropagation()}>
              <Col>
                <span> Creador: </span>
                <NavLink className="custom-text-link" to={`/profile/${author}`}>
                  <span>{author}</span>
                </NavLink>
              </Col>
            </Row>
            <Row>
              <p>Fecha de creación: {date}</p>
            </Row>
            <Row>
              <Col>
                <span> Votos positivos: {upvotes} </span>
              </Col>
              <Col>
                <span> Votos negativos: {downvotes} </span>
              </Col>
            </Row>
          </Col>
          <Col className="p-3">
            <Row>
              <Col className="m-auto">
                <span className="h5">Respuestas</span>
                <p>{res_num}</p>
              </Col>
              <Col className="m-auto">
                <span className="h5">Número de visualizaciones</span>
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
                  <p>Fecha del último mensaje:</p>
                </Row>
                <Row>
                  <p>{lm_date}</p>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default PostCard;
