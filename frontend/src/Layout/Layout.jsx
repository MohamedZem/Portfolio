import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/Header/Header.jsx";
import Footer from "../components/Footer/Footer.jsx";

function Layout() {
  const location = useLocation();
  const isAboutPage = location.pathname === '/about';
  return (
    <div className="layout">
      <Header />
  
      <main className="layout__content">
        <Outlet />
      </main>

      <Footer className={isAboutPage ? 'footer--about' : ''} />
    </div>
  );
}

export default Layout;