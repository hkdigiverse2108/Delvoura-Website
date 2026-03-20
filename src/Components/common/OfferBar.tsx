const OfferBar = ({ className = "" }: { className?: string }) => {
  return (
    <div className={`fixed left-0 right-0 top-0 z-[500] mt-3 ${className}`}>
      <div className="mx-auto h-auto w-[90%] rounded-xl bg-black/90 px-2 py-3 text-center text-[13px] text-sm-[10px] font-medium tracking-[0.08em] text-white shadow-[0_10px_30px_-20px_rgba(0,0,0,0.8)]">
        Free Shipping above 999 INR | FLAT 10% OFF above 1499 INR and 20% OFF On
        Orders above 2499 INR (Automatically Applied) | COD Eligible Above 999
        INR
      </div>
    </div>
  );
};

export default OfferBar