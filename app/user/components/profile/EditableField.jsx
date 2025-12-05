// components/EditableField.jsx
'use client';
import { useState } from 'react';

export const EditableField = ({ label, value, onChange, readOnly }) => {
  const [localValue, setLocalValue] = useState(value || '');

  const handleChange = (e) => {
    const newValue = e.target.value;
    console.log(`EditableField "${label}": "${newValue}"`);
    setLocalValue(newValue);
    onChange(newValue);
  };

  const handleClear = () => {
    console.log(`EditableField "${label}": CLEARED`);
    setLocalValue('');
    onChange('');
  };

  if (readOnly) {
    return (
      <div className="p-4 bg-gray-50 rounded-lg">
        <label className="block text-sm font-semibold text-gray-700 mb-2">{label}</label>
        <p className="text-gray-800">{value || <span className="text-gray-400 italic">Empty</span>}</p>
      </div>
    );
  }

  return (
    <div className="p-4 bg-white border rounded-lg">
      <div className="flex justify-between items-center mb-2">
        <label className="block text-sm font-semibold text-gray-700">{label}</label>
        <button
          type="button"
          onClick={handleClear}
          className="text-sm text-red-500 hover:text-red-700"
        >
          Clear
        </button>
      </div>
      <input
        type="text"
        value={localValue}
        onChange={handleChange}
        className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
        placeholder={`Enter ${label.toLowerCase()}...`}
      />
      <div className="mt-1 text-xs text-gray-500">
        Current: "{value}" | Length: {value?.length || 0}
      </div>
    </div>
  );
};