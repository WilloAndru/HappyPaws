import Footer from "../components/Footer";
import Header from "../components/Header";
import { Outlet } from "react-router-dom";

function MainLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow pt-40 p-16">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default MainLayout;
