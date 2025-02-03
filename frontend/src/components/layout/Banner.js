import React, { useEffect, useState } from "react";

import placeholder from '../../media/images/placeholder.png'


export default function Banner({userData}) {
    let [time, setTime] = useState(60);

    // useEffect(() => {
    //     let c = 60;
    //     const timer = setInterval(() => {
    //         c--;
    //         setTime(c);
    //         console.log(c)
    //         if (c === 0) {
    //             clearInterval(timer);
    //         };
    //     }, 1000);

    //     return () => clearInterval(timer);
    // });

    return (
        <div
            className="h-36 w-3/5 xl:w-1/2 flex flex-row justify-between rounded-full mx-auto mt-10 bg-black bg-opacity-50 select-none">
            <div className="flex flex-col">
                <img
                className="h-36 w-36 border-2 border-black rounded-full"
                src={placeholder}
                alt="Player one avatar"
                />
                <p className="text-2xl text-center">player 1</p>
            </div>

            <div className="flex flex-col items-center justify-center">
                <p className="text-5xl text-white">VS</p>
                <p className="text-2xl">{time}</p>
            </div>

            <div>
                <img
                    className="h-36 w-36 border-2 border-black rounded-full"
                    src={placeholder}
                    alt="Player two avatar"
                />
                <p className="text-2xl text-center">player 2</p>
            </div>
        </div>
    );
};