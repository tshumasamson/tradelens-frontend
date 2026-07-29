import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { register } from "../services/authApi";

function Register() {

    const navigate =
        useNavigate();

    const [error, setError] =
        useState("");

    const [formData, setFormData] =
        useState({

            username: "",
            email: "",
            country: "",
            password: "",
            confirmPassword: ""

        });

    const handleSubmit =
        async (e) => {

            e.preventDefault();

            if (
                formData.password !==
                formData.confirmPassword
            ) {

                setError(
                    "Passwords do not match"
                );

                return;
            }

            const result =
                await register({

                    username:
                        formData.username,

                    email:
                        formData.email,

                    country:
                        formData.country,

                    password:
                        formData.password

                });

            if (result.id) {

                navigate(
                    "/login"
                );

                return;
            }

            setError(

                Object.values(result)
                    .flat()
                    .join(", ")

            );

        };

    return (

        <div
            className="
            min-h-screen
            flex
            items-center
            justify-center
            bg-slate-950
            "
        >

            <form

                onSubmit={
                    handleSubmit
                }

                className="
                bg-slate-900
                border
                border-slate-800
                rounded-2xl
                p-8
                w-full
                max-w-md
                space-y-4
                "
            >

                <h1
                    className="
                    text-3xl
                    font-bold
                    text-white
                    "
                >
                    Create TradeLens Account
                </h1>

                <input
                    placeholder="Username"
                    value={formData.username}
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            username:
                                e.target.value
                        })
                    }
                    className="
                    w-full
                    p-3
                    rounded-lg
                    bg-slate-800
                    text-white
                    "
                />

                <input
                    type="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            email:
                                e.target.value
                        })
                    }
                    className="
                    w-full
                    p-3
                    rounded-lg
                    bg-slate-800
                    text-white
                    "
                />

                <input
                    placeholder="Country"
                    value={formData.country}
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            country:
                                e.target.value
                        })
                    }
                    className="
                    w-full
                    p-3
                    rounded-lg
                    bg-slate-800
                    text-white
                    "
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            password:
                                e.target.value
                        })
                    }
                    className="
                    w-full
                    p-3
                    rounded-lg
                    bg-slate-800
                    text-white
                    "
                />

                <input
                    type="password"
                    placeholder="Confirm Password"
                    value={formData.confirmPassword}
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            confirmPassword:
                                e.target.value
                        })
                    }
                    className="
                    w-full
                    p-3
                    rounded-lg
                    bg-slate-800
                    text-white
                    "
                />

                {

                    error && (

                        <div
                            className="
                            text-red-400
                            "
                        >
                            {error}
                        </div>

                    )

                }

                <button

                    type="submit"

                    className="
                    w-full
                    bg-blue-600
                    hover:bg-blue-700
                    text-white
                    py-3
                    rounded-lg
                    "

                >

                    Register

                </button>

                <p
                    className="
                    text-center
                    text-slate-400
                    "
                >

                    Already have an account?

                    <Link
                        to="/login"
                        className="
                        text-blue-400
                        ml-2
                        "
                    >
                        Login
                    </Link>

                </p>

            </form>

        </div>

    );

}

export default Register;