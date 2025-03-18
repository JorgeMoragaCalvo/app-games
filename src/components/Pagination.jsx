import React from "react";

const Pagination = ({ page, onPrevious, onNext }) => {
  return (
    <div className="pagination">
      <button onClick={onPrevious} disabled={page === 1}>
        Previous Page
      </button>
      <span>Page {page}</span>
      <button onClick={onNext}>Next Page</button>
    </div>
  );
};

export default Pagination;
