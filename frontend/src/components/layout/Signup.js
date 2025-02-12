import React, { useState } from "react";

import hide from '../../media/icons/hide.svg';
import show from '../../media/icons/show.svg';

export default function Signup({onFormChange}) {
    const [formData, setFormData] = useState({
        'username': '',
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

        if (document.getElementsByName('confirm-pw')[0].value !== formData['pw']) {
            setError("Passwords must match")
            return;
        };

        const res = await fetch('/signup', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(formData)
        })
        .then((res) => res.json())

        if (res.message) {
            onFormChange();
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
            togglePw(e)
        }
    };

    return (
        <div>
            <form
                className="w-1/3 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-5 p-10 rounded-lg bg-carbon"
                onSubmit={handleSubmit}>
                    <input
                        name="username"
                        className="text-input"
                        type="text"
                        placeholder="Username"
                        onChange={handleChange}
                        required
                    />
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
                            className="min-w-5 absolute right-12 p-1 rounded-full hover:bg-white hover:bg-opacity-10 cursor-pointer"
                            src={show}
                            alt="Show password icon"
                            tabIndex={0}
                            onClick={togglePw}
                            onKeyDown={handleKey}
                        />
                    </div>
                    <div className="flex flex-row items-center">
                        <input
                            name="confirm-pw"
                            className="w-full text-input"
                            type="password"
                            placeholder="Confirm Password"
                            required
                        />
                        <img
                            className="min-w-5 absolute right-12 p-1 rounded-full hover:bg-white hover:bg-opacity-10 cursor-pointer"
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
                        type="submit">
                        Sign Up
                    </button>
            </form>
        </div>
    );
};