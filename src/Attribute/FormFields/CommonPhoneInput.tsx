import { Input, Select } from "antd";
import { getCountries, getCountryCallingCode } from "libphonenumber-js";
import { useMemo } from "react";
import type { CommonPhoneInputProps } from "../../Types";

export const CommonPhoneInput = ({ name, label, placeholder, value, onChange, onBlur, error, touched, countryValue, onCountryChange, countryOptions, }: CommonPhoneInputProps) => {
  const hasError = touched && !!error;

  const options = useMemo(() => {
    if (countryOptions?.length) return countryOptions;

    const displayNames = new Intl.DisplayNames(["en"], { type: "region" });

    return getCountries()
      .map((code) => {
        const callingCode = getCountryCallingCode(code);
        const name = displayNames.of(code) ?? code;

        return {
          value: `+${callingCode}`,
          label: `${name} (+${callingCode})`,
        };
      })
      .sort((a, b) => a.label.localeCompare(b.label));
  }, [countryOptions]);

  return (
    <div>
      <label className="mb-2 block text-sm text-[color:var(--color-text)]">
        {label}
      </label>
      <div>
        <Input  name={name} className="overflow-hidden"   placeholder={placeholder}  size="large"  type="tel"  value={value}  onChange={onChange}  onBlur={onBlur} status={hasError ? "error" : ""} style={{ borderColor: hasError ? "#ff4d4f" : undefined, }}
          addonBefore={
            <Select   value={countryValue}   onChange={onCountryChange}   options={options}   className="delvoura-contact-select"   dropdownClassName="delvoura-contact-dropdown"   dropdownStyle={{ minWidth: 260, maxHeight: 260 }}   size="large"   showSearch   optionFilterProp="label"   placement="bottomLeft"   popupMatchSelectWidth={false}   listHeight={240}   getPopupContainer={() => document.body}  />} 
        />
        {hasError && <div className="mt-1 text-sm text-red-500">{error}</div>}
      </div>
    </div>
  );
};

export default CommonPhoneInput;
