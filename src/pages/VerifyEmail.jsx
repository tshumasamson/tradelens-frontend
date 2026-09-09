import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { verifyEmail } from "../services/authApi";

function VerifyEmail() {

    const { uid, token } = useParams();
    const [status, setStatus] =useState("verifying");
    const [message, setMessage] = useState("");

    useEffect(() => {

        const handleVerification = async () => {

            try {

                const response =
                    await verifyEmail(uid, token);

                const data =
                    await response.json();

                if (response.ok) {

                    setStatus("success");

                    setMessage(
                        data.detail ||
                        "Your email has been verified successfully."
                    );

                } else {

                    setStatus("error");

                    setMessage(
                        data.detail ||
                        "This verification link is invalid or has expired."
                    );
                }

            } catch (error) {

                console.error(error);

                setStatus("error");

                setMessage(
                    "Unable to connect to the server. Please try again."
                );
            }
        };

        handleVerification();

    }, [uid, token]);


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
                text-center
                "
            >

                <h1
                    className="
                    text-3xl
                    font-bold
                    text-white
                    mb-4
                    "
                >
                    TradeLens
                </h1>


                {status === "verifying" && (

                    <>

                        <div
                            className="
                            text-blue-400
                            text-lg
                            mb-4
                            "
                        >
                            Verifying your email...
                        </div>

                        <p
                            className="
                            text-slate-400
                            "
                        >
                            Please wait.
                        </p>

                    </>

                )}


                {status === "success" && (

                    <>

                        <div
                            className="
                            text-green-400
                            text-xl
                            font-semibold
                            mb-4
                            "
                        >
                            ✓ Email Verified
                        </div>

                        <p
                            className="
                            text-slate-300
                            mb-6
                            "
                        >
                            {message}
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
                            Continue to Login
                        </Link>

                    </>

                )}


                {status === "error" && (

                    <>

                        <div
                            className="
                            text-red-400
                            text-xl
                            font-semibold
                            mb-4
                            "
                        >
                            ✕ Verification Failed
                        </div>

                        <p
                            className="
                            text-slate-300
                            mb-6
                            "
                        >
                            {message}
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

                    </>

                )}

            </div>

        </div>

    );

}

export default VerifyEmail;