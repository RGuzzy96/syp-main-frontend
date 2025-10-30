import React, { ReactNode } from 'react';

type TextType = 'primary' | 'secondary' | 'highlight';

type ThemedTextProps = {
  children: ReactNode;
  type?: TextType;
  className?: string;
  style?: any;
};

export default function ThemedText({
  children,
  type = 'primary',
  className = '',
  style = {}
}: ThemedTextProps) {
  return (
    <p
      style={style}
      className={`${className} ${
        type === 'primary'
          ? 'text-neutral-950'
          : type === 'secondary'
          ? ''
          : ''}
      `}
    >
      {children}
    </p>
  );
}
