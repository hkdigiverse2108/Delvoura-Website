import { Form, Input, Select } from "antd";
import type { CommonPhoneInputProps } from "../../Types";

export const CommonPhoneInput = ({ name, label, placeholder, value, onChange, onBlur, error, touched, countryValue, onCountryChange, countryOptions, }: CommonPhoneInputProps) => {
  const hasError = touched && !!error;

  return (
    <div>
      <label className="mb-2 block text-sm text-[color:var(--color-text)]">{label}</label>
      <Form.Item name={name} className="mb-0" validateStatus={hasError ? "error" : ""} help={hasError ? error : undefined}>
        <Input className="overflow-hidden" placeholder={placeholder} size="large" value={value} onChange={onChange} onBlur={onBlur} addonBefore={ <Select value={countryValue} onChange={onCountryChange} options={countryOptions} className="delvoura-contact-select min-w-[94px]" dropdownClassName="delvoura-contact-dropdown" size="large" getPopupContainer={() => document.body} /> } />
      </Form.Item>
    </div>
  );
};

export default CommonPhoneInput;
