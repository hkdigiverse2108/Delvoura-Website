import Header from "../../Layout/Header/Index";
import AppFooter from "../../Layout/AppFooter";
import CheckoutContent from "../../Components/checkout";

const CheckoutPage = () => {
  return (
    <div className="checkout-page min-h-screen bg-[color:var(--color-card)] text-[color:var(--color-text)]">
      <div className="sticky top-0 z-[550] w-full">
        <Header />
      </div>
      <CheckoutContent />
      <AppFooter />
    </div>
  );
};

export default CheckoutPage;
