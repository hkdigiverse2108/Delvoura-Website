import { useEffect, useState } from "react";
import Header from "../../Layout/Header/Index";
import AppFooter from "../../Layout/AppFooter";
import { EmptyState, InstagramScrollingSection, OfferBar } from "../../Components/common";
import BannerSlider from "../../Components/Home/BannerSlider";
import { BlogCardGrid } from "../../Components/Blog";
import Pagination from "../../Components/common/Pagination";
import { Queries } from "../../Api";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const BlogPage = () => {
  const [hideOfferBar, setHideOfferBar] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8;
  const { data, isLoading } = Queries.useGetBlogs({ page: currentPage, limit: pageSize,});
  const posts = data?.data?.blog_data ?? [];
  const totalPosts = data?.data?.totalData ?? posts.length;
  const totalPages = data?.data?.state?.totalPages ?? Math.max(1, Math.ceil(totalPosts / pageSize));

  const smoothScrollTo = (targetY: number, duration = 650) => {
    const startY = window.scrollY;
    const diff = targetY - startY;
    let startTime: number | null = null;

    const easeInOut = (t: number) => t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;

    const step = (time: number) => {
      if (startTime === null) startTime = time;
      const elapsed = time - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeInOut(progress);
      window.scrollTo({ top: startY + diff * eased, behavior: "auto" });
      if (progress < 1) window.requestAnimationFrame(step);
    };

    window.requestAnimationFrame(step);
  };

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
      <BannerSlider />

      <section className="delvoura-container py-12">
        {isLoading ? (
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
        ) : posts.length ? (
          <BlogCardGrid posts={posts} />
        ) : (
          <EmptyState message="No blogs found." imageAlt="No blogs" />
        )}
        {totalPosts > 0 && (
          <div className="mt-10 flex justify-center">
            <Pagination
              total={totalPosts}
              totalPages={totalPages}
              pageSize={pageSize}
              current={currentPage}
              onChange={(page) => {
                setCurrentPage(page);
                smoothScrollTo(0, 750);
              }}
            />
          </div>
        )}
      </section>

      <InstagramScrollingSection />
      <AppFooter />
    </div>
  );
};

export default BlogPage;
