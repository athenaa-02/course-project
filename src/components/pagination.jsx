import ReactPaginate from "react-paginate";

function PaginatedItems({ currentPage, totalPages }) {
  return (
<ReactPaginate
  breakLabel="..."
  nextLabel=">"
  previousLabel="<"
  pageCount={totalPages}
  pageRangeDisplayed={5}
  onPageChange={(event) => currentPage(event.selected + 1)}
  containerClassName="pagination"
  pageClassName="page-item"
  pageLinkClassName="page-link"
  activeClassName="active"
/>
  );
}

export default PaginatedItems;