import React from "react";
import { Link, useLocation } from "react-router-dom";
import { ROUTES } from "../../routes/constants";

const Header = () => {
    const location = useLocation();

    const getLinkStyle = (path: string): string => {
        return location.pathname === path
            ? "text-black border-b-2 border-amber-400 px-3 py-2"
            : "text-black no-underline px-3 py-2";
    };

    return (
        <nav className="flex justify-between items-center m-0 p-0 bg-white border-b border-gray-300">
            <Link to={ROUTES.HOME} className="ml-4 mr-6">
                <img src="/BSM.png" alt="Logo" className="h-14 align-middle" />
            </Link>
            <ul className="flex justify-end space-x-4 flex-1">
                <li>
                    <Link to={ROUTES.HOME} className={getLinkStyle(ROUTES.HOME)}>HOME</Link>
                </li>
                <li>
                    <Link to={ROUTES.POPULAR} className={getLinkStyle(ROUTES.POPULAR)}>POPULAR</Link>
                </li>
                <li>
                    <Link to={ROUTES.RATED} className={getLinkStyle(ROUTES.RATED)}>TOP RATED</Link>
                </li>
                <li>
                    <Link to={ROUTES.PLAYING} className={getLinkStyle(ROUTES.PLAYING)}>NOW PLAYING</Link>
                </li>
                <li>
                    <Link to={ROUTES.FAVORITE} className={getLinkStyle(ROUTES.FAVORITE)}>MY FAVORITES</Link>
                </li>
            </ul>
        </nav>
    );
};

export default Header;
