const OfferBar = ({ className = "" }: { className?: string }) => {
  return (
    <div className={`fixed left-0 right-0 top-0 z-[500] mt-3 ${className}`}>
      <div
        className="delvoura-container h-auto rounded-xl bg-[#111111] px-2 py-3 text-center text-[13px] text-sm-[10px] font-medium tracking-[0.08em] text-[#ffffff]"
        style={{
          boxShadow: "none",
        }}
      >
        Free Shipping above 999 INR | FLAT 10% OFF above 1499 INR and 20% OFF On
        Orders above 2499 INR (Automatically Applied) | COD Eligible Above 999
        INR
      </div>
    </div>
  );
};

export default OfferBar
