import style from "./Header.module.css"
import { Link, NavLink, Outlet } from "react-router-dom";
import clsx from "clsx";



export default function Header() {

    const NavLinkActiveClass = ({ isActive }) => {
  return clsx(style.link, isActive && style.active);
    };
    
    

    return (
        <>
            <header className={style.header}>
                <Link to="/" className={style.logo}>
                    <svg width="120" height="32">
                        <use href="/sprite.svg#icon-Logo-1" />
                    </svg>
                </Link>

                <nav className={style.nav}>
                    <NavLink to="/" className={NavLinkActiveClass}>
                        Home
                    </NavLink>
                    <NavLink to="/catalog" className={NavLinkActiveClass}>
                        Catalog
                    </NavLink>
                </nav>

            </header>
            <Outlet />
        </>
    )
}