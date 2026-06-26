import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/Header/Header.jsx";
import Footer from "../components/Footer/Footer.jsx";

function Layout() {
  
  return (
    <div className="layout">
      <Header />
  
      <div className="layout__content">
        <Outlet />
      </div>

      <Footer />
    </div>
  );
}

export default Layout;