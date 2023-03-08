import React from 'react';
interface ButtonPros extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

function BaseButton({ children, ...props }: ButtonPros) {
  return <button {...props}>{children}</button>;
}

export { BaseButton };
