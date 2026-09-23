import { useCallback, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { getConnector } from "../services/connectorApi";

import ConnectorHeader
    from "../components/connectors/ConnectorHeader";

import ConnectorIdentityCard
    from "../components/connectors/ConnectorIdentityCard";

import ConnectorHealthCard
    from "../components/connectors/ConnectorHealthCard";

import ConnectorRegistrationCard
    from "../components/connectors/ConnectorRegistrationCard";

import ConnectorCommandPanel
    from "../components/connectors/ConnectorCommandPanel";

import ConnectorCommandHistory
    from "../components/connectors/ConnectorCommandHistory";


function ConnectorDetail() {

    const { id } = useParams();

    const navigate = useNavigate();


    const [connector, setConnector] = useState(null);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState(null);


    /*
     * Load connector
     */
    const loadConnector = useCallback(async () => {

        if (!id) {

            setError("Connector ID is missing.");

            setLoading(false);

            return;
        }


        try {

            setLoading(true);

            setError(null);


            const data = await getConnector(id);


            setConnector(data);

        }

        catch (err) {

            console.error(
                "Failed to load connector:",
                err
            );


            setConnector(null);


            setError(
                err?.message ||
                "Unable to load connector."
            );

        }

        finally {

            setLoading(false);

        }

    }, [id]);


    /*
     * Load connector when page opens
     */
    useEffect(() => {

        loadConnector();

    }, [loadConnector]);


    /*
     * Loading state
     */
    if (loading) {

        return (

            <div className="
                p-4
                sm:p-6
            ">

                <div className="
                    mx-auto
                    max-w-[1500px]
                ">

                    <div className="
                        rounded-xl
                        border
                        border-slate-800
                        bg-slate-900/60
                        p-6
                    ">

                        <div className="
                            animate-pulse
                            space-y-5
                        ">

                            {/* Header skeleton */}

                            <div className="
                                flex
                                items-center
                                justify-between
                            ">

                                <div className="space-y-2">

                                    <div className="
                                        h-5
                                        w-48
                                        rounded
                                        bg-slate-800
                                    " />

                                    <div className="
                                        h-3
                                        w-64
                                        rounded
                                        bg-slate-800
                                    " />

                                </div>


                                <div className="
                                    h-8
                                    w-20
                                    rounded-md
                                    bg-slate-800
                                " />

                            </div>


                            {/* Cards skeleton */}

                            <div className="
                                grid
                                grid-cols-1
                                gap-4
                                xl:grid-cols-2
                            ">

                                <div className="
                                    h-52
                                    rounded-xl
                                    bg-slate-800/60
                                " />

                                <div className="
                                    h-52
                                    rounded-xl
                                    bg-slate-800/60
                                " />

                            </div>


                            {/* Bottom skeleton */}

                            <div className="
                                grid
                                grid-cols-1
                                gap-4
                                xl:grid-cols-2
                            ">

                                <div className="
                                    h-72
                                    rounded-xl
                                    bg-slate-800/60
                                " />

                                <div className="
                                    h-72
                                    rounded-xl
                                    bg-slate-800/60
                                " />

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        );

    }


    /*
     * Error state
     */
    if (error) {

        return (

            <div className="
                p-4
                sm:p-6
            ">

                <div className="
                    mx-auto
                    max-w-[1500px]
                ">

                    <div className="
                        rounded-xl
                        border
                        border-red-500/20
                        bg-red-500/5
                        p-6
                    ">

                        <div className="
                            flex
                            items-start
                            justify-between
                            gap-4
                        ">

                            <div>

                                <h2 className="
                                    text-sm
                                    font-semibold
                                    text-red-400
                                ">
                                    Unable to load connector
                                </h2>


                                <p className="
                                    mt-1
                                    text-xs
                                    leading-5
                                    text-slate-400
                                ">
                                    {error}
                                </p>

                            </div>

                        </div>


                        <div className="
                            mt-5
                            flex
                            flex-wrap
                            gap-2
                        ">

                            <button
                                type="button"
                                onClick={loadConnector}
                                className="
                                    rounded-md
                                    border
                                    border-slate-700
                                    bg-slate-800
                                    px-3
                                    py-2
                                    text-xs
                                    font-medium
                                    text-slate-200
                                    transition
                                    hover:border-slate-600
                                    hover:bg-slate-700
                                "
                            >
                                Retry
                            </button>


                            <button
                                type="button"
                                onClick={() =>
                                    navigate("/connectors")
                                }
                                className="
                                    rounded-md
                                    border
                                    border-slate-800
                                    px-3
                                    py-2
                                    text-xs
                                    font-medium
                                    text-slate-400
                                    transition
                                    hover:border-slate-700
                                    hover:text-slate-200
                                "
                            >
                                Back to Connectors
                            </button>

                        </div>

                    </div>

                </div>

            </div>

        );

    }


    /*
     * Connector not found
     */
    if (!connector) {

        return (

            <div className="
                p-4
                sm:p-6
            ">

                <div className="
                    mx-auto
                    max-w-[1500px]
                ">

                    <div className="
                        rounded-xl
                        border
                        border-slate-800
                        bg-slate-900/60
                        p-8
                        text-center
                    ">

                        <h2 className="
                            text-sm
                            font-semibold
                            text-slate-200
                        ">
                            Connector not found
                        </h2>


                        <p className="
                            mt-1
                            text-xs
                            text-slate-500
                        ">
                            The requested connector could not be found.
                        </p>


                        <button
                            type="button"
                            onClick={() =>
                                navigate("/connectors")
                            }
                            className="
                                mt-5
                                rounded-md
                                border
                                border-slate-700
                                bg-slate-800
                                px-3
                                py-2
                                text-xs
                                font-medium
                                text-slate-200
                                transition
                                hover:bg-slate-700
                            "
                        >
                            Back to Connectors
                        </button>

                    </div>

                </div>

            </div>

        );

    }


    /*
     * Main connector detail page
     */
    return (

        <div className="
            p-4
            sm:p-6
        ">

            <div className="
                mx-auto
                max-w-[1500px]
                space-y-4
            ">


                {/* =====================================================
                    CONNECTOR HEADER
                ====================================================== */}

                <ConnectorHeader
                    connector={connector}
                />


                {/* =====================================================
                    IDENTITY + HEALTH
                ====================================================== */}

                <div className="
                    grid
                    grid-cols-1
                    gap-4
                    xl:grid-cols-2
                ">

                    <ConnectorIdentityCard
                        connector={connector}
                    />


                    <ConnectorHealthCard
                        connector={connector}
                    />

                </div>


                {/* =====================================================
                    REGISTRATION + COMMANDS
                ====================================================== */}

                <div className="
                    grid
                    grid-cols-1
                    gap-4
                    xl:grid-cols-2
                    items-start
                ">


                    {/* =================================================
                        LEFT
                    ================================================== */}

                    <div className="
                        space-y-4
                    ">

                        <ConnectorRegistrationCard
                            connector={connector}
                        />


                        <ConnectorCommandHistory
                            connectorId={id}
                        />

                    </div>


                    {/* =================================================
                        RIGHT
                    ================================================== */}

                    <div className="
                        h-fit
                        xl:sticky
                        xl:top-4
                    ">

                        <ConnectorCommandPanel
                            connector={connector}
                            reloadConnector={loadConnector}
                        />

                    </div>

                </div>

            </div>

        </div>

    );

}


export default ConnectorDetail;