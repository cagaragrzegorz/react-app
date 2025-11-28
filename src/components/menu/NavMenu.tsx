import React, {cloneElement, useEffect} from 'react';
import {Link, useLocation} from 'react-router-dom';
import {menuData} from "./NavMenu.data";
import {LinkSpan} from "./NavMenu.styled";
import {menuLogo} from "../../assets/svgs";
import {MenuIcon} from "lucide-react";

export const NavMenu: React.FC = () => {
    const location = useLocation();

    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    const toggleMenu = () => { setIsMenuOpen(!isMenuOpen); };

    const isActiveLink = (link: string): boolean => {
        return link === `/${location.pathname.split('/').slice(-1)[0]}`
    }

    return (
        <div>
            <div className={isMenuOpen ? 'navWrapperVisible': 'navWrapper'} >
                <div className="logoContainer">
                    <a>{menuLogo}</a>
                </div>
                <nav className="navBar">
                    {menuData.map((item, i) => (
                        <Link key={i} to={item.link} onClick={() => setIsMenuOpen(false)}
                              className={isActiveLink(item.link) ? "nav-link active" : "nav-link"}>{
                            React.cloneElement(item.icon, {
                                color: isActiveLink(item.link) ? '#000' : '#777',
                            })}<LinkSpan>{item.name}</LinkSpan></Link>
                    ))}
                </nav>
            </div>
            <div className="burger-icon-wrapper">
                <button onClick={toggleMenu} className="nav-link"><MenuIcon color='black'/></button>
            </div>
        </div>
    );
}
