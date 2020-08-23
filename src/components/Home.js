import React, { useState, useEffect } from "react";
import client from "../feathers";
import { Link } from "react-router-dom";

import AllUsers from "./AllUsers";

export default function Home() {
    const [loggedIn, setLoggedIn] = useState(false);
    const [user, setUser] = useState({});

    async function init() {
        try {
            let result = await client.authenticate();
            setUser(result.user);
            setLoggedIn(true);
        } catch (err) {
            console.log(err);
            setLoggedIn(false);
        }
    }

    useEffect(() => {
        init();
    }, []);

    return (
        <div>
            <h1>Home</h1>
            <AllUsers />
        </div>
    );
}
