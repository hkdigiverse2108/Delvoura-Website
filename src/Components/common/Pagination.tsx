type PaginationProps = {
  total: number;
  pageSize: number;
  current: number;
  totalPages?: number;
  onChange: (page: number) => void;
};

const Pagination = ({ total, pageSize, current, totalPages, onChange }: PaginationProps) => {
  const pagesCount = totalPages ?? Math.max(1, Math.ceil(total / pageSize));
  if (total <= 0) return null;

  const maxPages = 5;
  let start = Math.max(1, current - Math.floor(maxPages / 2));
  if (start + maxPages - 1 > pagesCount) start = Math.max(1, pagesCount - maxPages + 1);
  const pages = Array.from({ length: Math.min(maxPages, pagesCount) }, (_, i) => start + i);

  return (
    <div className="delvoura-pagination">
      {pages.map((page) => (
        <button key={page} type="button" className={`delvoura-page-btn ${page === current ? "is-active" : ""}`} onClick={() => onChange(page)}>
          {page}
        </button>
      ))}
      <button type="button" className="delvoura-page-btn is-nav" onClick={() => onChange(Math.min(current + 1, pagesCount))} disabled={current >= pagesCount}>
        {">"}
      </button>
    </div>
  );
};

export default Pagination;
