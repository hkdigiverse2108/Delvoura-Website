import { Button, Rate, Tag } from "antd";

const products = [
  {
    name: "Aqua Prism",
    subtitle: "Inspired by Cool Water",
    price: "Rs. 299 - 799.0",
    rating: 5,
    reviews: 100,
    sizes: ["50 ml", "15 ml"],
    tags: ["Aquatic", "Green", "Aromatic", "Spicy"],
    badges: ["Unisex"],
    image:
      "https://images.unsplash.com/photo-1523293182086-7651a899d37f?q=80&w=900&auto=format&fit=crop",
  },
  {
    name: "Citrus Drift",
    subtitle: "Inspired by Aqua di Gio",
    price: "Rs. 299 - 799.0",
    rating: 4,
    reviews: 23,
    sizes: ["50 ml", "15 ml"],
    tags: ["Aromatic", "Aquatic", "Spicy", "Amber"],
    badges: ["Men"],
    image:
      "https://images.unsplash.com/photo-1500835556837-99ac94a94552?q=80&w=900&auto=format&fit=crop",
  },
  {
    name: "Amber Veil",
    subtitle: "Inspired by Invite Only Amber",
    price: "Rs. 299 - 799.0",
    rating: 5,
    reviews: 14,
    sizes: ["50 ml", "15 ml"],
    tags: ["Woody", "Amber", "Spicy", "Earthy"],
    badges: ["Unisex", "Women"],
    image:
      "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?q=80&w=900&auto=format&fit=crop",
  },
    {
    name: "Aqua Prism",
    subtitle: "Inspired by Cool Water",
    price: "Rs. 299 - 799.0",
    rating: 5,
    reviews: 100,
    sizes: ["50 ml", "15 ml"],
    tags: ["Aquatic", "Green", "Aromatic", "Spicy"],
    badges: ["Unisex"],
    image:
      "https://images.unsplash.com/photo-1523293182086-7651a899d37f?q=80&w=900&auto=format&fit=crop",
  },
];

const ProductGrid = () => {
  return (
    <section className="delvoura-home-products">
      <div className="mx-auto w-[95%] max-w-[1700px]">
        <div className="delvoura-product-grid grid gap-6">
          {products.map((product) => (
            <article key={product.name} className="delvoura-product-card">
              <div className="delvoura-product-media">
                <img src={product.image} alt={product.name} loading="lazy" />
                <div className="delvoura-product-media-shadow" />
                <div className="delvoura-product-badges">
                  {product.badges.map((badge) => (
                    <Tag key={badge} className="delvoura-product-badge">
                      {badge}
                    </Tag>
                  ))}
                </div>
              </div>

              <div className="delvoura-product-content">
                <Button className="delvoura-product-cta" type="default">
                  Select Options
                </Button>
                <h3 className="delvoura-product-title">{product.name}</h3>
                <div className="delvoura-product-subtitle">{product.subtitle}</div>

                <div className="delvoura-product-row">
                  <div className="flex items-center gap-2">
                    <Rate disabled defaultValue={product.rating} />
                    <span className="delvoura-product-reviews">({product.reviews})</span>
                  </div>
                  <div className="delvoura-product-sizes">
                    {product.sizes.map((size) => (
                      <span key={size} className="delvoura-size-pill">
                        {size}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="delvoura-product-row">
                  <span className="delvoura-product-price">{product.price}</span>
                </div>

                <div className="delvoura-product-tags">
                  {product.tags.map((tag, idx) => (
                    <span key={tag}>
                      {tag}
                      {idx < product.tags.length - 1 ? " |" : ""}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;
