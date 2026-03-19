import { ReactNode } from "react";

export function MainLayout({ children }: { children: ReactNode }) {
  return (
    <main className="shibuya-app">
      <div className="bg-decoration">
        <div className="bg-decoration-blob-1"></div>
        <div className="bg-decoration-blob-2"></div>
      </div>
      <div className="main-container">
        {children}
      </div>
    </main>
  );
}
