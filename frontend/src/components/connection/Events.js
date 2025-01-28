import React from "react";

export default function Events({events}) {
    return (
        <ul>
            {
                events.map((e, i) => {
                    <li key={i}>{e}</li>
                })
            }
        </ul>
    );
};