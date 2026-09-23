// components/connectors/ConnectorHeader.jsx

import { Link } from "react-router-dom";

function ConnectorHeader({ connector }) {

    const isOnline =
        connector.status === "online";

    const isDisabled =
        connector.status === "disabled";

    const mt5Connected =
        Boolean(connector.mt5_connected);

    const queueSize =
        Number(connector.queue_size || 0);

    const healthy =
        isOnline &&
        mt5Connected &&
        queueSize === 0;

    const statusLabel =
        isDisabled
            ? "Disabled"
            : isOnline
                ? "Online"
                : "Offline";

    const statusClasses =
        isDisabled
            ? "bg-amber-500/10 border-amber-500/20 text-amber-400"
            : isOnline
                ? "bg-green-500/10 border-green-500/20 text-green-400"
                : "bg-red-500/10 border-red-500/20 text-red-400";

    return (
        <div className="
            bg-slate-900
            border
            border-slate-800
            rounded-xl
            shadow-sm
            px-5
            py-4
        ">

            <div className="
                flex
                flex-col
                lg:flex-row
                lg:items-center
                lg:justify-between
                gap-4
            ">

                {/* -------------------------------------------------
                    Connector identity
                ------------------------------------------------- */}

                <div className="
                    min-w-0
                ">

                    <div className="
                        flex
                        flex-wrap
                        items-center
                        gap-3
                    ">

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
                            text-blue-400
                            text-sm
                            font-semibold
                            flex-shrink-0
                        ">
                            ⛓
                        </div>

                        <h1 className="
                            text-xl
                            font-semibold
                            text-white
                            truncate
                        ">
                            {connector.machine_name || "Connector"}
                        </h1>

                        <span className={`
                            inline-flex
                            items-center
                            gap-1.5
                            px-2.5
                            py-1
                            rounded-md
                            border
                            text-xs
                            font-medium
                            ${statusClasses}
                        `}>

                            <span className={`
                                w-1.5
                                h-1.5
                                rounded-full
                                ${
                                    isDisabled
                                        ? "bg-amber-400"
                                        : isOnline
                                            ? "bg-green-400"
                                            : "bg-red-400"
                                }
                            `} />

                            {statusLabel}

                        </span>

                    </div>

                    <div className="
                        flex
                        flex-wrap
                        items-center
                        gap-x-3
                        gap-y-1
                        mt-2
                        ml-12
                        text-xs
                        text-slate-500
                    ">

                        <span>
                            {connector.account_name || "No account"}
                        </span>

                        {connector.account_number && (
                            <>
                                <span className="text-slate-700">
                                    •
                                </span>

                                <span className="font-mono">
                                    {connector.account_number}
                                </span>
                            </>
                        )}

                        {connector.connector_version && (
                            <>
                                <span className="text-slate-700">
                                    •
                                </span>

                                <span>
                                    v{connector.connector_version}
                                </span>
                            </>
                        )}

                    </div>

                </div>

                {/* -------------------------------------------------
                    Health + navigation
                ------------------------------------------------- */}

                <div className="
                    flex
                    items-center
                    justify-between
                    lg:justify-end
                    gap-3
                    flex-shrink-0
                ">

                    <div className={`
                        inline-flex
                        items-center
                        gap-2
                        px-3
                        py-2
                        rounded-lg
                        border
                        text-xs
                        font-medium
                        ${
                            healthy
                                ? "bg-green-500/5 border-green-500/15 text-green-400"
                                : "bg-amber-500/5 border-amber-500/15 text-amber-400"
                        }
                    `}>

                        <span className={`
                            w-1.5
                            h-1.5
                            rounded-full
                            ${
                                healthy
                                    ? "bg-green-400"
                                    : "bg-amber-400"
                            }
                        `} />

                        {healthy
                            ? "Healthy"
                            : "Needs Attention"}

                    </div>

                    <Link
                        to="/connectors"
                        className="
                            inline-flex
                            items-center
                            gap-2
                            px-3
                            py-2
                            rounded-lg
                            border
                            border-slate-700
                            bg-slate-900
                            hover:bg-slate-800
                            text-slate-300
                            hover:text-white
                            text-xs
                            font-medium
                            transition
                        "
                    >
                        <span>←</span>
                        Connectors
                    </Link>

                </div>

            </div>

        </div>
    );
}

export default ConnectorHeader;