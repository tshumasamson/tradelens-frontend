import {formatTimeAgo} from "../../utils/dateUtils";
import {formatDateTime} from "../../utils/dateUtils";

function ConnectorInfoCard({

    connector

}) {

    const statusColor =

        connector.status === "online"

            ? "text-green-400"

            : connector.status === "disabled"

            ? "text-yellow-400"

            : "text-red-400";

    return (

        <div
            className="
            bg-slate-900
            border
            border-slate-800
            rounded-2xl
            p-6
            "
        >

            <h2
                className="
                text-xl
                font-semibold
                text-white
                mb-6
                "
            >
                Connector Information
            </h2>

            <div
                className="
                grid
                grid-cols-1
                md:grid-cols-2
                gap-x-12
                gap-y-4
                "
            >

                <InfoRow
                    label="Machine"
                    value={connector.machine_name}
                />

                <InfoRow
                    label="Version"
                    value={connector.connector_version}
                />

                <InfoRow
                    label="Account"
                    value={connector.account_name}
                />

                <InfoRow
                    label="Account Number"
                    value={connector.account_number}
                />

                <InfoRow
                    label="Status"
                    value={
                        <span className={statusColor}>
                            {connector.status}
                        </span>
                    }
                />

                <InfoRow
                    label="MT5"
                    value={

                        connector.mt5_connected

                        ?

                        <span className="text-green-400">
                            Connected
                        </span>

                        :

                        <span className="text-red-400">
                            Disconnected
                        </span>

                    }
                />

                <InfoRow
                    label="Queue Size"
                    value={connector.queue_size}
                />

                <InfoRow
                    label="Dead Letters"
                    value={connector.dead_letter_count}
                />

                <InfoRow
                    label="Heartbeat Interval"
                    value={`${connector.heartbeat_interval}s`}
                />

                <InfoRow
                    label="Last Seen"
                    value={
                        <div>
                            <div>
                                {
                                    formatTimeAgo(
                                        connector.last_seen
                                    )
                                }
                            </div>

                            <div
                                className="
                                text-xs
                                text-slate-400
                                "
                            >
                                {
                                    formatDateTime(
                                        connector.last_seen
                                    )
                                }
                            </div>
                        </div>
                    }
                />

            </div>

        </div>

    );

}


function InfoRow({

    label,

    value

}) {

    return (

        <div>

            <div
                className="
                text-sm
                text-slate-400
                "
            >

                {label}

            </div>

            <div
                className="
                mt-1
                text-white
                font-medium
                "
            >

                {value}

            </div>

        </div>

    );

}

export default ConnectorInfoCard;