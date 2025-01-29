import React, { useEffect } from "react";

export default function Settings({tab}) {
    useEffect(() => {
        const getProfileData = async () => {
            try {
                const res = await fetch('/profile', {
                    method: 'GET'
                })
                .then((res) => res.json);

                console.log(res.data)
            } catch (err) {
                console.error(err.error)
            };
        };

        if (tab === "profile") {
            
        }
    }, []);

    return (
        <div className="bg-bg">
            {tab = "profile" ? (
                <div></div>
            ) : tab = "stats" ? (
                <div></div>
            ) : (
                <div></div>
            )}
        </div>
    );
};