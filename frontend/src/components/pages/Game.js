import React, { useEffect, useState } from "react";

import { socket } from "../../utils/socket";

import Burgermenu from "../layout/Burgermenu";
import GameBanner from "../layout/GameBanner";
import Roll from "../layout/Roll";

import bg from '../../media/images/bg.png';

export default function Game () {
    const [userData, setUserData] = useState({})
    const [message, setMessage] = useState()

    useEffect(() => {
        const getUserData = async () => {
            try {
                if (document.cookie.split(";").some((item) => item.trim().startsWith("loggedIn=true"))) {
                    const res = await fetch('/user/data', {
                        method: 'GET'
                    })
                    .then((res) => res.json())
                    setUserData(res.data);
                    console.log(res.data)
                };
            } catch (err) {
                console.error(err)
            };
        };

        socket.on('connect', (message) => {
            console.log(`data fetched from server: ${message}`)
        });

        socket.on('message', (data) => {
            console.log(`message from server: ${data}`)
        });

        return () => {
            socket.off('message');
        };
    }, []);

    return (
        <div>
            <img
                className="h-full w-full fixed top-0 object-cover -z-10"
                src={bg}
                alt="Gradient background"
            />

            <Burgermenu />

            <GameBanner />
            <Roll userData={userData} />
        </div>
    );
};