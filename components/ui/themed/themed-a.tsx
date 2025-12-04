import React, { ReactNode } from 'react';

type TextType = 'primary' | 'secondary' | 'highlight';

type ThemedTextProps = {
  children: ReactNode;
  type?: TextType;
  href?: string;
  className?: string;
};

export default function ThemedA({
  children,
  type = 'primary',
  href = '',
  className = '',
}: ThemedTextProps) {
  return (
    <a
        href={href}
        className={`${className} ${
            type === 'primary'
            ? 'text-blue-950 dark:text-white'
            : type === 'secondary'
            ? 'text-blue-800 dark:text-blue-600'
            : ''}
        `}
    >
      {children}
    </a>
  );
}
