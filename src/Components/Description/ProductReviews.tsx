import { Rate } from "antd";

const ProductReviews = () => {
  return (
    <section className="delvoura-review-section">
      <div className="delvoura-review-card">
        <div className="delvoura-review-header">
          <div className="delvoura-review-rating">
            <Rate disabled defaultValue={5} />
            <span className="delvoura-review-count">1 Review</span>
          </div>

          <div className="delvoura-review-actions">
            <button type="button" className="delvoura-review-btn">
              Write a review
            </button>
            <div className="delvoura-review-select-wrap">
              <select className="delvoura-review-select" aria-label="Sort reviews">
                <option>Featured</option>
                <option>Newest</option>
                <option>Highest Ratings</option>
                <option>Lowest Ratings</option>
              </select>
            </div>
          </div>
        </div>

        <div className="delvoura-review-list">
          <article className="delvoura-review-item">
            <div className="delvoura-review-meta">
              <div className="delvoura-review-name">Nitish P.</div>
              <span className="delvoura-review-verified">Verified</span>
              <span className="delvoura-review-date">3/17/2026</span>
            </div>
            <Rate disabled defaultValue={5} className="delvoura-review-stars" />
            <p className="delvoura-review-text">Good quality and fragrance</p>
          </article>
        </div>
      </div>
    </section>
  );
};

export default ProductReviews;
