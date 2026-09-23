import { useEffect, useState } from "react";

import {
    getCurrentUser
} from "../services/authApi";

import {
    logout
} from "../services/tokenService";

import AccountSelector
    from "../components/AccountSelector";


function Header() {

    const [user, setUser] =
        useState(null);


    useEffect(() => {

        const loadUser = async () => {

            try {

                const data =
                    await getCurrentUser();

                setUser(data);

            } catch {

                setUser(null);

            }

        };

        loadUser();

    }, []);


    const handleLogout = () => {

        logout();

        window.location.href =
            "/login";

    };


    /*
     * Capitalise username
     */
    const displayUsername =
        user?.username
            ? user.username.charAt(0).toUpperCase()
              + user.username.slice(1)
            : "";


    /*
     * First letter for user badge
     */
    const userInitial =
        displayUsername
            ? displayUsername.charAt(0).toUpperCase()
            : "U";


    return (

        <header
            className="
                h-14
                bg-slate-950
                border-b
                border-slate-800
                flex
                items-center
                justify-end
                px-6
            "
        >

            <div
                className="
                    flex
                    items-center
                    gap-3
                "
            >

                {/* Account Selector */}
                <AccountSelector />


                {/* Divider */}
                <div
                    className="
                        h-6
                        w-px
                        bg-slate-800
                    "
                />


                {/* User */}
                <div
                    className="
                        flex
                        items-center
                        gap-2
                    "
                >

                    {/* User Initial */}
                    <div
                        className="
                            w-8
                            h-8
                            rounded-full
                            bg-slate-800
                            border
                            border-slate-700
                            flex
                            items-center
                            justify-center
                            text-slate-300
                            text-xs
                            font-semibold
                        "
                    >
                        {userInitial}
                    </div>


                    {/* Username */}
                    <span
                        className="
                            text-slate-200
                            text-sm
                            font-medium
                        "
                    >
                        {displayUsername}
                    </span>

                </div>


                {/* Logout */}
                <button
                    onClick={handleLogout}
                    className="
                        px-3
                        py-1.5
                        rounded-lg
                        border
                        border-slate-700
                        bg-slate-900
                        hover:bg-red-600
                        hover:border-red-600
                        text-slate-300
                        hover:text-white
                        text-xs
                        font-medium
                        transition
                    "
                >
                    Logout
                </button>

            </div>

        </header>

    );
}


export default Header;