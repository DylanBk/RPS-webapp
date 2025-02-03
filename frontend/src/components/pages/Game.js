import React, { useEffect, useState } from "react";

import { socket } from "../../utils/socket";

import Burgermenu from "../layout/Burgermenu";
import Banner from "../layout/Banner";
import Roll from "../layout/Roll";

import bg from '../../media/images/bg.png';
import rock from '../../media/icons/rock.svg';
import paper from '../../media/icons/paper.svg';
import scissors from '../../media/icons/scissors.svg';

export default function Game () {
    const [userData, setUserData] = useState({});
    let [room, setRoom] = useState('queue');
    const [gameLoaded, setGameLoaded] = useState(false);

    useEffect(() => {
        const getUserData = async () => {
            try {
                if (document.cookie.split(";").some((item) => item.trim().startsWith("loggedIn=true"))) {
                    const res = await fetch('/user/data/safe', {
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
        // getUserData();

        socket.on('connect', () => {
            console.log('connected to server')
        });

        socket.on('joining_room', (data) => {
            if (data.room === "queue") {
                //do nothing
            } else if (data.room === "server") {
                setGameLoaded(true);
            } else {
                console.error('no room returned')
            };
        });

        if (!socket.connected) {
            socket.connect();
        };
    }, []);

    window.onbeforeunload = () => {
        return "Warning: If you leave this page you will lose your connection to the server.";
    };

    return (
        <div>
            <img
                className="h-full w-full fixed top-0 object-cover -z-10"
                src={bg}
                alt="Gradient background"
            />

            <Burgermenu />

            { room === "queue" ? (
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-5">
                    <p className="text-4xl text-white">Queuing for match</p>
                    <p  className="text-2xl text-white">Waiting for players (1/2)</p>

                    <div className="flex flex-row gap-6 mt-5 loader">
                        <div className="p-2 rounded-full bg-black-40">
                            <img
                                className="h-8 w-8"
                                src={rock}
                                alt="Rock loading icon"
                            />
                        </div>
                        <div className="p-2 rounded-full bg-black-40">
                            <img
                                className="h-8 w-8"
                                src={paper}
                                alt="Paper loading icon"
                            />
                        </div>
                        <div className="p-2 rounded-full bg-black-40">
                            <img
                                className="h-8 w-8"
                                src={scissors}
                                alt="Scissors loading icon"
                            />
                        </div>
                    </div>
                </div>
            ) : (
                gameLoaded ? (
                    <>
                        <Banner userData={userData} />
                        <Roll userData={userData} />
                    </>
                ) : (
                    <p className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-4xl text-white">Connecting to Server</p>
                )
            )}
        </div>
    );
};