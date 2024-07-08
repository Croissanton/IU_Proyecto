import React from "react";
import Pagination from "react-bootstrap/Pagination";
import { Container } from "react-bootstrap";

function IndexSelector({ totalTopics, topicsPerPage, currentPage, onPageChange }) {
  const totalPages = Math.ceil(totalTopics / topicsPerPage);

  const handlePageClick = (pageNumber) => {
    onPageChange(pageNumber);
  };

  const pageItems = [];
  for (let number = 1; number <= totalPages; number++) {
    pageItems.push(
      <Pagination.Item
        key={number}
        active={number === currentPage}
        onClick={() => handlePageClick(number)}
        aria-label={`selección de página número ${number} de ${totalPages}`}
      >
        {number}
      </Pagination.Item>
    );
  }

  return (
    <Container className="d-flex justify-content-center">
      <Pagination className="m-auto custom-pagination">
        {pageItems}
      </Pagination>
    </Container>
  );
}

export default IndexSelector;
