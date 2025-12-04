import React, { ReactNode } from 'react';

type TextType = 'primary' | 'secondary' | 'highlight';

type ThemedTextProps = {
  children: ReactNode;
  type?: TextType;
  className?: string;
  style?: any;
  onClick?: () => void;
};

export default function ThemedText({
  children,
  type = 'primary',
  className = '',
  style = {},
  onClick = () => {}
}: ThemedTextProps) {
  return (
    <p
      style={style}
      onClick={onClick}
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
