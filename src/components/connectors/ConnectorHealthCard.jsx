// components/connectors/ConnectorHealthCard.jsx

import {
    formatDateTime,
    formatTimeAgo
} from "../../utils/dateUtils";

import Card from "../common/Card";
import InfoRow from "../common/InfoRow";


function ConnectorHealthCard({
    connector
}) {

    const mt5Connected =
        connector.mt5_connected;

    const queueSize =
        connector.queue_size ?? 0;

    const deadLetterCount =
        connector.dead_letter_count ?? 0;


    function metricColor(
        value,
        warning = 10
    ) {

        if (value === 0) {
            return "text-emerald-400";
        }

        if (value <= warning) {
            return "text-amber-400";
        }

        return "text-red-400";

    }


    return (

        <Card>

            {/* Header */}

            <div
                className="
                flex
                items-center
                justify-between
                mb-4
                "
            >

                <div>

                    <h2
                        className="
                        text-[13px]
                        font-semibold
                        tracking-tight
                        text-slate-100
                        "
                    >
                        Connector Health
                    </h2>

                    <p
                        className="
                        mt-0.5
                        text-[11px]
                        text-slate-500
                        "
                    >
                        Runtime status and connectivity
                    </p>

                </div>


                {/* Health indicator */}

                <div
                    className={`
                    flex
                    items-center
                    gap-1.5
                    rounded-md
                    border
                    px-2
                    py-1
                    text-[10px]
                    font-medium
                    ${
                        mt5Connected
                            ? "border-emerald-500/20 bg-emerald-500/5 text-emerald-400"
                            : "border-red-500/20 bg-red-500/5 text-red-400"
                    }
                    `}
                >

                    <span
                        className={`
                        h-1.5
                        w-1.5
                        rounded-full
                        ${
                            mt5Connected
                                ? "bg-emerald-400"
                                : "bg-red-400"
                        }
                        `}
                    />

                    {
                        mt5Connected
                            ? "ONLINE"
                            : "OFFLINE"
                    }

                </div>

            </div>


            {/* Metrics */}

            <div
                className="
                divide-y
                divide-slate-800/70
                "
            >

                {/* MT5 */}

                <InfoRow
                    label="MT5 Connection"
                    value={

                        <div
                            className="
                            flex
                            items-center
                            gap-2
                            "
                        >

                            <span
                                className={`
                                h-1.5
                                w-1.5
                                rounded-full
                                ${
                                    mt5Connected
                                        ? "bg-emerald-400"
                                        : "bg-red-400"
                                }
                                `}
                            />

                            <span
                                className={`
                                text-xs
                                font-medium
                                ${
                                    mt5Connected
                                        ? "text-emerald-400"
                                        : "text-red-400"
                                }
                                `}
                            >

                                {
                                    mt5Connected
                                        ? "Connected"
                                        : "Disconnected"
                                }

                            </span>

                        </div>

                    }
                />


                {/* Queue */}

                <InfoRow
                    label="Pending Queue"
                    value={

                        <span
                            className={`
                            text-xs
                            font-semibold
                            tabular-nums
                            ${metricColor(queueSize)}
                            `}
                        >

                            {queueSize}

                        </span>

                    }
                />


                {/* Dead Letters */}

                <InfoRow
                    label="Dead Letters"
                    value={

                        <span
                            className={`
                            text-xs
                            font-semibold
                            tabular-nums
                            ${metricColor(deadLetterCount)}
                            `}
                        >

                            {deadLetterCount}

                        </span>

                    }
                />


                {/* Heartbeat */}

                <InfoRow
                    label="Heartbeat"
                    value={

                        <span
                            className="
                            text-xs
                            font-medium
                            text-slate-300
                            tabular-nums
                            "
                        >

                            {connector.heartbeat_interval ?? "-"}s

                        </span>

                    }
                />


                {/* Last Seen */}

                <InfoRow
                    label="Last Seen"
                    border={false}
                    value={

                        <div
                            className="
                            text-right
                            "
                        >

                            <div
                                className="
                                text-xs
                                font-medium
                                text-slate-200
                                "
                            >

                                {
                                    connector.last_seen
                                        ? formatTimeAgo(
                                            connector.last_seen
                                        )
                                        : "Never"
                                }

                            </div>


                            {
                                connector.last_seen && (

                                    <div
                                        className="
                                        mt-0.5
                                        text-[11px]
                                        text-slate-200
                                        "
                                    >

                                        {
                                            formatDateTime(
                                                connector.last_seen
                                            )
                                        }

                                    </div>

                                )
                            }

                        </div>

                    }
                />

            </div>

        </Card>

    );

}


export default ConnectorHealthCard;