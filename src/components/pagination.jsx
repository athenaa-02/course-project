import ReactPaginate from "react-paginate";

function PaginatedItems({ currentPage, totalPages }) {
  return (
    <ReactPaginate
      breakLabel="..."
      nextLabel="next >"
      previousLabel="< previous"
      pageCount={totalPages}
      pageRangeDisplayed={5}
      onPageChange={(event) => currentPage(event.selected + 1)} 
      containerClassName="pagination"
      activeClassName="active"
    />
  );
}

export default PaginatedItems;