import ReactPaginate from "react-paginate";

function PaginatedItems({ currentPage, totalPages }) {
  return (
<ReactPaginate
  breakLabel="..."
  nextLabel=" >"
  previousLabel="< "
  pageCount={totalPages}
  pageRangeDisplayed={2}    
  marginPagesDisplayed={2} 
  onPageChange={(event) => currentPage(event.selected + 1)}
  containerClassName="pagination"
  pageClassName="page-item"
  pageLinkClassName="page-link"
  breakClassName="break-item"
  breakLinkClassName="break-link"
  activeClassName="active"
/>
  );
}

export default PaginatedItems;