import { NavLink } from 'react-router-dom'
import logo from '../../assets/Logo-MZ.png'


function Header() {
  return (

    <header className="header">
  <div className="header__content">
    <NavLink to="/">
        <img className="header__logo" src={logo} alt="Logo" />
        <h1 hidden>Portfolio Zemouchi Mohamed</h1>
    </NavLink>

    <nav className="header__nav">
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive ? "header__link active" : "header__link"
        }
      >
        Accueil
      </NavLink>

      <NavLink
        to="/about"
        className={({ isActive }) =>
          isActive ? "header__link active" : "header__link"
        }
      >
        À propos
      </NavLink>

      <NavLink
        to="/projects"
        className={({ isActive }) =>
          isActive ? "header__link active" : "header__link"
        }
      >
        Projets
      </NavLink>

      <NavLink
        to="/contact"
        className={({ isActive }) =>
          isActive ? "header__link active" : "header__link"
        }
      >
        Contact
      </NavLink>
    </nav>
  </div>
</header>
  )
}

export default Header
