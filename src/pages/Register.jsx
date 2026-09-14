import { useState } from "react";
import { Link } from "react-router-dom";

import { register } from "../services/authApi";


function Register() {

    const [error, setError] =
        useState("");

    const [registeredEmail, setRegisteredEmail] =
        useState("");

    const [registrationComplete, setRegistrationComplete] =
        useState(false);

    const [loading, setLoading] =
        useState(false);

    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        username: "",
        email: "",
        country: "",
        password: "",
        confirmPassword: ""
    });


    const handleSubmit =
        async (e) => {

            e.preventDefault();

            setError("");
            setLoading(true);


            if (
                formData.password !==
                formData.confirmPassword
            ) {

                setError(
                    "Passwords do not match"
                );

                setLoading(false);

                return;
            }


            try {

                const result =
                    await register({
                        first_name: formData.first_name,
                        last_name: formData.last_name,
                        username: formData.username,
                        email: formData.email,
                        country: formData.country,
                        password: formData.password
                    });


                if (result.id) {

                    setRegisteredEmail(
                        formData.email
                    );

                    setRegistrationComplete(
                        true
                    );

                    return;
                }


                setError(

                    Object.values(result)
                        .flat()
                        .join(", ")

                );

            }

            catch (err) {

                console.error(err);

                setError(
                    "Unable to connect to server."
                );

            }

            finally {

                setLoading(false);

            }

        };


    /*
     * Registration successful
     * Show email verification message
     */

    if (registrationComplete) {

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
                    bg-slate-900
                    border
                    border-slate-800
                    rounded-2xl
                    p-8
                    w-full
                    max-w-md
                    text-center
                    "
                >

                    <div
                        className="
                        text-5xl
                        mb-4
                        "
                    >
                        ✉️
                    </div>


                    <h1
                        className="
                        text-2xl
                        font-bold
                        text-white
                        mb-4
                        "
                    >
                        Check Your Email
                    </h1>


                    <p
                        className="
                        text-slate-300
                        mb-3
                        "
                    >
                        Your TradeLens account has been
                        created successfully.
                    </p>


                    <p
                        className="
                        text-slate-400
                        mb-6
                        "
                    >
                        We've sent a verification link to:
                    </p>


                    <p
                        className="
                        text-blue-400
                        font-semibold
                        break-all
                        mb-6
                        "
                    >
                        {registeredEmail}
                    </p>


                    <p
                        className="
                        text-slate-400
                        text-sm
                        mb-6
                        "
                    >
                        Please check your inbox and click
                        the verification link before
                        logging in to TradeLens.
                    </p>


                    <Link
                        to="/login"
                        className="
                        inline-block
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
                        Go to Login
                    </Link>


                    <p
                        className="
                        text-slate-500
                        text-xs
                        mt-4
                        "
                    >
                        Didn't receive the email?
                        Check your spam or junk folder.
                    </p>

                </div>

            </div>

        );

    }


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
                    type="text"
                    placeholder="First Name"
                    value={formData.first_name}
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            first_name: e.target.value
                        })
                    }
                    className="
                        w-full
                        p-3
                        rounded-lg
                        bg-slate-800
                        text-white
                    "
                    required
                />

                <input
                    type="text"
                    placeholder="Surname"
                    value={formData.last_name}
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            last_name: e.target.value
                        })
                    }
                    className="
                        w-full
                        p-3
                        rounded-lg
                        bg-slate-800
                        text-white
                    "
                    required
                />

                <input
                    type="text"
                    placeholder="Username"
                    value={formData.username}
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            username: e.target.value
                        })
                    }
                    className="
                        w-full
                        p-3
                        rounded-lg
                        bg-slate-800
                        text-white
                    "
                    minLength={5}
                    maxLength={150}
                    pattern="^(?=.*[A-Za-z])\S{5,150}$"
                    title="Username must be at least 5 characters, contain at least one letter, and cannot contain spaces."
                    required
                />

                <p className="text-xs text-slate-500 -mt-2">
                    Username must be at least 5 characters, contain a letter, and cannot contain spaces.
                </p>


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
                    required
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
                    required
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
                    required
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
                    required
                />


                {error && (

                    <div
                        className="
                        text-red-400
                        bg-red-900/20
                        border
                        border-red-500/50
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
                    disabled:opacity-50
                    "
                >

                    {loading
                        ? "Creating Account..."
                        : "Register"}

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

                <Link
                    to="/help/installation"
                    className="text-sm text-slate-400 hover:text-white"
                >
                    Need help getting started?
                </Link>


            </form>

        </div>

    );

}


export default Register;