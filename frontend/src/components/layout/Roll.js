import React from "react";

import { socket } from "../../utils/socket";

import placeholder from '../../media/images/placeholder.png';
import rock from '../../media/icons/rock.svg';
import paper from '../../media/icons/paper.svg';
import scissors from '../../media/icons/scissors.svg';

const tempJson = {
    id: 123
}

export default function Roll({userData}) {
    const roll = (move) => {
        // socket.emit('move', {s_id:tempJson.id, p_id: tempJson.id, move: move}); //TODO: replace s_id and p_id with actual values, p_id from userData, ? s_id from roomData ?
    };

    return (
        <div className="w-fit mx-auto mt-20 2xl:mt-24 select-none">
            <img
                className="w-64 p-16 rounded-lg mx-auto bg-black-40"
                src={placeholder}
                alt="Chosen roll"
            />

            <div className="flex flex-row gap-14 mt-10">
                <div className="game-opt" onClick={() => roll('Rock')}>
                    <img
                        src={rock}
                        alt="Rock"
                    />
                </div>
                <div className="game-opt" onClick={() => roll('Paper')}>
                    <img
                        src={paper}
                        alt="Paper"
                    />
                </div>
                <div className="game-opt" onClick={() => roll('Scissors')}>
                    <img
                        src={scissors}
                        alt="Scissors"
                    />
                </div>
            </div>
        </div>
    );
};