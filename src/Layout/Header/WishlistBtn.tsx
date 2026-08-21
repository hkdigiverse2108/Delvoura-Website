import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../Constants";
import { useWishlist } from "../../Utils/Hooks";

type WishlistBtnProps = {
  className?: string;
};

const WishlistBtn = ({ className = "" }: WishlistBtnProps) => {
  const navigate = useNavigate();
  const { wishlistCount } = useWishlist();

  return (
    <button
      type="button"
      onClick={() => navigate(ROUTES.WISHLIST)}
      className={`delvoura-glow-pill delvoura-wishlist-btn relative grid h-11 w-11 place-items-center rounded-2xl transition cursor-pointer ${className}`}
      aria-label="Wishlist"
      title="Wishlist"
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
      {wishlistCount > 0 && (
        <span className="absolute -right-1 -top-1 grid h-5 w-5 place-items-center rounded-full bg-[color:var(--color-accent)] text-[10px] font-bold text-[color:var(--color-text-on-dark)]">
          {wishlistCount}
        </span>
      )}
    </button>
  );
};

export default WishlistBtn;
