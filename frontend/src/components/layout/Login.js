import React, { useState } from "react";
import { Link } from "react-router-dom";

import hide from '../../media/icons/hide.svg';
import show from '../../media/icons/show.svg';

export default function Signup({changeForm}) {
    const [formData, setFormData] = useState({
        'email': '',
        'pw': ''
    });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const res = await fetch('/signup', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(formData)
        })
        .then((res) => res.json())

        if (res.message) {
            changeForm();
        } else {
            setError(res.error);
        };
    };

    const togglePw = (e) => {
        const btn = e.target;
        const el = e.target.previousSibling;

        if (el.type === 'text') {
            el.type = 'password';
            btn.src = show;
        } else {
            el.type = 'text';
            btn.src = hide;
        };
    };

    const handleKey = (e) => {
        if (e.keyCode === 13) {
            togglePw(e);
        }
    };

    return (
        <div>
            <form
                className="w-1/3 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-5 p-10 rounded-lg bg-carbon"
                onSubmit={handleSubmit}>
                    <input
                        name="email"
                        className="text-input"
                        type="email"
                        placeholder="Email"
                        onChange={handleChange}
                        required
                    />
                    <div className="flex flex-row items-center">
                        <input
                            name="pw"
                            className="w-full text-input"
                            type="password"
                            placeholder="Password"
                            onChange={handleChange}
                        />
                        <img
                            className="min-w-5 absolute right-12 glass-btn"
                            src={show}
                            alt="Show password icon"
                            tabIndex={0}
                            onClick={togglePw}
                            onKeyDown={handleKey}
                        />
                    </div>
                    <p className="text-center text-red-400">{error}</p>
                    <button
                        className="primary-btn sm:hover:px-20 sm:focus:px-20"
                        type="submit"
                        >
                        Sign In
                    </button>
                    <div className="text-center text-white">
                        <p>or</p>
                        <button
                            className="secondary-btn"
                            onClick={changeForm}>
                            Create Account
                        </button>
                    </div>
            </form>
        </div>
    );
};