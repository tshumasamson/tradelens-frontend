import { useState } from "react";
import {
    Link,
    useNavigate
}
from "react-router-dom";

import { login } from "../services/authApi";



function Login() {

    const navigate = useNavigate();

    const [username, setUsername] =
        useState("");

    const [password, setPassword] =
        useState("");

    const [error, setError] =
        useState("");

    const [loading, setLoading] =
        useState(false);

    const handleSubmit =
        async (e) => {

            e.preventDefault();

            setError("");
            setLoading(true);

            try {

                const result =
                    await login(
                        username,
                        password
                    );

                if (result.ok && result.data.access) {

                    localStorage.setItem(
                        "access",
                        result.data.access
                    );

                    localStorage.setItem(
                        "refresh",
                        result.data.refresh
                    );

                    navigate("/onboarding");

                } else {

                    const detail =
                        result.data?.detail;

                    if (Array.isArray(detail)) {

                        setError(detail[0]);

                    } else if (detail) {

                        setError(detail);

                    } else {

                        setError(
                            "Invalid username or password."
                        );
                    }
                }

            }
            catch (err) {

                setError(
                    "Unable to connect to server."
                );

                console.error(err);

            }
            finally {

                setLoading(false);

            }
        };

    return (

        <div
            className="
            min-h-screen
            flex
            items-center
            justify-center
            bg-slate-950
            px-4
            "
        >

            <div
                className="
                w-full
                max-w-md
                bg-slate-900
                border
                border-slate-800
                rounded-xl
                p-8
                shadow-lg
                "
            >

                <h1
                    className="
                    text-3xl
                    font-bold
                    text-white
                    text-center
                    mb-2
                    "
                >
                    TradeLens
                </h1>

                <p
                    className="
                    text-slate-400
                    text-center
                    mb-8
                    "
                >
                    Sign in to continue
                </p>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-4"
                >

                    <div>

                        <label
                            className="
                            block
                            text-sm
                            text-slate-300
                            mb-2
                            "
                        >
                            Username
                        </label>

                        <input
                            type="text"
                            value={username}
                            onChange={(e) =>
                                setUsername(
                                    e.target.value
                                )
                            }
                            className="
                            w-full
                            px-4
                            py-3
                            rounded-lg
                            bg-slate-800
                            border
                            border-slate-700
                            text-white
                            focus:outline-none
                            focus:ring-2
                            focus:ring-blue-500
                            "
                            placeholder="Username"
                            required
                        />

                    </div>

                    <div>

                        <label
                            className="
                            block
                            text-sm
                            text-slate-300
                            mb-2
                            "
                        >
                            Password
                        </label>

                        <input
                            type="password"
                            value={password}
                            onChange={(e) =>
                                setPassword(
                                    e.target.value
                                )
                            }
                            className="
                            w-full
                            px-4
                            py-3
                            rounded-lg
                            bg-slate-800
                            border
                            border-slate-700
                            text-white
                            focus:outline-none
                            focus:ring-2
                            focus:ring-blue-500
                            "
                            placeholder="Password"
                            required
                        />

                    </div>

                    {error && (

                        <div
                            className="
                            bg-red-900/20
                            border
                            border-red-500
                            text-red-400
                            px-4
                            py-3
                            rounded-lg
                            "
                        >
                            {error}
                        </div>

                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="
                        w-full
                        bg-blue-600
                        hover:bg-blue-700
                        text-white
                        py-3
                        rounded-lg
                        font-semibold
                        transition
                        disabled:opacity-50
                        "
                    >

                        {loading
                            ? "Signing In..."
                            : "Login"}

                    </button>

                        <p
                            className="
                            text-slate-400
                            mt-4
                            "
                        >

                            Don't have an account?

                            <Link
                                to="/register"
                                className="
                                text-blue-400
                                ml-2
                                "
                            >
                                Register
                            </Link>
<div className="">

    <Link
        to="/forgot-password"
        className="
        text-sm
        text-blue-400
        hover:text-blue-300
        "
    >
        Forgot Password?
    </Link>

</div>

                        </p>

                </form>


                <div
                    className="
                    mt-8
                    pt-6
                    border-t
                    border-slate-800
                    text-center
                    "
                >

                    <p
                        className="
                        text-sm
                        text-slate-500
                        mb-3
                        "
                    >
                        Need help?
                    </p>

                    <div
                        className="
                        flex
                        flex-col
                        gap-2
                        "
                    >

                        <a
                            href="https://wa.me/263774773804"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="
                            text-green-400
                            hover:text-green-300
                            text-sm
                            transition
                            "
                        >
                            💬 WhatsApp Support
                        </a>

                        <a
                            href="mailto:info@sisam.co.zw"
                            className="
                            text-blue-400
                            hover:text-blue-300
                            text-sm
                            transition
                            "
                        >
                            ✉️ info@sisam.co.zw
                        </a>
                        <Link
                            to="/help/installation"
                            className="text-sm text-slate-400 hover:text-white"
                        >
                            Need help installing TradeLens?
                        </Link>
                    </div>

                </div>


            </div>

        </div>

    );
}

export default Login;