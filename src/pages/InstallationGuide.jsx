import { Link, useNavigate } from "react-router-dom";

function InstallationGuide() {
    const navigate = useNavigate();

    const isAuthenticated = Boolean(
        localStorage.getItem("access")
    );

    return (
        <div className="min-h-screen bg-slate-950 text-white">

            {/* Header */}
            <header className="border-b border-slate-800">
                <div className="max-w-5xl mx-auto px-6 py-5 flex items-center justify-between">

                    <Link
                        to="/"
                        className="text-xl font-bold text-white"
                    >
                        TradeLens
                    </Link>

                    {isAuthenticated ? (
                        <button
                            onClick={() => navigate("/")}
                            className="
                                px-4
                                py-2
                                rounded-lg
                                bg-slate-800
                                hover:bg-slate-700
                                text-sm
                                font-medium
                            "
                        >
                            ← Back to Dashboard
                        </button>
                    ) : (
                        <Link
                            to="/login"
                            className="
                                px-4
                                py-2
                                rounded-lg
                                bg-slate-800
                                hover:bg-slate-700
                                text-sm
                                font-medium
                            "
                        >
                            Login
                        </Link>
                    )}

                </div>
            </header>


            {/* Main content */}
            <main className="max-w-5xl mx-auto px-6 py-10">

                {/* Page heading */}
                <section className="mb-10">

                    <p className="text-sm text-slate-400 mb-2">
                        TradeLens Help
                    </p>

                    <h1 className="text-4xl font-bold mb-4">
                        MT5 Connector Installation
                    </h1>

                    <p className="text-lg text-slate-400 max-w-3xl">
                        Follow these steps to connect your MetaTrader 5
                        trading account to TradeLens and start synchronizing
                        your trading data.
                    </p>

                </section>


                {/* Before you begin */}
                <section className="
                    bg-slate-900
                    border
                    border-slate-800
                    rounded-2xl
                    p-6
                    mb-8
                ">

                    <h2 className="text-2xl font-semibold mb-5">
                        Before You Begin
                    </h2>

                    <div className="space-y-3 text-slate-300">

                        <p>✓ Windows desktop or laptop</p>

                        <p>✓ MetaTrader 5 installed</p>

                        <p>✓ Active MT5 trading account</p>

                        <p>✓ Internet connection</p>

                        <p>✓ TradeLens account with a verified email</p>

                    </div>

                </section>


                {/* Installation steps */}
                <section className="space-y-6">

                    <Step
                        number="1"
                        title="Prepare MetaTrader 5"
                    >
                        <p>
                            Install MetaTrader 5 on your Windows computer
                            and log in to the MT5 trading account you want
                            TradeLens to monitor.
                        </p>

                        <p>
                            Make sure the account shown in MetaTrader 5 is
                            the same account you will select later in
                            TradeLens.
                        </p>
                    </Step>


                    <Step
                        number="2"
                        title="Create and Verify Your TradeLens Account"
                    >
                        <p>
                            Create your TradeLens account and complete
                            email verification before continuing.
                        </p>

                        <Link
                            to="/register"
                            className="
                                inline-block
                                mt-4
                                px-5
                                py-2.5
                                rounded-lg
                                bg-white
                                text-slate-950
                                font-semibold
                                hover:bg-slate-200
                            "
                        >
                            Create TradeLens Account
                        </Link>
                    </Step>


                    <Step
                        number="3"
                        title="Link Your MT5 Account"
                    >
                        <p>
                            Log in to TradeLens and link the MT5 trading
                            account you want to synchronize.
                        </p>
                    </Step>


                    <Step
                        number="4"
                        title="Download the TradeLens Connector"
                    >
                        <p>
                            Download the TradeLens Connector for Windows.
                        </p>

                        <a
                            href="/downloads/TradeLens-Connector-Setup-1.0.0.exe"
                            download
                            className="
                                inline-block
                                mt-4
                                px-5
                                py-2.5
                                rounded-lg
                                bg-white
                                text-slate-950
                                font-semibold
                                hover:bg-slate-200
                            "
                        >
                            Download Connector
                        </a>
                    </Step>


                    <Step
                        number="5"
                        title="Install the Connector"
                    >
                        <p>
                            Run the downloaded installer and follow the
                            installation wizard.
                        </p>

                        <p>
                            If Windows displays a security warning, verify
                            that you downloaded the installer from the
                            official TradeLens website before continuing.
                        </p>
                    </Step>


                    <Step
                        number="6"
                        title="Configure the Connector"
                    >
                        <p>
                            Open the TradeLens Connector and enter the
                            Connector API key provided by your TradeLens
                            account.
                        </p>

                        <div className="
                            mt-4
                            p-4
                            rounded-lg
                            bg-slate-950
                            border
                            border-slate-800
                            text-sm
                            text-slate-400
                        ">
                            <strong className="text-white">
                                Security:
                            </strong>{" "}
                            Your API key is a private credential. Never
                            publish it or share it with another person.
                        </div>
                    </Step>


                    <Step
                        number="7"
                        title="Select Your MT5 Account"
                    >
                        <p>
                            Select the MT5 account you linked in TradeLens
                            and confirm that the account number is correct.
                        </p>
                    </Step>


                    <Step
                        number="8"
                        title="Wait for the Connector to Come Online"
                    >
                        <p>
                            Allow the Connector a moment to complete its
                            registration and begin synchronizing your
                            trading data.
                        </p>
                    </Step>


                    <Step
                        number="9"
                        title="Open Your TradeLens Dashboard"
                    >
                        <p>
                            Once the Connector is online, open your
                            TradeLens dashboard to view your synchronized
                            trading data and analytics.
                        </p>
                    </Step>

                </section>


                {/* PDF */}
                <section className="
                    mt-12
                    p-6
                    rounded-2xl
                    bg-slate-900
                    border
                    border-slate-800
                ">

                    <h2 className="text-2xl font-semibold mb-2">
                        Need the Complete Guide?
                    </h2>

                    <p className="text-slate-400 mb-5">
                        Download the complete TradeLens installation guide
                        with screenshots and detailed instructions.
                    </p>

                    <a
                        href="/documents/TradeLens-Installation-Guide.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="
                            inline-block
                            px-5
                            py-2.5
                            rounded-lg
                            bg-white
                            text-slate-950
                            font-semibold
                            hover:bg-slate-200
                        "
                    >
                        Download Installation Guide PDF
                    </a>

                </section>


                {/* Support */}
                <section className="mt-10 text-center">

                    <h2 className="text-xl font-semibold mb-2">
                        Need More Help?
                    </h2>

                    <p className="text-slate-400">
                        If you have trouble installing or connecting the
                        TradeLens Connector, contact TradeLens Support.
                    </p>

                </section>

            </main>

        </div>
    );
}


/* Step component */

function Step({ number, title, children }) {
    return (
        <article className="
            bg-slate-900
            border
            border-slate-800
            rounded-2xl
            p-6
        ">

            <div className="flex gap-5">

                <div className="
                    flex-shrink-0
                    w-10
                    h-10
                    rounded-full
                    bg-white
                    text-slate-950
                    flex
                    items-center
                    justify-center
                    font-bold
                ">
                    {number}
                </div>

                <div>

                    <h2 className="
                        text-xl
                        font-semibold
                        mb-3
                    ">
                        {title}
                    </h2>

                    <div className="
                        space-y-3
                        text-slate-400
                        leading-relaxed
                    ">
                        {children}
                    </div>

                </div>

            </div>

        </article>
    );
}


export default InstallationGuide;