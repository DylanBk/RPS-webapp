import React from "react";

import placeholder from '../../media/images/placeholder.png'

export default function GameBanner() {
    return (
        <div
            className="h-36 w-1/3 flex flex-row justify-between rounded-full mx-auto mt-10 bg-black bg-opacity-50 select-none">
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
    );
};