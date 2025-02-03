import React from "react";
import { Link } from "react-router-dom";

import Burgermenu from "../layout/Burgermenu";

import bg from '../../media/images/bg.png';

export default function Menu() {
    return (
        <div>
            <img
                className="h-full w-full fixed top-0 object-cover -z-10"
                src={bg}
                alt="Gradient background"
            />

            <Burgermenu />

            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-10">
                <button className="menu-btn">Singleplayer</button>
                <Link className="menu-btn" to="/play">Multiplayer</Link>
                <Link className="menu-btn" to="/shop">Shop</Link>
                <Link className="mt-8 menu-btn" to="/settings">Settings</Link>
            </div>
        </div>
    );
};