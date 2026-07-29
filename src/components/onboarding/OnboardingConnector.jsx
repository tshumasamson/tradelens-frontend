import OnboardingLayout from "./OnboardingLayout";

function OnboardingConnector({ status }) {

    return (

        <OnboardingLayout

            step={3}

            totalSteps={3}

            progress={status?.progress}

            icon="🔌"

            title={status?.title}

            description={status?.description}

        >

            <div className="space-y-8">

                <div
                    className="
                    bg-slate-900
                    border
                    border-slate-800
                    rounded-2xl
                    p-8
                    text-center
                    "
                >

                    <div className="text-6xl">

                        ⏳

                    </div>

                    <h2
                        className="
                        mt-6
                        text-2xl
                        font-semibold
                        text-white
                        "
                    >

                        Waiting for Connector...

                    </h2>

                    <p
                        className="
                        mt-4
                        text-slate-400
                        "
                    >

                        As soon as your Connector comes online,
                        TradeLens will automatically continue.

                    </p>

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
                        text-xl
                        font-semibold
                        text-white
                        "
                    >

                        Troubleshooting

                    </h2>

                    <ul
                        className="
                        mt-5
                        space-y-3
                        text-slate-300
                        "
                    >

                        <li>✅ Is the Connector installed?</li>

                        <li>✅ Is MetaTrader 5 running?</li>

                        <li>✅ Have you pasted the API key?</li>

                        <li>✅ Is the Connector started?</li>

                        <li>✅ Is there an internet connection?</li>

                    </ul>

                </div>

            </div>

        </OnboardingLayout>

    );

}

export default OnboardingConnector;