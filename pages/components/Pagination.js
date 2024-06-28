// components/Pagination.js

const Pagination = ({ currentPage, totalItems, itemsPerPage, onPrev, onNext }) => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
  
    return (
      <nav aria-label="Page navigation">
        <ul className="pagination justify-content-center">
          <li className={`page-item ${currentPage === 0 ? 'disabled' : ''}`}>
            <button className="page-link" onClick={onPrev}>Previous</button>
          </li>
          {Array.from({ length: totalPages }).map((_, index) => (
            <li className={`page-item ${index === currentPage ? 'active' : ''}`} key={index}>
              <button className="page-link" onClick={() => onNext(index)}>{index + 1}</button>
            </li>
          ))}
          <li className={`page-item ${currentPage === totalPages - 1 ? 'disabled' : ''}`}>
            <button className="page-link" onClick={onNext}>Next</button>
          </li>
        </ul>
      </nav>
    );
  };
  
  export default Pagination;
  