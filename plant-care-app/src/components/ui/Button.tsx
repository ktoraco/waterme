import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
}

const Button: React.FC<ButtonProps> = ({ variant = 'primary', children, ...props }) => {
  const baseStyles = 'px-4 py-2 rounded focus:outline-none focus:ring';
  const variantStyles = variant === 'primary' 
    ? 'bg-teal-500 text-white hover:bg-teal-600 font-medium' 
    : 'bg-stone-100 text-black hover:bg-stone-200 text-deep-600 font-medium';

  return (
    <button className={`${baseStyles} ${variantStyles}`} {...props}>
      {children}
    </button>
  );
};

export default Button;