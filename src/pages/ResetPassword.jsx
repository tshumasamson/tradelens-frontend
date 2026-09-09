import { useState } from "react";
import {
    Link,
    useNavigate,
    useParams
} from "react-router-dom";

import { resetPassword } from "../services/authApi";


function ResetPassword() {

    const { uid, token } = useParams();

    const navigate = useNavigate();

    const [password, setPassword] =
        useState("");

    const [confirmPassword, setConfirmPassword] =
        useState("");

    const [message, setMessage] =
        useState("");

    const [error, setError] =
        useState("");

    const [loading, setLoading] =
        useState(false);

    const [success, setSuccess] =
        useState(false);


    const handleSubmit =
        async (e) => {

            e.preventDefault();

            setMessage("");
            setError("");

            if (password !== confirmPassword) {

                setError(
                    "Passwords do not match."
                );

                return;
            }

            setLoading(true);

            try {

                const data =
                    await resetPassword(
                        uid,
                        token,
                        password
                    );

                if (
                    data.detail ===
                    "Password reset successfully."
                ) {

                    setSuccess(true);

                    setMessage(
                        data.detail
                    );

                } else {

                    if (data.detail) {

                        if (Array.isArray(data.detail)) {

                            setError(data.detail[0]);

                        } else {

                            setError(data.detail);
                        }

                    } else if (data.new_password) {

                        if (Array.isArray(data.new_password)) {

                            setError(
                                data.new_password[0]
                            );

                        } else {

                            setError(
                                data.new_password
                            );
                        }

                    } else {

                        setError(
                            "Unable to reset your password."
                        );
                    }
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
                    Create a new password
                </p>


                {!success && (

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
                                New Password
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
                                placeholder="Enter new password"
                                minLength={8}
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
                                Confirm Password
                            </label>

                            <input
                                type="password"
                                value={confirmPassword}
                                onChange={(e) =>
                                    setConfirmPassword(
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
                                placeholder="Confirm new password"
                                minLength={8}
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
                                ? "Resetting..."
                                : "Reset Password"}

                        </button>

                    </form>

                )}


                {success && (

                    <div
                        className="
                        text-center
                        "
                    >

                        <div
                            className="
                            text-green-400
                            text-xl
                            font-semibold
                            mb-4
                            "
                        >
                            ✓ Password Reset
                        </div>

                        <p
                            className="
                            text-slate-300
                            mb-6
                            "
                        >
                            {message}
                        </p>

                        <button
                            type="button"
                            onClick={() =>
                                navigate("/login")
                            }
                            className="
                            w-full
                            bg-blue-600
                            hover:bg-blue-700
                            text-white
                            py-3
                            rounded-lg
                            font-semibold
                            transition
                            "
                        >
                            Continue to Login
                        </button>

                    </div>

                )}


                {!success && (

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

                )}

            </div>

        </div>

    );
}


export default ResetPassword;