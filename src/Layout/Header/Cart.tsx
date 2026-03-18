
const Cart = () => {
  return (
    <button type="button" className="delvoura-glow-pill delvoura-cart-btn relative grid h-11 w-11 place-items-center rounded-2xl transition">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M7 18a2 2 0 11.001 3.999A2 2 0 017 18zm10 0a2 2 0 11.001 3.999A2 2 0 0117 18zM7.2 6h13.6l-1.5 8.2a2 2 0 01-2 1.6H9.4a2 2 0 01-2-1.6L5 3H2V1h4l1.2 5z" />
      </svg>
      <span className="absolute -right-1 -top-1 grid h-5 w-5 place-items-center rounded-full bg-[color:var(--color-accent)] text-[10px] font-bold text-white">
        1
      </span>
    </button>
  );
};

export default Cart;
