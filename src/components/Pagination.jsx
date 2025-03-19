import React from "react";

const Pagination = ({ page, onPrevious, onNext }) => {
  return (
    <div className="pagination">
      <button onClick={onPrevious} disabled={page === 1}>
        Página anterior
      </button>
      <span>Página {page}</span>
      <button onClick={onNext}>Página siguiente</button>
    </div>
  );
};

export default Pagination;
