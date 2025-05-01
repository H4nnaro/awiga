import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { memo, ReactNode } from "react";

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = memo(function MainLayout({ children }: MainLayoutProps) {
  return (
    <>
      <Navbar />
      <div>{children}</div>
      <Footer />
    </>
  );
});

export default MainLayout;
