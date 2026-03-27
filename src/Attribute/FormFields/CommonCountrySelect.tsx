import { useEffect, useRef, useState } from "react";
import type { CommonCountrySelectProps } from "../../Types";

export const CommonCountrySelect = ({
  name,
  label,
  placeholder,
  value,
  onChange,
  onBlur,
  error,
  touched,
}: CommonCountrySelectProps) => {
  const hasError = touched && !!error;
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  const resolvedValue = value && value.trim() ? value : "";
  const displayValue = resolvedValue || placeholder || "Select country";

  useEffect(() => {
    if (!open) return;
    const handleOutside = (event: MouseEvent) => {
      if (!wrapperRef.current) return;
      if (!wrapperRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, [open]);

  return (
    <div>
      <label className="mb-2 block text-sm text-[color:var(--color-text)]">{label}</label>
      <div>
        <div
          className={`delvoura-country-native ${open ? "is-open" : ""}`}
          ref={wrapperRef}
        >
          <button
            type="button"
            className="delvoura-country-trigger"
            onClick={() => setOpen((prev) => !prev)}
            onBlur={() => {
              onBlur?.({ target: { name } } as any);
            }}
            aria-haspopup="listbox"
            aria-expanded={open}
            name={name}
            style={{ borderColor: hasError ? "#ff4d4f" : undefined }}
          >
            <span className={resolvedValue ? "" : "is-placeholder"}>{displayValue}</span>
          </button>
          {open && (
            <ul className="delvoura-country-menu" role="listbox" aria-label={label}>
              <li
                role="option"
                aria-selected={resolvedValue === "India"}
                className="delvoura-country-option"
                onClick={() => {
                  onChange?.("India");
                  setOpen(false);
                }}
              >
                India
              </li>
            </ul>
          )}
        </div>
        {hasError && <div className="mt-1 text-sm text-red-500">{error}</div>}
      </div>
    </div>
  );
};

export default CommonCountrySelect;
