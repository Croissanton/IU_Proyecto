import React, { useState } from 'react';
import Pagination from 'react-bootstrap/Pagination';
import { Container } from "react-bootstrap";

function IndexSelector() {
  const [activePage, setActivePage] = useState(1); // Initial active page is 1

  const handlePageClick = (pageNumber) => {
    setActivePage(pageNumber);
  };

  return (
    <Container className='d-flex align-content-lg-center'>
      <Pagination className='m-auto'>
        <Pagination.Item active={activePage === 1} onClick={() => handlePageClick(1)}>
          {1}
        </Pagination.Item>
        <Pagination.Ellipsis />

        {[...Array(5)].map((_, index) => {
          const pageNumber = index + 2;
          return (
            <Pagination.Item
              key={pageNumber}
              active={activePage === pageNumber}
              onClick={() => handlePageClick(pageNumber)}
            >
              {pageNumber}
            </Pagination.Item>
          );
        })}

        <Pagination.Ellipsis />
        <Pagination.Item active={activePage === 20} onClick={() => handlePageClick(20)}>
          {20}
        </Pagination.Item>
      </Pagination>
    </Container>
  );
}

export default IndexSelector;
