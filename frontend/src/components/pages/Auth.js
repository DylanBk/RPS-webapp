import React, { useEffect, useState } from "react";

import Burgermenu from '../layout/Burgermenu';
import Signup from '../layout/Signup';
import Login from '../layout/Login';

import bg from '../../media/images/bg.png';

export default function Auth() {
    const [isLogin, setIsLogin] = useState(false);

    useEffect(() => {
        if (window.location.href.includes('login')) {
            setIsLogin(true);
        } else {
            setIsLogin(false);
        }
    }, []);

    const onFormChange = () => {
        if (isLogin) {
            setIsLogin(false);
        } else {
            setIsLogin(true);
        };
    };

    return (
        <div>
            <img
                className="h-full w-full fixed top-0 object-cover -z-10"
                src={bg}
                alt="Gradient background"
            />

            <Burgermenu />

            { isLogin ? (
                <Login changeForm={onFormChange} />
            ) : (
                <Signup changeForm={onFormChange} />
            )}
        </div>
    );
};