import { ReactNode } from "react";
import Navigation from "./Navigation";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-hero">
      <Navigation />
      <main className="pt-16">
        {children}
      </main>
    </div>
  );
}