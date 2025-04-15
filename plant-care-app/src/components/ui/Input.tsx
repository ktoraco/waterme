import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const Input: React.FC<InputProps> = ({ label, ...props }) => {
  return (
    <div className="flex flex-col">
      <label className="mb-1 text-sm font-medium text-deep-700">{label}</label>
      <input
        className="p-2 border border-stone-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
        {...props}
      />
    </div>
  );
};

export default Input;