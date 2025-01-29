import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import handleBurgermenu from "../../utils/handleBurgermenu";

export default function Burgermenu() {
    // useEffect(() => { //TODO: allow menu to be closed with esc key
    //     if (document.getElementById('menu') && document.getElementById('menu').style.display === 'flex')
    //     window.addEventListener('keydown', (e) => {
    //         if (e.key === 'Escape') {
    //             window.alert('esc')
    //             handleBurgermenu()
    //         };
    //     });
    // }, []);

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
                    <ul className="flex flex-col gap-10 ml-5 mt-24">
                        <Link
                            className="group flex flex-row gap-1 text-3xl text-white"
                            to="/">
                            <svg className="w-8 fill-white group-hover:fill-primaryBlue transition-colors duration-200" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M240-200h120v-240h240v240h120v-360L480-740 240-560v360Zm-80 80v-480l320-240 320 240v480H520v-240h-80v240H160Zm320-350Z"/></svg>
                            <p className="group-hover:text-primaryBlue transition-colors duration-200">Home</p>
                        </Link>
                        <Link
                            className="group flex flex-row gap-1 text-3xl text-white"
                            to="/">
                            <svg className="w-8 fill-white group-hover:fill-primaryBlue transition-colors duration-200" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M841-518v318q0 33-23.5 56.5T761-120H201q-33 0-56.5-23.5T121-200v-318q-23-21-35.5-54t-.5-72l42-136q8-26 28.5-43t47.5-17h556q27 0 47 16.5t29 43.5l42 136q12 39-.5 71T841-518Zm-272-42q27 0 41-18.5t11-41.5l-22-140h-78v148q0 21 14 36.5t34 15.5Zm-180 0q23 0 37.5-15.5T441-612v-148h-78l-22 140q-4 24 10.5 42t37.5 18Zm-178 0q18 0 31.5-13t16.5-33l22-154h-78l-40 134q-6 20 6.5 43t41.5 23Zm540 0q29 0 42-23t6-43l-42-134h-76l22 154q3 20 16.5 33t31.5 13ZM201-200h560v-282q-5 2-6.5 2H751q-27 0-47.5-9T663-518q-18 18-41 28t-49 10q-27 0-50.5-10T481-518q-17 18-39.5 28T393-480q-29 0-52.5-10T299-518q-21 21-41.5 29.5T211-480h-4.5q-2.5 0-5.5-2v282Zm560 0H201h560Z"/></svg>
                            <p className="group-hover:text-primaryBlue transition-colors duration-200">Shop</p>
                        </Link>
                        <Link
                            className="group flex flex-row gap-1 text-3xl text-white"
                            to="/">
                            <svg className="w-8 fill-white group-hover:fill-primaryBlue transition-colors duration-200" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Zm80-80h480v-32q0-11-5.5-20T700-306q-54-27-109-40.5T480-360q-56 0-111 13.5T260-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T560-640q0-33-23.5-56.5T480-720q-33 0-56.5 23.5T400-640q0 33 23.5 56.5T480-560Zm0-80Zm0 400Z"/></svg>
                            <p className="group-hover:text-primaryBlue transition-colors duration-200">Profile</p>
                        </Link>
                        <Link
                            className="group flex flex-row gap-1 text-3xl text-white"
                            to="/">
                            <svg className="w-8 fill-white group-hover:fill-primaryBlue transition-colors duration-200" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="m140-220-60-60 300-300 160 160 284-320 56 56-340 384-160-160-240 240Z"/></svg>
                            <p className="group-hover:text-primaryBlue transition-colors duration-200">Stats</p>
                        </Link>
                        <Link
                            className="group flex flex-row gap-1 text-3xl text-white"
                            to="/">
                            <svg className="w-8 fill-white group-hover:fill-primaryBlue transition-colors duration-200" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="m370-80-16-128q-13-5-24.5-12T307-235l-119 50L78-375l103-78q-1-7-1-13.5v-27q0-6.5 1-13.5L78-585l110-190 119 50q11-8 23-15t24-12l16-128h220l16 128q13 5 24.5 12t22.5 15l119-50 110 190-103 78q1 7 1 13.5v27q0 6.5-2 13.5l103 78-110 190-118-50q-11 8-23 15t-24 12L590-80H370Zm70-80h79l14-106q31-8 57.5-23.5T639-327l99 41 39-68-86-65q5-14 7-29.5t2-31.5q0-16-2-31.5t-7-29.5l86-65-39-68-99 42q-22-23-48.5-38.5T533-694l-13-106h-79l-14 106q-31 8-57.5 23.5T321-633l-99-41-39 68 86 64q-5 15-7 30t-2 32q0 16 2 31t7 30l-86 65 39 68 99-42q22 23 48.5 38.5T427-266l13 106Zm42-180q58 0 99-41t41-99q0-58-41-99t-99-41q-59 0-99.5 41T342-480q0 58 40.5 99t99.5 41Zm-2-140Z"/></svg>
                            <p className="group-hover:text-primaryBlue transition-colors duration-200">Settings</p>
                        </Link>
                    </ul>
            </div>
        </div>
    );
};