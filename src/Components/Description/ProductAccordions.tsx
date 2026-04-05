import { useMemo, useState } from "react";
import { RightOutlined } from "@ant-design/icons";
import type { ProductItem } from "../../Types";

type ProductAccordionsProps = {
  product?: ProductItem | null;
};

const ProductAccordions = ({ product }: ProductAccordionsProps) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const renderHtml = (html?: string, fallback?: string) => {
    if (html) {
      const normalized = html.replace(/&nbsp;/g, " ").replace(/\u00A0/g, " ");
      return <div className="delvoura-html" dangerouslySetInnerHTML={{ __html: normalized }} />;
    }
    return <p>{fallback}</p>;
  };
  const accordionData = useMemo(
    () => [
      {
        title: "Product Description",
        content: (
          <div className="delvoura-accordion-body">
            {renderHtml(product?.description, "No description available.")}
          </div>
        ),
      },
      {
        title: "Usage Tips",
        content: (
          <div className="delvoura-accordion-body">
            {renderHtml(product?.usageTips, "No usage tips available.")}
          </div>
        ),
      },
      {
        title: "Ingredients",
        content: (
          <div className="delvoura-accordion-body">
            <div className="delvoura-ingredient-btns">
              {(product?.ingredients || []).map((item) => (
                <button key={item} type="button" className="delvoura-ingredient-btn">{item}</button>
              ))}
            </div>
          </div>
        ),
      },
      {
        title: "Brand & Manufacturer Info",
        content: (
          <div className="delvoura-accordion-body">
            <div className="brand-info">
              <div className="brand-name">{product?.name || "Delvoura"}</div>
              <div className="brand-details">
                {renderHtml(product?.brandManufacturerInfo, "No brand information available.")}
              </div>
            </div>
          </div>
        ),
      },
    ],
    [product]
  );

  return (
    <div className="delvoura-product-accordions">
      {accordionData.map((item, idx) => (
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
