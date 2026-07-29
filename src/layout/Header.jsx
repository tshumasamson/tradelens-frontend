import { useEffect, useState }
from "react";

import {
    getCurrentUser
}
from "../services/authApi";

import {
    logout
}
from "../services/tokenService";

import AccountSelector
from "../components/AccountSelector";

function Header() {

    const [user, setUser] =
        useState(null);

    useEffect(() => {

        const loadUser =
            async () => {

                try {

                    const data =
                        await getCurrentUser();

                    setUser(data);

                }
                catch {

                    setUser(null);

                }
            };

        loadUser();

    }, []);

    const handleLogout =
        () => {

            logout();

            window.location.href =
                "/login";
        };

    return (

        <header
            className="
            h-20
            border-b
            border-slate-800
            bg-slate-950
            flex
            items-center
            justify-between
            px-8
            "
        >

            <div>

                <h2
                    className="
                    text-white
                    text-2xl
                    font-semibold
                    "
                >
                    TradeLens
                </h2>

            </div>

            <div
                className="
                flex
                items-center
                gap-4
                "
            >

                <AccountSelector />

                <div
                    className="
                    text-white
                    "
                >
                    👤 {user?.username}
                </div>

                <button
                    onClick={handleLogout}
                    className="
                    px-3
                    py-2
                    bg-red-600
                    text-white
                    rounded
                    "
                >
                    Logout
                </button>

            </div>

        </header>

    );
}

export default Header;