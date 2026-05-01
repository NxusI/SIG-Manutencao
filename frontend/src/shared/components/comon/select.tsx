"use client"

import Select, { StylesConfig } from "react-select";
import { OptionFormatted, SelectProps } from "@/shared/types/components.types";
import { useEffect, useState } from "react";

const customStyles: StylesConfig<OptionFormatted, false> = {
  menuPortal: (base) => ({
    ...base,
    zIndex: 9999,
    pointerEvents: "none" as const,
  }),
  menu: (provided) => ({
    ...provided,
    pointerEvents: "auto" as const,
    backgroundColor: "var(--background)",
    border: "1px solid var(--border)",
    borderRadius: "0.5rem",
    marginTop: "0.25rem",
  }),
  menuList: (base) => ({
    ...base,
    pointerEvents: "auto" as const,
  }),
  control: (provided, state) => ({
    ...provided,
    backgroundColor: "var(--background)",
    borderColor: state.isFocused ? "var(--ring)" : "var(--border)",
    color: "var(--foreground)",
    boxShadow: state.isFocused ? "0 0 0 1px var(--ring)" : "none",
    minHeight: "30px",
    "&:hover": {
      borderColor: "var(--ring)",
    },
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected
      ? "var(--primary)"
      : state.isFocused
      ? "var(--muted)"
      : "var(--popover)",
    color: state.isSelected ? "var(--primary-foreground)" : "var(--foreground)",
    cursor: "pointer",
    padding: "8px 12px",
  }),
  singleValue: (provided) => ({
    ...provided,
    color: "var(--foreground)",
  }),
  placeholder: (provided) => ({
    ...provided,
    color: "var(--muted-foreground)",
  }),
  input: (provided) => ({
    ...provided,
    color: "var(--foreground)",
  }),
};

export default function CustomSelect({
  label,
  options,
  onChange,
  value,
  disable,
  loading,
  className,
  onSearchInputChange,
}: SelectProps) {
  const [menuPortalTarget, setMenuPortalTarget] = useState<HTMLElement | null>(
    null
  );

  useEffect(() => {
    setMenuPortalTarget(document.body);
  }, []);

  return (
    <Select
      placeholder={label}
      isLoading={loading}
      isDisabled={disable}
      styles={customStyles}
      menuPortalTarget={menuPortalTarget ?? undefined}
      menuPosition="fixed"
      classNamePrefix="react-select"
      options={options}
      onChange={onChange}
      value={value}
      isClearable
      isSearchable
      className={className}
      onInputChange={(inputValue, { action }) => {
        if (action === "input-change" && onSearchInputChange) {
          onSearchInputChange(inputValue);
        }
      }}
    />
  );
}