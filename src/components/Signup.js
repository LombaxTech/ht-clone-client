import React, { useState, useEffect } from "react";
import client from "../feathers";

export default function Signup() {
    const usersService = client.service("users");

    const [loggedIn, setLoggedIn] = useState(false);

    async function init() {
        try {
            console.log(await client.authenticate());
        } catch (err) {
            console.log(err);
            setLoggedIn(false);
        }
    }

    useEffect(() => {
        init();
    }, []);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const updateEmailValue = (e) => {
        setEmail(e.target.value);
    };

    const updatePasswordValue = (e) => {
        setPassword(e.target.value);
    };

    const signup = async (e) => {
        e.preventDefault();
        // console.log("attempted sign up");
        try {
            let user = await usersService.create({
                email,
                password,
            });

            console.log(user);
        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <div>
            <h1>Sign Up</h1>
            <form onSubmit={signup}>
                <label>Email: </label>
                <input type="text" value={email} onChange={updateEmailValue} />
                <label>Password: </label>
                <input
                    type="password"
                    value={password}
                    onChange={updatePasswordValue}
                />
                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
}
