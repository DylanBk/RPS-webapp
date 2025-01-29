import React from "react";

import placeholder from '../../media/images/placeholder.png';
import { socket } from "../../utils/socket";

const tempJson = {
    id: 123
}

export default function Roll({userData}) {

    const roll = (move) => {
        socket.emit('roll', {id: tempJson.id, move: move});
    };

    return (
        <div className="w-fit mx-auto mt-36 select-none">
            <img
                className="w-64 p-16 rounded-lg mx-auto bg-black-40"
                src={placeholder}
                alt="Chosen roll"
            />

            <div className="flex flex-row gap-14 mt-10">
                <div className="game-opt" onClick={() => roll('Rock')}>
                    <img
                        src={placeholder}
                        alt="Rock"
                    />
                </div>
                <div className="game-opt" onClick={() => roll('Paper')}>
                    <img
                        src={placeholder}
                        alt="Paper"
                    />
                </div>
                <div className="game-opt" onClick={() => roll('Scissors')}>
                    <img
                        src={placeholder}
                        alt="Scissors"
                    />
                </div>
            </div>
        </div>
    );
};