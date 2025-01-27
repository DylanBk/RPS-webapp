import React from "react";

import handleBurgermenu from "../../utils/handleBurgermenu";

export default function Burgermenu() {
    return (
        <div>
            <div
                id="burgermenu"
                className="h-fit w-fit absolute top-16 right-20 flex flex-col gap-4 cursor-pointer z-10 transition-all duration-300"
                onClick={handleBurgermenu}>
                <div className="h-2 w-20 rounded-lg bg-white transition-all duration-300" />
                <div className="h-2 w-20 rounded-lg bg-white transition-all duration-300" />
                <div className="h-2 w-20 rounded-lg bg-white transition-all duration-300" />
            </div>

            <div
                id="menu"
                className="h-full w-96 absolute top-0 right-0 hidden bg-black text-white">
            </div>
        </div>
    );
};