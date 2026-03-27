import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../../Layout/Header/Index";
import AppFooter from "../../Layout/AppFooter";
import { InstagramScrollingSection, OfferBar } from "../../Components/common";
import { BlogDetails } from "../../Components/Blog";
import { Queries } from "../../Api";
import { Empty, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const BlogDetailsPage = () => {
  const [hideOfferBar, setHideOfferBar] = useState(false);
  const { id } = useParams();
  const { data, isLoading } = Queries.useGetBlogById(id);
  const post = data?.data;

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 70) return setHideOfferBar(true);
      return setHideOfferBar(false);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[color:var(--color-bg)] text-[color:var(--color-text)]">
      <div className="sticky top-0 z-999">
        <Header />
      </div>
      {!hideOfferBar && <OfferBar className="top-20" />}

      {isLoading ? (
        <section className="delvoura-container py-16">
          <div className="delvoura-product-empty-state">
            <Spin
              indicator={
                <LoadingOutlined
                  style={{ fontSize: 36, color: "var(--color-text-muted)" }}
                  spin
                />
              }
            />
          </div>
        </section>
      ) : post ? (
        <BlogDetails post={post} />
      ) : (
        <section className="delvoura-container py-16">
          <div className="delvoura-product-empty-state">
            <Empty description="No blogs found." />
          </div>
        </section>
      )}

      <InstagramScrollingSection />
      <AppFooter />
    </div>
  );
};

export default BlogDetailsPage;
