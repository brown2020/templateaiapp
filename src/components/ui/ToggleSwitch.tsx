"use client";

import React from "react";

interface ToggleSwitchProps {
  id: string;
  checked: boolean;
  onChange: () => void;
  disabled?: boolean;
  label?: string;
}

export function ToggleSwitch({
  id,
  checked,
  onChange,
  disabled = false,
  label,
}: ToggleSwitchProps) {
  return (
    <label
      htmlFor={id}
      className="relative inline-flex items-center cursor-pointer"
      aria-label={label}
    >
      <input
        id={id}
        name={id}
        type="checkbox"
        className="sr-only peer"
        checked={checked}
        onChange={onChange}
        disabled={disabled}
      />
      <div
        className={`w-11 h-6 rounded-full transition-colors peer-focus:outline-none
          peer-focus:ring-4 peer-focus:ring-blue-300
          ${checked ? "bg-blue-600" : "bg-gray-200"}
          peer-disabled:opacity-50 peer-disabled:cursor-not-allowed
        `}
      ></div>
      {/* Slider Knob styling */}
      <div
        className={`absolute left-1 top-1 h-5 w-5 bg-white border border-gray-300
          rounded-full transition-all 
          ${checked ? "translate-x-full border-white" : ""}
        `}
      />
    </label>
  );
}
