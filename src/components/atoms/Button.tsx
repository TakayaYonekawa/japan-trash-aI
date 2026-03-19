import { ReactNode, ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  icon?: ReactNode;
}

export function Button({ children, icon, ...props }: ButtonProps) {
  return (
    <button className="submit-btn" {...props}>
      {icon}
      {children}
    </button>
  );
}
