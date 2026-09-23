import { useState } from "react";
import { createApiKey } from "../../services/apiKeyApi";
import OnboardingLayout from "../onboarding/OnboardingLayout";

function OnboardingApiKey({ onComplete }) {
    const [loading, setLoading] = useState(false);
    const [apiKey, setApiKey] = useState(null);
    const [copied, setCopied] = useState(false);
    const [error, setError] = useState("");

    // ---------------------------------------------------------
    // Generate connector API key
    // ---------------------------------------------------------

    const generateKey = async () => {
        try {
            setLoading(true);
            setError("");
            setCopied(false);

            const response = await createApiKey(
                "TradeLens Connector"
            );

            setApiKey(response);
        } catch (err) {
            console.error(
                "Unable to generate connector API key:",
                err
            );

            setError(
                err?.response?.data?.detail ||
                "Unable to generate your connector key. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    // ---------------------------------------------------------
    // Copy API key
    // ---------------------------------------------------------

    const copyKey = async () => {
        if (!apiKey?.key) {
            return;
        }

        try {
            await navigator.clipboard.writeText(apiKey.key);

            setCopied(true);

            setTimeout(() => {
                setCopied(false);
            }, 2000);
        } catch (err) {
            console.error(
                "Unable to copy connector API key:",
                err
            );

            setError(
                "Unable to copy the API key. Please copy it manually."
            );
        }
    };

    // ---------------------------------------------------------
    // Continue onboarding
    // ---------------------------------------------------------

    const handleStartedConnector = () => {
        onComplete?.();
    };

    // =========================================================
    // STEP 1 — Generate API Key
    // =========================================================

    if (!apiKey) {
        return (
            <OnboardingLayout
                step={2}
                totalSteps={3}
                progress={67}
                icon="🔐"
                title="Connect Your Trading Terminal"
                description="TradeLens uses a secure API key to authenticate the Connector running on your MT5 computer."
            >
                <div className="space-y-5">

                    {/* Information card */}

                    <div className="
                        bg-slate-900
                        border
                        border-slate-800
                        rounded-xl
                        p-5
                    ">

                        <div className="flex items-start gap-3">

                            <div className="
                                w-9
                                h-9
                                rounded-lg
                                bg-blue-500/10
                                border
                                border-blue-500/20
                                flex
                                items-center
                                justify-center
                                flex-shrink-0
                            ">
                                <span className="text-blue-400">
                                    🔑
                                </span>
                            </div>

                            <div>
                                <h2 className="text-sm font-semibold text-white">
                                    Create your Connector key
                                </h2>

                                <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                                    This key allows your TradeLens
                                    Connector to securely communicate
                                    with your account.
                                </p>
                            </div>

                        </div>

                    </div>

                    {/* Security notice */}

                    <div className="
                        flex
                        items-start
                        gap-3
                        px-4
                        py-3
                        rounded-lg
                        bg-amber-500/5
                        border
                        border-amber-500/20
                    ">

                        <span className="text-amber-400 text-sm">
                            !
                        </span>

                        <p className="text-xs text-amber-300 leading-relaxed">
                            Your API key will be displayed once.
                            Copy and store it securely before
                            continuing.
                        </p>

                    </div>

                    {/* Error */}

                    {error && (
                        <div className="
                            flex
                            items-start
                            gap-3
                            px-4
                            py-3
                            rounded-lg
                            bg-red-500/10
                            border
                            border-red-500/20
                        ">
                            <span className="text-red-400">
                                !
                            </span>

                            <p className="text-xs text-red-300 flex-1">
                                {error}
                            </p>
                        </div>
                    )}

                    {/* Generate button */}

                    <button
                        type="button"
                        onClick={generateKey}
                        disabled={loading}
                        className="
                            w-full
                            flex
                            items-center
                            justify-center
                            gap-2
                            px-4
                            py-3
                            rounded-lg
                            bg-blue-600
                            hover:bg-blue-500
                            disabled:opacity-40
                            disabled:cursor-not-allowed
                            text-white
                            text-sm
                            font-semibold
                            transition
                        "
                    >
                        {loading ? (
                            <>
                                <span className="
                                    w-4
                                    h-4
                                    border-2
                                    border-white/30
                                    border-t-white
                                    rounded-full
                                    animate-spin
                                " />

                                Generating...
                            </>
                        ) : (
                            <>
                                <span>+</span>
                                Generate Connector Key
                            </>
                        )}
                    </button>

                </div>
            </OnboardingLayout>
        );
    }

    // =========================================================
    // STEP 2 — Configure Connector
    // =========================================================

    return (
        <OnboardingLayout
            step={2}
            totalSteps={3}
            progress={67}
            icon="✓"
            title="Your Connector Is Ready"
            description="Your TradeLens Connector key has been generated. Complete the steps below to connect your MT5 terminal."
        >

            <div className="space-y-4">

                {/* -------------------------------------------------
                    Step 1 — Download
                ------------------------------------------------- */}

                <div className="
                    bg-slate-900
                    border
                    border-slate-800
                    rounded-xl
                    p-5
                ">

                    <div className="flex items-start gap-4">

                        <div className="
                            w-8
                            h-8
                            rounded-full
                            bg-blue-500/10
                            border
                            border-blue-500/20
                            flex
                            items-center
                            justify-center
                            text-blue-400
                            text-sm
                            font-semibold
                            flex-shrink-0
                        ">
                            1
                        </div>

                        <div className="flex-1 min-w-0">

                            <h2 className="text-sm font-semibold text-white">
                                Download TradeLens Connector
                            </h2>

                            <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                                Install the Connector on the computer
                                where MetaTrader 5 is running.
                            </p>

                            <a
                                href="/downloads/TradeLens-Connector-Setup-1.0.0.exe"
                                download
                                className="
                                    inline-flex
                                    items-center
                                    gap-2
                                    mt-4
                                    px-4
                                    py-2.5
                                    rounded-lg
                                    bg-blue-600
                                    hover:bg-blue-500
                                    text-white
                                    text-sm
                                    font-medium
                                    transition
                                "
                            >
                                <span>↓</span>
                                Download Connector
                            </a>

                        </div>

                    </div>

                </div>

                {/* -------------------------------------------------
                    Step 2 — Configure
                ------------------------------------------------- */}

                <div className="
                    bg-slate-900
                    border
                    border-slate-800
                    rounded-xl
                    p-5
                ">

                    <div className="flex items-start gap-4">

                        <div className="
                            w-8
                            h-8
                            rounded-full
                            bg-blue-500/10
                            border
                            border-blue-500/20
                            flex
                            items-center
                            justify-center
                            text-blue-400
                            text-sm
                            font-semibold
                            flex-shrink-0
                        ">
                            2
                        </div>

                        <div className="flex-1 min-w-0">

                            <h2 className="text-sm font-semibold text-white">
                                Configure the Connector
                            </h2>

                            <p className="text-xs text-slate-500 mt-1.5">
                                Open the Connector and enter the
                                API key shown below.
                            </p>

                            <div className="mt-4">

                                <div className="
                                    flex
                                    items-center
                                    justify-between
                                    gap-3
                                    mb-2
                                ">
                                    <span className="text-xs font-medium text-slate-400">
                                        Connector API Key
                                    </span>

                                    <button
                                        type="button"
                                        onClick={copyKey}
                                        className={`
                                            px-3
                                            py-1.5
                                            rounded-lg
                                            text-xs
                                            font-medium
                                            transition
                                            ${
                                                copied
                                                    ? "bg-green-600 text-white"
                                                    : "bg-blue-600 hover:bg-blue-500 text-white"
                                            }
                                        `}
                                    >
                                        {copied
                                            ? "✓ Copied"
                                            : "Copy Key"
                                        }
                                    </button>
                                </div>

                                <div className="
                                    bg-slate-950
                                    border
                                    border-slate-700
                                    rounded-lg
                                    p-4
                                    font-mono
                                    text-xs
                                    text-green-400
                                    break-all
                                    select-all
                                ">
                                    {apiKey.key}
                                </div>

                                <div className="
                                    flex
                                    items-start
                                    gap-2
                                    mt-3
                                ">
                                    <span className="text-amber-400 text-xs">
                                        !
                                    </span>

                                    <p className="text-xs text-slate-500 leading-relaxed">
                                        Keep this key private. It is
                                        displayed here only during
                                        onboarding and should not be
                                        shared with anyone.
                                    </p>
                                </div>

                            </div>

                        </div>

                    </div>

                </div>

                {/* -------------------------------------------------
                    Step 3 — Start Connector
                ------------------------------------------------- */}

                <div className="
                    bg-slate-900
                    border
                    border-slate-800
                    rounded-xl
                    p-5
                ">

                    <div className="flex items-start gap-4">

                        <div className="
                            w-8
                            h-8
                            rounded-full
                            bg-blue-500/10
                            border
                            border-blue-500/20
                            flex
                            items-center
                            justify-center
                            text-blue-400
                            text-sm
                            font-semibold
                            flex-shrink-0
                        ">
                            3
                        </div>

                        <div className="flex-1">

                            <h2 className="text-sm font-semibold text-white">
                                Start the Connector
                            </h2>

                            <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                                Log in to your MT5 account, enter the
                                API key, and start the Connector.
                            </p>

                            <div className="
                                mt-4
                                grid
                                grid-cols-1
                                sm:grid-cols-3
                                gap-2
                            ">

                                <div className="
                                    px-3
                                    py-2.5
                                    rounded-lg
                                    bg-slate-950
                                    border
                                    border-slate-800
                                ">
                                    <p className="text-xs text-slate-500">
                                        1
                                    </p>

                                    <p className="text-xs text-slate-300 mt-1">
                                        Login to MT5
                                    </p>
                                </div>

                                <div className="
                                    px-3
                                    py-2.5
                                    rounded-lg
                                    bg-slate-950
                                    border
                                    border-slate-800
                                ">
                                    <p className="text-xs text-slate-500">
                                        2
                                    </p>

                                    <p className="text-xs text-slate-300 mt-1">
                                        Enter API key
                                    </p>
                                </div>

                                <div className="
                                    px-3
                                    py-2.5
                                    rounded-lg
                                    bg-slate-950
                                    border
                                    border-slate-800
                                ">
                                    <p className="text-xs text-slate-500">
                                        3
                                    </p>

                                    <p className="text-xs text-slate-300 mt-1">
                                        Start Connector
                                    </p>
                                </div>

                            </div>

                        </div>

                    </div>

                </div>

                {/* -------------------------------------------------
                    Continue
                ------------------------------------------------- */}

                <div className="flex justify-end pt-2">

                    <button
                        type="button"
                        onClick={handleStartedConnector}
                        className="
                            inline-flex
                            items-center
                            gap-2
                            px-5
                            py-2.5
                            rounded-lg
                            bg-green-600
                            hover:bg-green-500
                            text-white
                            text-sm
                            font-semibold
                            transition
                        "
                    >
                        I've Started the Connector
                        <span>→</span>
                    </button>

                </div>

            </div>

        </OnboardingLayout>
    );
}

export default OnboardingApiKey;