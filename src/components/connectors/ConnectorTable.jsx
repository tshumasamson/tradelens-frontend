import { useState } from "react";
import { Link } from "react-router-dom";

import {
    disableConnector,
    enableConnector,
} from "../../services/connectorApi";

import { formatTimeAgo } from "../../utils/dateUtils";

function ConnectorTable({
    connectors,
    formatLastSeen,
    loadConnectors,
}) {
    const [processingId, setProcessingId] = useState(null);

    // ---------------------------------------------------------
    // Disable connector
    // ---------------------------------------------------------

    const handleDisable = async (connectorId) => {
        const confirmed = window.confirm(
            "Disable this connector?\n\nThe connector will no longer be allowed to operate until it is enabled again."
        );

        if (!confirmed) {
            return;
        }

        try {
            setProcessingId(connectorId);

            await disableConnector(connectorId);

            await loadConnectors();
        } catch (error) {
            console.error(
                "Failed to disable connector:",
                error
            );

            window.alert(
                "Unable to disable the connector. Please try again."
            );
        } finally {
            setProcessingId(null);
        }
    };

    // ---------------------------------------------------------
    // Enable connector
    // ---------------------------------------------------------

    const handleEnable = async (connectorId) => {
        try {
            setProcessingId(connectorId);

            await enableConnector(connectorId);

            await loadConnectors();
        } catch (error) {
            console.error(
                "Failed to enable connector:",
                error
            );

            window.alert(
                "Unable to enable the connector. Please try again."
            );
        } finally {
            setProcessingId(null);
        }
    };

    // ---------------------------------------------------------
    // Status badge
    // ---------------------------------------------------------

    const renderStatus = (connector) => {
        if (connector.status === "disabled") {
            return (
                <span
                    className="
                        inline-flex
                        items-center
                        gap-1.5
                        px-2.5
                        py-1
                        rounded-md
                        bg-amber-500/10
                        border
                        border-amber-500/20
                        text-amber-400
                        text-xs
                        font-medium
                    "
                >
                    <span className="
                        w-1.5
                        h-1.5
                        rounded-full
                        bg-amber-400"
                    />

                    Disabled
                </span>
            );
        }

        if (connector.status === "online") {
            return (
                <span
                    className="
                        inline-flex
                        items-center
                        gap-1.5
                        px-2.5
                        py-1
                        rounded-md
                        bg-green-500/10
                        border
                        border-green-500/20
                        text-green-400
                        text-xs
                        font-medium
                    "
                >
                    <span className="
                        w-1.5
                        h-1.5
                        rounded-full
                        bg-green-400"
                    />

                    Online
                </span>
            );
        }

        return (
            <span
                className="
                    inline-flex
                    items-center
                    gap-1.5
                    px-2.5
                    py-1
                    rounded-md
                    bg-red-500/10
                    border
                    border-red-500/20
                    text-red-400
                    text-xs
                    font-medium
                "
            >
                <span className="
                    w-1.5
                    h-1.5
                    rounded-full
                    bg-red-400"
                />

                Offline
            </span>
        );
    };

    // ---------------------------------------------------------
    // MT5 status
    // ---------------------------------------------------------

    const renderMt5Status = (connector) => {
        if (connector.mt5_connected) {
            return (
                <span className="
                    inline-flex
                    items-center
                    gap-1.5
                    text-xs
                    font-medium
                    text-green-400
                ">
                    <span className="
                        w-1.5
                        h-1.5
                        rounded-full
                        bg-green-400"
                    />

                    Connected
                </span>
            );
        }

        return (
            <span className="
                inline-flex
                items-center
                gap-1.5
                text-xs
                font-medium
                text-slate-500
            ">
                <span className="
                    w-1.5
                    h-1.5
                    rounded-full
                    bg-slate-600"
                />

                Disconnected
            </span>
        );
    };

    // ---------------------------------------------------------
    // Queue status
    // ---------------------------------------------------------

    const renderQueue = (connector) => {
        const queue = Number(
            connector.queue_size || 0
        );

        if (queue === 0) {
            return (
                <span className="text-slate-400 tabular-nums">
                    0
                </span>
            );
        }

        return (
            <span className="
                inline-flex
                items-center
                px-2
                py-1
                rounded-md
                bg-amber-500/10
                border
                border-amber-500/20
                text-amber-400
                text-xs
                font-medium
                tabular-nums
            ">
                {queue.toLocaleString()}
            </span>
        );
    };

    // ---------------------------------------------------------
    // Dead letter status
    // ---------------------------------------------------------

    const renderDeadLetters = (connector) => {
        const count = Number(
            connector.dead_letter_count || 0
        );

        if (count === 0) {
            return (
                <span className="text-slate-400 tabular-nums">
                    0
                </span>
            );
        }

        return (
            <span className="
                inline-flex
                items-center
                px-2
                py-1
                rounded-md
                bg-red-500/10
                border
                border-red-500/20
                text-red-400
                text-xs
                font-medium
                tabular-nums
            ">
                {count.toLocaleString()}
            </span>
        );
    };

    return (
        <div className="
            bg-slate-900
            border
            border-slate-800
            rounded-xl
            shadow-sm
            overflow-hidden
        ">

            {/* -------------------------------------------------
                Header
            ------------------------------------------------- */}

            <div className="
                px-5
                py-4
                border-b
                border-slate-800
                flex
                items-center
                justify-between
                gap-4
            ">

                <div>
                    <h2 className="
                        text-sm
                        font-semibold
                        text-white
                    ">
                        Connector Fleet
                    </h2>

                    <p className="
                        text-xs
                        text-slate-500
                        mt-1
                    ">
                        Monitor connector connectivity and
                        synchronization health.
                    </p>
                </div>

                <span className="
                    text-xs
                    text-slate-600
                    whitespace-nowrap
                ">
                    {connectors.length}{" "}
                    {connectors.length === 1
                        ? "connector"
                        : "connectors"}
                </span>

            </div>

            {/* -------------------------------------------------
                Table
            ------------------------------------------------- */}

            <div className="overflow-x-auto">

                <table className="
                    w-full
                    min-w-[1100px]
                    text-sm
                ">

                    <thead className="
                        bg-slate-950/40
                        border-b
                        border-slate-800
                    ">

                        <tr className="
                            text-xs
                            uppercase
                            tracking-wide
                            text-slate-500
                        ">

                            <th className="
                                text-left
                                px-5
                                py-3
                                font-medium
                            ">
                                Machine
                            </th>

                            <th className="
                                text-left
                                px-4
                                py-3
                                font-medium
                            ">
                                Account
                            </th>

                            <th className="
                                text-left
                                px-4
                                py-3
                                font-medium
                            ">
                                Version
                            </th>

                            <th className="
                                text-left
                                px-4
                                py-3
                                font-medium
                            ">
                                Status
                            </th>

                            <th className="
                                text-right
                                px-4
                                py-3
                                font-medium
                            ">
                                Queue
                            </th>

                            <th className="
                                text-right
                                px-4
                                py-3
                                font-medium
                            ">
                                Dead Letters
                            </th>

                            <th className="
                                text-left
                                px-4
                                py-3
                                font-medium
                            ">
                                MT5
                            </th>

                            <th className="
                                text-left
                                px-4
                                py-3
                                font-medium
                            ">
                                Last Seen
                            </th>

                            <th className="
                                text-right
                                px-5
                                py-3
                                font-medium
                            ">
                                Actions
                            </th>

                        </tr>

                    </thead>

                    <tbody className="
                        divide-y
                        divide-slate-800/70
                    ">

                        {connectors.map((connector) => {

                            const isProcessing =
                                processingId === connector.id;

                            return (
                                <tr
                                    key={connector.id}
                                    className="
                                        hover:bg-slate-800/30
                                        transition
                                    "
                                >

                                    {/* Machine */}

                                    <td className="px-5 py-4">

                                        <div className="
                                            text-slate-100
                                            font-medium
                                        ">
                                            {connector.machine_name || "-"}
                                        </div>

                                        {connector.os_name && (
                                            <div className="
                                                text-xs
                                                text-slate-600
                                                mt-1
                                            ">
                                                {connector.os_name}
                                            </div>
                                        )}

                                    </td>

                                    {/* Account */}

                                    <td className="px-4 py-4">

                                        <div className="
                                            text-slate-300
                                            font-medium
                                        ">
                                            {connector.account_name || "-"}
                                        </div>

                                        <div className="
                                            text-xs
                                            text-slate-600
                                            mt-1
                                            font-mono
                                        ">
                                            {connector.account_number || "-"}
                                        </div>

                                    </td>

                                    {/* Version */}

                                    <td className="
                                        px-4
                                        py-4
                                        text-slate-400
                                        whitespace-nowrap
                                    ">
                                        {connector.connector_version || "-"}
                                    </td>

                                    {/* Status */}

                                    <td className="px-4 py-4">
                                        {renderStatus(connector)}
                                    </td>

                                    {/* Queue */}

                                    <td className="
                                        px-4
                                        py-4
                                        text-right
                                    ">
                                        {renderQueue(connector)}
                                    </td>

                                    {/* Dead letters */}

                                    <td className="
                                        px-4
                                        py-4
                                        text-right
                                    ">
                                        {renderDeadLetters(connector)}
                                    </td>

                                    {/* MT5 */}

                                    <td className="px-4 py-4">
                                        {renderMt5Status(connector)}
                                    </td>

                                    {/* Last seen */}

                                    <td className="
                                        px-4
                                        py-4
                                        text-slate-400
                                        whitespace-nowrap
                                    ">
                                        {formatTimeAgo(
                                            connector.last_seen,
                                            formatLastSeen
                                        )}
                                    </td>

                                    {/* Actions */}

                                    <td className="
                                        px-5
                                        py-4
                                        text-right
                                    ">

                                        <div className="
                                            flex
                                            items-center
                                            justify-end
                                            gap-2
                                        ">

                                            <Link
                                                to={`/connectors/${connector.id}`}
                                                className="
                                                    px-3
                                                    py-1.5
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
                                                View
                                            </Link>

                                            {connector.is_enabled ? (
                                                <button
                                                    type="button"
                                                    disabled={isProcessing}
                                                    onClick={() =>
                                                        handleDisable(
                                                            connector.id
                                                        )
                                                    }
                                                    className="
                                                        px-3
                                                        py-1.5
                                                        rounded-lg
                                                        border
                                                        border-red-500/20
                                                        bg-red-500/5
                                                        hover:bg-red-500/10
                                                        text-red-400
                                                        text-xs
                                                        font-medium
                                                        disabled:opacity-40
                                                        disabled:cursor-not-allowed
                                                        transition
                                                    "
                                                >
                                                    {isProcessing
                                                        ? "..."
                                                        : "Disable"}
                                                </button>
                                            ) : (
                                                <button
                                                    type="button"
                                                    disabled={isProcessing}
                                                    onClick={() =>
                                                        handleEnable(
                                                            connector.id
                                                        )
                                                    }
                                                    className="
                                                        px-3
                                                        py-1.5
                                                        rounded-lg
                                                        border
                                                        border-green-500/20
                                                        bg-green-500/5
                                                        hover:bg-green-500/10
                                                        text-green-400
                                                        text-xs
                                                        font-medium
                                                        disabled:opacity-40
                                                        disabled:cursor-not-allowed
                                                        transition
                                                    "
                                                >
                                                    {isProcessing
                                                        ? "..."
                                                        : "Enable"}
                                                </button>
                                            )}

                                        </div>

                                    </td>

                                </tr>
                            );
                        })}

                    </tbody>

                </table>

            </div>

        </div>
    );
}

export default ConnectorTable;