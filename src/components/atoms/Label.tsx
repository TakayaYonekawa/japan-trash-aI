import { ReactNode } from "react";

export function Label({ children, icon }: { children: ReactNode; icon?: ReactNode }) {
  return (
    <label>
      {icon}
      {children}
    </label>
  );
}
