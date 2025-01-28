import React, { useState } from "react";
import { socket } from "../../utils/socket";

export default function Temp() {
    const [v, setV] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = (e) => {
        console.log('form submitted')
        e.preventDefault()

        setIsLoading(true);

        socket.timeout(5000).emit('create-something', v, () => {
            setIsLoading(false);
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" onChange={e => setV(e.target.value)} />
            <button type="submit" disabled={isLoading}>submit</button>
        </form>
    );
};