import React from 'react';
import {Link} from 'react-router-dom';
import {menuData} from "./NavMenu.data";
import {LinkSpan} from "./NavMenu.styled";
import {menuLogo} from "../../assets/svgs";

export const NavMenu: React.FC = () => (
    <div className="navWrapper">
        <div className="logoContainer">
            <a>{menuLogo}</a>
        </div>
        <nav className="navBar">
            {menuData.map((item, i) => (
                <Link key={i} to={item.link} className="nav-link">{item.icon}<LinkSpan>{item.name}</LinkSpan></Link>
            ))}
        </nav>
    </div>
);
