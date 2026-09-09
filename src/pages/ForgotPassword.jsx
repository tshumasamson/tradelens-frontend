import { useState } from "react";
import { Link } from "react-router-dom";
import { requestPasswordReset } from "../services/authApi";


function ForgotPassword() {

    const [email, setEmail] =
        useState("");

    const [message, setMessage] =
        useState("");

    const [error, setError] =
        useState("");

    const [loading, setLoading] =
        useState(false);

    const handleSubmit =
        async (e) => {

            e.preventDefault();

            setMessage("");
            setError("");
            setLoading(true);

            try {

                const data =
                    await requestPasswordReset(
                        email
                    );

                if (data.detail) {

                    setMessage(
                        data.detail
                    );

                } else {

                    setError(
                        "Unable to process your request."
                    );
                }

            } catch (err) {

                console.error(err);

                setError(
                    "Unable to connect to server."
                );

            } finally {

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
                    Reset your password
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
                            Email Address
                        </label>

                        <input
                            type="email"
                            value={email}
                            onChange={(e) =>
                                setEmail(
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
                            placeholder="Enter your email"
                            required
                        />

                    </div>


                    {message && (

                        <div
                            className="
                            bg-green-900/20
                            border
                            border-green-500
                            text-green-400
                            px-4
                            py-3
                            rounded-lg
                            "
                        >
                            {message}
                        </div>

                    )}


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
                            ? "Sending..."
                            : "Send Reset Link"}

                    </button>

                </form>


                <div
                    className="
                    text-center
                    mt-6
                    "
                >

                    <Link
                        to="/login"
                        className="
                        text-blue-400
                        hover:text-blue-300
                        "
                    >
                        Back to Login
                    </Link>

                </div>

            </div>

        </div>

    );
}


export default ForgotPassword;