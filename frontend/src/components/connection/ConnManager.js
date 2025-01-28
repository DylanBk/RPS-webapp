import React from "react";
import { socket } from "../../utils/socket";

export default function ConnManager() {
    const connect = () => {
        console.log('socket connected')
        socket.connect();
    };

    const disconnect = () => {
        console.log('socket disconnected')
        socket.disconnect();
    };

    return (
        <>
            <button onClick={connect}>Connect</button>
            <button onClick={disconnect}>Disconnect</button>
        </>
    );
};