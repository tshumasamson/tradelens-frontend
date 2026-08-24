import { useState } from "react";
import { createApiKey } from "../../services/apiKeyApi";
import OnboardingLayout from "../onboarding/OnboardingLayout";

function OnboardingApiKey({ onComplete }) {

    const [loading, setLoading] = useState(false);
    const [apiKey, setApiKey] = useState(null);

    const generateKey = async () => {

        try {

            setLoading(true);

            const response = await createApiKey(
                "TradeLens Connector"
            );

            setApiKey(response);

        }
        catch (error) {

            console.error(error);

            alert(
                "Unable to generate your connector key."
            );

        }
        finally {

            setLoading(false);

        }

    };

    const copyKey = async () => {

        if (!apiKey?.key) {
            return;
        }

        try {

            await navigator.clipboard.writeText(
                apiKey.key
            );

            alert("API key copied.");

        }
        catch (error) {

            console.error(error);

            alert("Unable to copy API key.");

        }

    };

    const handleStartedConnector = () => {

        onComplete?.();

    };

    //
    // STEP 1
    //
    if (!apiKey) {

        return (

            <OnboardingLayout

                step={2}

                totalSteps={3}

                icon="🔐"

                title="Connect Your Trading Terminal"

                description={`TradeLens authenticates your Connector using a secure API key.

                This key will only be shown once, so be sure to copy it before continuing.`}

            >

                <button

                    onClick={generateKey}

                    disabled={loading}

                    className="
                    w-full
                    bg-blue-600
                    hover:bg-blue-700
                    disabled:opacity-50
                    disabled:cursor-not-allowed
                    transition
                    text-white
                    font-semibold
                    py-3
                    rounded-xl
                    "

                >

                    {

                        loading

                            ? "Generating..."

                            : "Generate Connector Key"

                    }

                </button>

            </OnboardingLayout>

        );

    }

    //
    // STEP 2
    //
    return (

        <OnboardingLayout

            step={2}

            totalSteps={3}

            progress={67}

            icon="✅"

            title="Your Connector Is Ready"

            description={`Your TradeLens Connector API key has been generated successfully.`}
        >
            <div className="space-y-8">
                <div
                    className="
                    bg-slate-900
                    border
                    border-slate-800
                    rounded-2xl
                    p-8
                    "
                >

                    <h2
                        className="
                        text-2xl
                        font-semibold
                        text-white
                        "
                    >

                        Download TradeLens Connector

                    </h2>

                    <p
                        className="
                        text-slate-400
                        mt-3
                        "
                    >

                        Download and install the Connector on
                        the computer running MetaTrader 5.

                    </p>

                    <a
                        href="/downloads/TradeLens-Connector-Setup-1.0.0.exe"
                        download
                        className="
                        inline-block
                        mt-6
                        bg-indigo-600
                        hover:bg-indigo-700
                        text-white
                        px-6
                        py-3
                        rounded-xl
                        "
                    >
                        Download Connector
                    </a>

                </div>

                <div
                    className="
                    bg-slate-900
                    border
                    border-slate-800
                    rounded-2xl
                    p-8
                    "
                >

                    <h2
                        className="
                        text-2xl
                        font-semibold
                        text-white
                        mb-5
                        "
                    >

                        Installation Checklist

                    </h2>

                    <ul
                        className="
                        space-y-4
                        text-slate-300
                        "
                    >

                        <li>✅ Download the TradeLens Connector.</li>

                        <li>✅ Install it on the MT5 computer.</li>

                        <li>✅ Paste the API key below.</li>

                        <li>✅ Login to your MT5 account.</li>

                        <li>✅ Start the Connector.</li>

                    </ul>

                </div>

                <div
                    className="
                    bg-slate-900
                    border
                    border-slate-800
                    rounded-2xl
                    p-8
                    "
                >

                    <div
                        className="
                        flex
                        items-center
                        justify-between
                        mb-4
                        "
                    >

                        <h2
                            className="
                            text-2xl
                            font-semibold
                            text-white
                            "
                        >

                            Connector API Key

                        </h2>

                        <button

                            onClick={copyKey}

                            className="
                            bg-blue-600
                            hover:bg-blue-700
                            px-5
                            py-2
                            rounded-xl
                            text-white
                            "

                        >

                            Copy

                        </button>

                    </div>

                    <div
                        className="
                        bg-slate-800
                        border
                        border-slate-700
                        rounded-xl
                        p-5
                        break-all
                        font-mono
                        text-green-400
                        "
                    >

                        {apiKey.key}

                    </div>

                    <p
                        className="
                        text-red-400
                        mt-4
                        "
                    >

                        This key will never be shown again.

                    </p>

                </div>

                <div className="text-right">

                    <button

                        onClick={handleStartedConnector}

                        className="
                        bg-green-600
                        hover:bg-green-700
                        text-white
                        px-8
                        py-3
                        rounded-xl
                        font-semibold
                        "

                    >

                        I've Started the Connector

                    </button>

                </div>

            </div>

        </OnboardingLayout>
    );
}
export default OnboardingApiKey;