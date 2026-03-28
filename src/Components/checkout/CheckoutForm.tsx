import { type ChangeEvent, useMemo, useState } from "react";
import {
  CommonCountrySelect,
  CommonEmailInput,
  CommonPhoneInput,
  CommonPinCodeInput,
  CommonTextInput,
} from "../../Attribute";
import AddressPicker from "./AddressPicker";

const CheckoutForm = () => {
  const [formValues, setFormValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    countryCode: "+91",
    country: "India",
    state: "",
    city: "",
    pinCode: "",
    address1: "",
    landmark: "",
  });
  const [selectedAddressId, setSelectedAddressId] = useState("home");
  const [saveAddress, setSaveAddress] = useState(true);
  const [showAddressForm, setShowAddressForm] = useState(false);

  const addresses = useMemo(
    () => [
      {
        id: "home",
        label: "Home",
        name: "Aarav Mehta",
        phone: "+91 98765 43210",
        line1: "34/1 Park View Apartments",
        line2: "Indiranagar, Bengaluru, Karnataka 560038",
      },
      {
        id: "office",
        label: "Office",
        name: "Aarav Mehta",
        phone: "+91 99887 77665",
        line1: "3rd Floor, Orion Business Park",
        line2: "MG Road, Bengaluru, Karnataka 560001",
      },
    ],
    []
  );

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-[color:var(--color-border)] bg-white px-5 py-5">
        <h3 className="text-base font-semibold">Personal Information</h3>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <CommonTextInput
            name="firstName"
            label="First Name"
            placeholder="First name"
            value={formValues.firstName}
            onChange={handleChange}
            onBlur={() => undefined}
            touched={false}
          />
          <CommonTextInput
            name="lastName"
            label="Last Name"
            placeholder="Last name"
            value={formValues.lastName}
            onChange={handleChange}
            onBlur={() => undefined}
            touched={false}
          />
          <CommonEmailInput
            name="email"
            label="Email"
            placeholder="you@example.com"
            value={formValues.email}
            onChange={handleChange}
            onBlur={() => undefined}
            touched={false}
          />
          <CommonPhoneInput
            name="phone"
            label="Phone"
            placeholder="Enter phone number"
            value={formValues.phone}
            onChange={handleChange}
            onBlur={() => undefined}
            touched={false}
            countryValue={formValues.countryCode}
            onCountryChange={(value: string) =>
              setFormValues((prev) => ({ ...prev, countryCode: value }))
            }
          />
        </div>
      </section>

      <section className="rounded-2xl border border-[color:var(--color-border)] bg-white px-5 py-5">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-semibold">Shipping Address</h3>
          <button
            type="button"
            onClick={() => setShowAddressForm((prev) => !prev)}
            className="cursor-pointer rounded-md border border-[color:var(--color-border)] px-3 py-1 text-xs font-semibold text-[color:var(--color-text)] hover:border-[color:var(--color-border)]"
          >
            {showAddressForm ? "Back to Saved Addresses" : "Use Different Address"}
          </button>
        </div>
        {!showAddressForm && (
          <div className="mt-4 space-y-3">
            <AddressPicker
              items={addresses}
              selectedId={selectedAddressId}
              onSelect={setSelectedAddressId}
            />
          </div>
        )}

        {showAddressForm && (
          <>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <CommonCountrySelect
                name="country"
                label="Country"
                placeholder="Select country"
                value={formValues.country}
                onChange={(value: string) => setFormValues((prev) => ({ ...prev, country: value }))}
                onBlur={() => undefined}
                touched={false}
              />
              <CommonTextInput
                name="state"
                label="State"
                placeholder="State"
                value={formValues.state}
                onChange={handleChange}
                onBlur={() => undefined}
                touched={false}
              />
              <CommonTextInput
                name="city"
                label="City"
                placeholder="City"
                value={formValues.city}
                onChange={handleChange}
                onBlur={() => undefined}
                touched={false}
              />
              <CommonPinCodeInput
                name="pinCode"
                label="Pin Code"
                placeholder="Pin code"
                value={formValues.pinCode}
                onChange={handleChange}
                onBlur={() => undefined}
                touched={false}
              />
              <CommonTextInput
                name="address1"
                label="Address Line 1"
                placeholder="Flat / House / Building"
                value={formValues.address1}
                onChange={handleChange}
                onBlur={() => undefined}
                touched={false}
              />
              <CommonTextInput
                name="landmark"
                label="Landmark"
                placeholder="Landmark (optional)"
                value={formValues.landmark}
                onChange={handleChange}
                onBlur={() => undefined}
                touched={false}
              />
            </div>

            <label className="mt-5 flex items-center gap-3 text-sm text-[color:var(--color-text-muted)]">
              <input
                type="checkbox"
                checked={saveAddress}
                onChange={() => setSaveAddress((prev) => !prev)}
                className="h-4 w-4 accent-[color:var(--color-accent)]"
              />
              Save this address for next time
            </label>
          </>
        )}
      </section>

      <section className="rounded-2xl border border-[color:var(--color-border)] bg-white px-5 py-5">
        <h3 className="text-base font-semibold">Payment</h3>
        <p className="mt-1 text-sm text-[color:var(--color-text-muted)]">
          All transactions are secure and encrypted.
        </p>

        <div className="mt-4 overflow-hidden rounded-2xl border border-[color:var(--color-accent)] bg-[color:var(--color-secondary-bg)]">
          <div className="flex items-start justify-between gap-4 px-4 py-3">
            <div>
              <div className="text-sm font-semibold">
                Razorpay Secure (UPI, Cards, Int'l Cards, Wallets)
              </div>
            </div>
            <div className="flex items-center gap-2">
              <img src="/assets/images/checkout/upi.svg" alt="UPI" className="h-5 w-auto" />
              <img src="/assets/images/checkout/visa.svg" alt="Visa" className="h-5 w-auto" />
              <img src="/assets/images/checkout/masterCard.svg" alt="Mastercard" className="h-5 w-auto" />
              <span className="rounded border border-[color:var(--color-border)] bg-white px-2 py-1 text-[10px] text-[color:var(--color-text-muted)]">
                +18
              </span>
            </div>
          </div>
          <div className="border-t border-[color:var(--color-border)] bg-white px-4 py-3 text-sm text-[color:var(--color-text-muted)]">
            You'll be redirected to Razorpay Secure (UPI, Cards, Int'l Cards, Wallets) to
            complete your purchase.
          </div>
        </div>
      </section>
    </div>
  );
};

export default CheckoutForm;
