/* eslint-disable react/prop-types */
import React, { useState } from "react";

const TreeTablePagination = (props) => {
  const { fetchData, totalRecords } = props;

  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 20; // Default items per page

  const totalCount = totalRecords || 0;
  const totalPage = Math.ceil(totalCount / perPage);

  const start = (currentPage - 1) * perPage + 1;
  let end = currentPage * perPage;
  if (end > totalCount) {
    end = totalCount;
  }

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPage) return;
    setCurrentPage(page);
    const newFilterParams = { ...props.filterParams, currentPage: page };
    fetchData(newFilterParams);
  };

  return (
    <nav className="pagination-container">
      <span>Rows per page:</span>
      <select
        aria-label="Rows per page"
        onChange={(event) => {
          const newPerPage = parseInt(event.target.value, 10);
          const newFilterParams = {
            ...props.filterParams,
            currentPage: 1,
            perPage: newPerPage,
          };
          fetchData(newFilterParams);
        }}
        value={perPage}
      >
        <option value="10">10</option>
        <option value="15">15</option>
        <option value="20">20</option>
        <option value="25">25</option>
        <option value="30">30</option>
      </select>
      <span>
        {start}-{end} of {totalCount}
      </span>
      <div className="pagination-buttons">
        <button
          onClick={() => handlePageChange(1)}
          disabled={currentPage === 1}
          aria-label="First Page"
        >
          First
        </button>
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          aria-label="Previous Page"
        >
          Previous
        </button>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPage}
          aria-label="Next Page"
        >
          Next
        </button>
        <button
          onClick={() => handlePageChange(totalPage)}
          disabled={currentPage === totalPage}
          aria-label="Last Page"
        >
          Last
        </button>
      </div>
    </nav>
  );
};

export default TreeTablePagination;
