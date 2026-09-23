import { useEffect, useState } from "react";
import {
    getConnectors,
    getConnectorDashboard,
} from "../services/connectorApi";

import ConnectorMetrics from "../components/connectors/ConnectorMetrics";
import ConnectorTable from "../components/connectors/ConnectorTable";

function Connectors({
    onboarding = false,
    onComplete = null,
}) {
    const [connectors, setConnectors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [error, setError] = useState("");

    const [serverTime, setServerTime] = useState(null);

    const [dashboard, setDashboard] = useState({
        total: 0,
        online: 0,
        offline: 0,
        disabled: 0,
    });

    // ---------------------------------------------------------
    // Load connector list
    // ---------------------------------------------------------

    const loadConnectors = async (isRefresh = false) => {
        try {
            if (isRefresh) {
                setRefreshing(true);
            } else {
                setLoading(true);
            }

            setError("");

            const data = await getConnectors();

            setServerTime(data?.server_time || null);
            setConnectors(
                Array.isArray(data?.results)
                    ? data.results
                    : []
            );
        } catch (err) {
            console.error(
                "Failed to load connectors:",
                err
            );

            setError(
                "Unable to load your connectors. Please try again."
            );
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    // ---------------------------------------------------------
    // Load connector dashboard
    // ---------------------------------------------------------

    const loadDashboard = async () => {
        try {
            const data = await getConnectorDashboard();

            setDashboard({
                total: Number(data?.total || 0),
                online: Number(data?.online || 0),
                offline: Number(data?.offline || 0),
                disabled: Number(data?.disabled || 0),
            });
        } catch (err) {
            console.error(
                "Failed to load connector dashboard:",
                err
            );

            // Do not replace connector data if only the
            // dashboard request fails.
        }
    };

    // ---------------------------------------------------------
    // Load all connector data
    // ---------------------------------------------------------

    const loadData = async (isRefresh = false) => {
        await Promise.all([
            loadConnectors(isRefresh),
            loadDashboard(),
        ]);
    };

    // ---------------------------------------------------------
    // Initial load + automatic refresh
    // ---------------------------------------------------------

    useEffect(() => {
        loadData();

        const interval = setInterval(() => {
            loadData(true);
        }, 10000);

        return () => clearInterval(interval);
    }, []);

    // ---------------------------------------------------------
    // Manual refresh
    // ---------------------------------------------------------

    const handleRefresh = async () => {
        await loadData(true);
    };

    // ---------------------------------------------------------
    // Loading state
    // ---------------------------------------------------------

    if (loading) {
        return (
            <div className="space-y-5">

                <div>
                    <div className="h-5 w-28 bg-slate-800 rounded animate-pulse" />

                    <div className="h-3 w-72 bg-slate-800/70 rounded mt-2 animate-pulse" />
                </div>

                <div className="
                    grid
                    grid-cols-2
                    lg:grid-cols-4
                    gap-3
                ">
                    {[1, 2, 3, 4].map((item) => (
                        <div
                            key={item}
                            className="
                                h-24
                                bg-slate-900
                                border
                                border-slate-800
                                rounded-xl
                                animate-pulse
                            "
                        />
                    ))}
                </div>

                <div className="
                    bg-slate-900
                    border
                    border-slate-800
                    rounded-xl
                    overflow-hidden
                ">
                    <div className="px-5 py-4 border-b border-slate-800">
                        <div className="h-4 w-32 bg-slate-800 rounded animate-pulse" />
                    </div>

                    <div className="p-5 space-y-3">
                        {[1, 2, 3].map((item) => (
                            <div
                                key={item}
                                className="
                                    h-12
                                    bg-slate-800/50
                                    rounded-lg
                                    animate-pulse
                                "
                            />
                        ))}
                    </div>
                </div>

            </div>
        );
    }

    // ---------------------------------------------------------
    // Empty state
    // ---------------------------------------------------------

    if (connectors.length === 0) {
        return (
            <div className="space-y-5">

                {/* Header */}

                <div className="
                    flex
                    flex-col
                    sm:flex-row
                    sm:items-center
                    sm:justify-between
                    gap-4
                ">

                    <div>
                        <h1 className="
                            text-xl
                            font-semibold
                            text-white
                        ">
                            Connectors
                        </h1>

                        <p className="
                            text-sm
                            text-slate-500
                            mt-1
                        ">
                            Monitor and manage your TradeLens
                            connectors.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={handleRefresh}
                        disabled={refreshing}
                        className="
                            inline-flex
                            items-center
                            justify-center
                            gap-2
                            px-3.5
                            py-2
                            rounded-lg
                            border
                            border-slate-700
                            bg-slate-900
                            hover:bg-slate-800
                            text-slate-300
                            text-xs
                            font-medium
                            disabled:opacity-50
                            transition
                        "
                    >
                        <span
                            className={
                                refreshing
                                    ? "animate-spin"
                                    : ""
                            }
                        >
                            ↻
                        </span>

                        {refreshing
                            ? "Refreshing..."
                            : "Refresh"}
                    </button>

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

                        <p className="
                            text-sm
                            text-red-300
                            flex-1
                        ">
                            {error}
                        </p>
                    </div>
                )}

                {/* Empty state */}

                <div className="
                    bg-slate-900
                    border
                    border-slate-800
                    rounded-xl
                    shadow-sm
                ">

                    <div className="
                        px-6
                        py-16
                        text-center
                    ">

                        <div className="
                            mx-auto
                            w-12
                            h-12
                            rounded-xl
                            bg-blue-500/10
                            border
                            border-blue-500/20
                            flex
                            items-center
                            justify-center
                        ">
                            <span className="
                                text-blue-400
                                text-xl
                            ">
                                ⛓
                            </span>
                        </div>

                        <h2 className="
                            mt-4
                            text-base
                            font-semibold
                            text-white
                        ">
                            No connectors found
                        </h2>

                        <p className="
                            max-w-md
                            mx-auto
                            mt-2
                            text-sm
                            text-slate-500
                            leading-relaxed
                        ">
                            Download and install the TradeLens
                            Connector on the computer running
                            MetaTrader 5 to start syncing trades.
                        </p>

                        <a
                            href="/downloads/TradeLens-Connector-Setup-1.0.0.exe"
                            download
                            className="
                                inline-flex
                                items-center
                                gap-2
                                mt-5
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
                            ↓
                            Download Connector
                        </a>

                    </div>

                </div>

            </div>
        );
    }

    // ---------------------------------------------------------
    // Main page
    // ---------------------------------------------------------

    return (
        <div className="space-y-5">

            {/* -------------------------------------------------
                Header
            ------------------------------------------------- */}

            <div className="
                flex
                flex-col
                sm:flex-row
                sm:items-center
                sm:justify-between
                gap-4
            ">

                <div>
                    <h1 className="
                        text-xl
                        font-semibold
                        text-white
                    ">
                        Connectors
                    </h1>

                    <p className="
                        text-sm
                        text-slate-500
                        mt-1
                    ">
                        Monitor and manage your TradeLens
                        connectors.
                    </p>
                </div>

                <div className="
                    flex
                    items-center
                    gap-2
                ">

                    {/* Live indicator */}

                    <div className="
                        hidden
                        sm:flex
                        items-center
                        gap-2
                        px-3
                        py-2
                        rounded-lg
                        bg-slate-900
                        border
                        border-slate-800
                    ">
                        <span className="
                            w-1.5
                            h-1.5
                            rounded-full
                            bg-green-400"
                        />

                        <span className="
                            text-xs
                            text-slate-400
                        ">
                            Live
                        </span>
                    </div>

                    {/* Refresh */}

                    <button
                        type="button"
                        onClick={handleRefresh}
                        disabled={refreshing}
                        className="
                            inline-flex
                            items-center
                            justify-center
                            gap-2
                            px-3.5
                            py-2
                            rounded-lg
                            border
                            border-slate-700
                            bg-slate-900
                            hover:bg-slate-800
                            text-slate-300
                            text-xs
                            font-medium
                            disabled:opacity-50
                            transition
                        "
                    >
                        <span
                            className={
                                refreshing
                                    ? "animate-spin"
                                    : ""
                            }
                        >
                            ↻
                        </span>

                        {refreshing
                            ? "Refreshing..."
                            : "Refresh"}
                    </button>

                </div>

            </div>

            {/* -------------------------------------------------
                Error
            ------------------------------------------------- */}

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

                    <p className="
                        text-sm
                        text-red-300
                        flex-1
                    ">
                        {error}
                    </p>

                    <button
                        type="button"
                        onClick={() => setError("")}
                        className="
                            text-red-400
                            hover:text-red-300
                            transition
                        "
                    >
                        ×
                    </button>

                </div>
            )}

            {/* -------------------------------------------------
                Connector metrics
            ------------------------------------------------- */}

            <ConnectorMetrics
                dashboard={dashboard}
            />

            {/* -------------------------------------------------
                Connector table
            ------------------------------------------------- */}

            <ConnectorTable
                connectors={connectors}
                formatLastSeen={serverTime}
                loadConnectors={loadConnectors}
            />

            {/* -------------------------------------------------
                Refresh status
            ------------------------------------------------- */}

            <div className="
                flex
                items-center
                justify-end
                gap-2
                text-xs
                text-slate-600
            ">

                <span className="
                    w-1.5
                    h-1.5
                    rounded-full
                    bg-green-500"
                />

                <span>
                    Connector status refreshes automatically
                </span>

            </div>

        </div>
    );
}

export default Connectors;