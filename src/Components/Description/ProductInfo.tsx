import { Rate } from "antd";

const ProductInfo = () => {
  return (
    <div className="delvoura-product-info">
      <div className="delvoura-info-block delvoura-info-header">
        <div className="delvoura-product-badges">
          <span className="delvoura-product-badge">Unisex</span>
        </div>

        <h1 className="delvoura-product-title">Promise | Eau De Parfum</h1>
        <p className="delvoura-product-subtitle">Inspired by Frederic Malle</p>

        <div className="delvoura-product-rating">
          <Rate disabled defaultValue={5} />
          <span>(2)</span>
        </div>
      </div>

      <div className="delvoura-info-divider" />

      <div className="delvoura-info-block">
        <div className="delvoura-product-tags">
          <span className="delvoura-product-tag">Woody</span>
          <span className="delvoura-product-tag">Earthy</span>
          <span className="delvoura-product-tag">Amber</span>
          <span className="delvoura-product-tag">Fruity</span>
        </div>

        <div className="delvoura-product-highlights">
          <span className="delvoura-highlight-pill">All Day Longevity</span>
          <span className="delvoura-highlight-pill">Strong Projection</span>
        </div>
      </div>

      <div className="delvoura-info-divider" />

      <div className="delvoura-info-block">
        <div className="delvoura-product-inspired">
          Inspired by <strong>Promise by Frederic Malle</strong>
        </div>

        <div className="delvoura-product-price-row">
          <span className="delvoura-product-price">Rs. 799.00</span>
          <span className="delvoura-product-price-old">M.R.P. 1,499.00</span>
        </div>
        <div className="delvoura-product-tax">Inclusive of all taxes</div>
      </div>

      <div className="delvoura-info-divider" />

      <div className="delvoura-info-block">
        <div className="delvoura-product-sizes">
          <button type="button" className="delvoura-size-btn is-active">50 ml</button>
          <button type="button" className="delvoura-size-btn">15 ml</button>
        </div>

        <div className="delvoura-product-actions">
          <div className="delvoura-qty-control">
            <button type="button" className="delvoura-qty-btn">-</button>
            <span className="delvoura-qty-value">1</span>
            <button type="button" className="delvoura-qty-btn">+</button>
          </div>
          <button type="button" className="delvoura-add-to-cart">Add To Cart</button>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;
