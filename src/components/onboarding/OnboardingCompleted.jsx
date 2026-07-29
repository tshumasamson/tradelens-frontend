import { useNavigate } from "react-router-dom";

import {
    completeOnboarding
} from "../../services/onboardingAPI";

function OnboardingCompleted() {

    const navigate =
        useNavigate();

    const handleContinue =
        async () => {

            try {

                await completeOnboarding();

                navigate("/", {
                    replace: true
                });

            }
            catch (error) {

                console.error(
                    "Failed to complete onboarding",
                    error
                );

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
            px-6
            "
        >

            <div
                className="
                max-w-2xl
                w-full
                bg-slate-900
                rounded-xl
                border
                border-slate-800
                p-10
                shadow-xl
                "
            >

                <div
                    className="
                    text-6xl
                    text-center
                    mb-6
                    "
                >
                    🎉
                </div>

                <h1
                    className="
                    text-4xl
                    font-bold
                    text-white
                    text-center
                    "
                >
                    Congratulations!
                </h1>

                <p
                    className="
                    mt-4
                    text-slate-300
                    text-center
                    text-lg
                    "
                >
                    Your TradeLens workspace has been successfully configured.
                </p>

                <div
                    className="
                    mt-10
                    space-y-4
                    text-slate-200
                    "
                >

                    <div>
                        ✅ Trading account created
                    </div>

                    <div>
                        ✅ Connector registered
                    </div>

                    <div>
                        ✅ Connector connected
                    </div>

                    <div>
                        ✅ Trade synchronization enabled
                    </div>

                </div>

                <button

                    onClick={handleContinue}

                    className="
                    w-full
                    mt-10
                    bg-blue-600
                    hover:bg-blue-700
                    text-white
                    py-3
                    rounded-lg
                    transition
                    "

                >
                    Go To Dashboard
                </button>

            </div>

        </div>

    );

}

export default OnboardingCompleted;