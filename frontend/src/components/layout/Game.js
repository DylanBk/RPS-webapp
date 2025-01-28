import React, { useEffect, useState } from "react";

import { socket } from '../../utils/socket';
import Temp from "./Temp";
import ConnState from "../connection/ConnState";
import ConnManager from "../connection/ConnManager";
import Events from "../connection/Events";

export default function Game() {
    const [isConnected, setIsConnected] = useState(socket.connected);
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const onConnect = () => {
            setIsConnected(true);
        };

        const onDisconnect = () => {
            setIsConnected(false);
        };

        const onEvent = (v) => {
            setEvents(v);
        };

        socket.on('connect', onConnect);
        socket.on('disconnect', onDisconnect);
        socket.on('event', onEvent);

        return () => {
            socket.off('event', onEvent);
        };
    }, []);

    return (
        <div>
            <ConnState isConnected={isConnected} />
            <Events events={events} />
            <ConnManager />
            <Temp />
        </div>
    );
};