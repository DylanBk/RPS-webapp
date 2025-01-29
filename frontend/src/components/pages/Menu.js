import React from "react";

import Burgermenu from "../layout/Burgermenu";

import placeholder from '../../media/images/placeholder.png';

import bg from '../../media/images/bg.png';

export default function Menu() {
    return (
        <div>
            <img
                className="h-full w-full fixed object-cover"
                src={bg}
                alt="Gradient background"
            />

            <div
                className="h-36 w-1/3 relative left-1/2 top-20 -translate-x-1/2 flex flex-row justify-between rounded-full bg-black bg-opacity-50">
                    <img
                        className="border-2 border-black rounded-full"
                        src={placeholder}
                        alt="Player one avatar"
                    />

                    <p className="self-center text-5xl text-white">VS</p>

                    <img
                        className="border-2 border-black rounded-full"
                        src={placeholder}
                        alt="Player two avatar"
                    />
            </div>

            <Burgermenu />
        </div>
    );
};