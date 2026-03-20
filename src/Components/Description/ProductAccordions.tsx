import { useState } from "react";
import { RightOutlined } from "@ant-design/icons";

const ACCORDION_DATA = [
  {
    title: "Product Description",
    content: (
      <div className="delvoura-accordion-body">
        <div className="delvoura-accordion-tags">Vegan | Cruelty Free | Clean</div>
        <div className="delvoura-accordion-notes">
          <div>
            <strong>Top Notes:</strong> Apple, Pink Pepper, Rosemary, Saffron Cloves
          </div>
          <div>
            <strong>Middle Notes:</strong> Bulgarian Rose, Turkish Rose
          </div>
          <div>
            <strong>Base Notes:</strong> Cypriol Oil, Patchouli, Castoreum, Labdanum, Ambroxan
          </div>
        </div>
      </div>
    ),
  },
  {
    title: "Usage Tips",
    content: (
      <div className="delvoura-accordion-body">
        <p>
          For best results hold the perfume 3-6 inches away from skin. Lightly spray fragrance on pulse points
          including neck, chest, and wrists. Avoid spraying it very close to the clothes as it may leave oil stains
          because of high oil content.
        </p>
      </div>
    ),
  },
  {
    title: "Ingredients",
    content: (
      <div className="delvoura-accordion-body">
        <div className="delvoura-ingredient-btns">
          <button type="button" className="delvoura-ingredient-btn">Alcohol Denat.</button>
          <button type="button" className="delvoura-ingredient-btn">Fragrance (Parfum)</button>
          <button type="button" className="delvoura-ingredient-btn">Aqua (Water)</button>
          <button type="button" className="delvoura-ingredient-btn">Limonene</button>
          <button type="button" className="delvoura-ingredient-btn">Linalool</button>
          <button type="button" className="delvoura-ingredient-btn">Citronellol</button>
          <button type="button" className="delvoura-ingredient-btn">Geraniol</button>
        </div>
      </div>
    ),
  },
  {
    title: "Brand & Manufacturer Info",
    content: (
      <div className="delvoura-accordion-body">
        <div className="brand-info">
          <div className="brand-name">Delvoura</div>
          <div className="brand-details">
            Delvoura crafts long-lasting, modern fragrances inspired by iconic olfactory profiles. Each formula is
            blended in small batches for premium sillage and balanced wear on skin.
          </div>
        </div>
      </div>
    ),
  },
];

const ProductAccordions = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  return (
    <div className="delvoura-product-accordions">
      {ACCORDION_DATA.map((item, idx) => (
        <details key={item.title} open={openIndex === idx} className="delvoura-accordion-details">
          <summary
            className="delvoura-accordion-summary"
            onClick={e => {
              e.preventDefault();
              setOpenIndex(openIndex === idx ? null : idx);
            }}
            aria-expanded={openIndex === idx}
            tabIndex={0}
            onKeyDown={e => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setOpenIndex(openIndex === idx ? null : idx);
              }
            }}
          >
            <span className="delvoura-accordion-title">
              <span className="delvoura-accordion-dot" aria-hidden="true" />
              {item.title}
            </span>
            <RightOutlined className="delvoura-accordion-icon" aria-hidden="true" />
          </summary>
          <div className="delvoura-accordion-content" aria-hidden={openIndex !== idx}>
            {item.content}
          </div>
        </details>
      ))}
    </div>
  );
};

export default ProductAccordions;
