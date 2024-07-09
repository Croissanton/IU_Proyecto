import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from '../Context/ThemeContext';

const ForumCard = ({ id, topic, post_num, view_num, onTopicClick }) => {
  const navigate = useNavigate();
  const { theme } = useTheme();

  const cardClass = theme === 'dark' ? 'bg-dark text-white' : 'bg-light text-dark';
  const borderClass = theme === 'dark' ? '--bs-tertiary-color' : 'border-dark-subtle';
  const linkContainerClass = theme === 'dark' ? 'custom-link-container-dark' : 'custom-link-container';

  if(theme==='dark') console.log('ForumCard rendered');
  if(localStorage.getItem('theme')==='dark'){
    console.log('ForumCard rendered');
    }
  const handleClick = () => {
    onTopicClick(id);
    navigate(`/topic/${id}`);
  };

  return (
    <Link onClick={handleClick} className="custom-link m-0 p-0">
      <Container className={`border --bs-tertiary-color bg-dark text-white mb-2 mx-0 p-0`}>
        <Row className={`${linkContainerClass} m-0 p-0`}>
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
