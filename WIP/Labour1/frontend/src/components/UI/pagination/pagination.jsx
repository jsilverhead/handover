import React from 'react';
import cl from './pagination.module.css';

function Pagination({ totalItems, currentPage, setCurrentPage }) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalItems / 6); i++) {
    pageNumbers.push(i);
  }
  return (
    <div className={cl.pagination}>
      {pageNumbers.map((number) => (
        <div
          className={currentPage === number ? cl.page_picked : cl.page}
          key={number}
          onClick={() => setCurrentPage(number)}
        >
          {number}
        </div>
      ))}
    </div>
  );
}

export default Pagination;
