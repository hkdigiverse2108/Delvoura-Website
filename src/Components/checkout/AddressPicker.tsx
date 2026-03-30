import type { AddressItem } from "../../Types";

type AddressPickerProps = {
  addresses: AddressItem[];
  selectedId: string;
  onSelect: (id: string) => void;
  fullName: string;
  phone: string;
};

const AddressPicker = ({ addresses, selectedId, onSelect, fullName, phone }: AddressPickerProps) => {
  const items = addresses
    .filter((address) => !!address._id)
    .map((address) => {
      const cityState = [address.city, address.state].filter(Boolean).join(", ");
      const tail = [cityState, address.country, address.pinCode].filter(Boolean).join(" ");
      const line2 = [address.address2, tail].filter(Boolean).join(", ");

      return {
        id: address._id as string,
        label: address.isDefault ? "Default Address" : "Saved Address",
        name: fullName || "Delivery Address",
        phone: phone || "",
        line1: address.address1 ?? "Address",
        line2: line2 || "Add address details",
      };
    });

  return (
    <div className="space-y-3">
      {items.map((item) => {
        const isActive = item.id === selectedId;
        return ( 
      <div className="mt-5" key={item.id}>
          <button
            type="button"
            onClick={() => onSelect(item.id)}
            className={`delvoura-address-card w-full rounded-2xl border px-5 py-4 text-left transition ${
              isActive
                ? "border-[color:var(--color-accent)] bg-[color:var(--color-secondary-bg)]"
                : "border-[color:var(--color-border)] bg-white hover:border-[color:var(--color-accent)]"
            }`}
            data-active={isActive ? "true" : "false"}
          > 
            <div className="flex items-start gap-3 ">
              <div
                className={`delvoura-address-radio mt-1 h-4 w-4 rounded-full border ${
                  isActive
                    ? "border-[color:var(--color-accent)] bg-[color:var(--color-accent)]"
                    : "border-[color:var(--color-border)] bg-white"
                }`}
              />
              <div className="flex-1">
                <div className="text-[15px] font-semibold text-[color:var(--color-text)]">{item.label}</div>
                <div className="mt-1 text-sm text-[color:var(--color-text-muted)]">
                  {item.name} · {item.phone}
                </div>
                <div className="mt-2 text-sm text-[color:var(--color-text)]">{item.line1}</div>
                <div className="text-sm text-[color:var(--color-text-muted)]">{item.line2}</div>
              </div>
            </div>
          </button>
      </div>
        );
      })}
    </div>
  );
};

export default AddressPicker;
