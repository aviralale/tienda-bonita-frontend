import { ReactNode } from "react";
import Navbar from "./components/Dashboard/Navbar";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <main className="flex flex-col items-center justify-center">
        {children}
      </main>
    </>
  );
};

export default Layout;
