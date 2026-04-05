import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../../Layout/Header/Index";
import AppFooter from "../../Layout/AppFooter";
import { EmptyState, InstagramScrollingSection, OfferBar } from "../../Components/common";
import { BlogDetails } from "../../Components/Blog";
import { Queries } from "../../Api";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const BlogDetailsPage = () => {
  const { id } = useParams();
  const { data, isLoading } = Queries.useGetBlogById(id);
  const post = data?.data;


  return (
    <div className="min-h-screen bg-[color:var(--color-bg)] text-[color:var(--color-text)]">
      <div className="sticky top-0 z-999">
        <Header />
      </div>

      {isLoading ? (
        <section className="delvoura-container pb-16">
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
          <EmptyState message="No blogs found." imageAlt="No blogs" />
        </section>
      )}

      <InstagramScrollingSection />
      <AppFooter />
    </div>
  );
};

export default BlogDetailsPage;
