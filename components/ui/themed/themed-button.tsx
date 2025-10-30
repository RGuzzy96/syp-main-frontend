import React, { ReactNode } from 'react';

type ButtonType = 'primary' | 'secondary' | 'primary-dark' | 'delete';

type ThemedButtonProps = {
  children: ReactNode;
  type?: ButtonType;
  fullWidth?: boolean;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  size?: 'default' | 'small' | 'large'
};

export default function ThemedButton({
  children,
  type = 'primary',
  fullWidth = false,
  onClick,
  className = '',
  disabled = false,
  size = 'default'
}: ThemedButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${className} ${size == 'default' ? 'px-3.5 py-2' : size == 'large' ? 'px-5 py-4' : ''} ${fullWidth && 'w-full'} ${disabled ? 'opacity-50' : ''} 
      ${type === 'primary' ? 'bg-white hover:opacity-70 text-black border' :
        type === 'primary-dark' ? 'bg-blue-950 hover:bg-blue-900 border border-blue-800 text-white' : 
        type === 'secondary' ? 'bg-neutral-950 border-neutral-800 border hover:opacity-70 text-white' : 
        type === 'delete' ? 'bg-red-700 border-red-600 hover:opacity-70 text-white' :
        ''}
        flex items-center justify-center font-medium shadow-sm transform duration-300 rounded-md cursor-pointer
      `}
      
    >
      {children}
    </button>
  );
}