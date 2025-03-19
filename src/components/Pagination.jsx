import React from "react";

const Pagination = ({ page, onPrevious, onNext }) => {
  return (
    <div className="pagination">
      {/* Button to go to the previous page. Disable if page 1 is set*/}
      <button onClick={onPrevious} disabled={page === 1}>
        Página anterior
      </button>
      {/* Current page */}
      <span>Página {page}</span>
      {/* Button to go to the next page */}
      <button onClick={onNext}>Página siguiente</button>
    </div>
  );
};

export default Pagination;
