import { Link } from "react-router-dom";

import {
    disableConnector,
    enableConnector
}
from "../../services/connectorApi";

import {formatTimeAgo} from "../../utils/dateUtils";

function ConnectorTable({

    connectors,

    formatLastSeen,

    loadConnectors

}) {

    async function handleDisable(
        connectorId
    ) {

        await disableConnector(
            connectorId
        );

        loadConnectors();

    }


    async function handleEnable(
        connectorId
    ) {

        await enableConnector(
            connectorId
        );

        loadConnectors();

    }


    return (

        <div
            className="
            bg-slate-900
            border
            border-slate-800
            rounded-2xl
            overflow-hidden
            "
        >

            <table
                className="
                w-full
                text-white
                "
            >

                <thead>

                    <tr
                        className="
                        bg-slate-800
                        "
                    >

                        <th className="px-6 py-4 text-left">
                            Machine
                        </th>

                        <th className="px-6 py-4 text-left">
                            Account
                        </th>

                        <th className="px-6 py-4 text-left">
                            Version
                        </th>

                        <th className="px-6 py-4 text-left">
                            Status
                        </th>

                        <th className="px-6 py-4 text-left">
                            Queue
                        </th>

                        <th className="px-6 py-4 text-left">
                            Dead Letters
                        </th>

                        <th className="px-6 py-4 text-left">
                            MT5
                        </th>

                        <th className="px-6 py-4 text-left">
                            Last Seen
                        </th>

                        <th className="px-6 py-4 text-left">
                            Actions
                        </th>

                    </tr>

                </thead>

                <tbody>

                    {

                        connectors.map(

                            connector => (

                                <tr
                                    key={
                                        connector.id
                                    }
                                    className="
                                    border-t
                                    border-slate-800
                                    hover:bg-slate-800/40
                                    transition
                                    "
                                >

                                    <td className="px-6 py-4">
                                        {connector.machine_name}
                                    </td>

                                    <td className="px-6 py-4">

                                        <div>
                                            {connector.account_name}
                                        </div>

                                        <div
                                            className="
                                            text-xs
                                            text-slate-400
                                            "
                                        >
                                            {connector.account_number}
                                        </div>

                                    </td>

                                    <td className="px-6 py-4">
                                        {connector.connector_version}
                                    </td>

                                    <td className="px-6 py-4">

                                        <span
                                            className={
                                                connector.status === "online"

                                                ? "text-green-400"

                                                : connector.status === "disabled"

                                                ? "text-yellow-400"

                                                : "text-red-400"
                                            }
                                        >

                                            {connector.status}

                                        </span>

                                    </td>

                                    <td className="px-6 py-4">
                                        {connector.queue_size}
                                    </td>

                                    <td className="px-6 py-4">
                                        {connector.dead_letter_count}
                                    </td>

                                    <td className="px-6 py-4">

                                        {

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

                                    </td>

                                    <td className="px-6 py-4">

                                        {
                                            formatTimeAgo(
                                                connector.last_seen,
                                                formatLastSeen
                                            )
                                        }

                                    </td>

                                    <td
                                        className="
                                        px-6
                                        py-4
                                        space-x-2
                                        "
                                    >

                                        <Link

                                            to={`/connectors/${connector.id}`}

                                            className="
                                            bg-blue-600
                                            hover:bg-blue-700
                                            px-3
                                            py-2
                                            rounded-lg
                                            text-white
                                            text-sm
                                            "

                                        >

                                            View

                                        </Link>

                                        {

                                            connector.is_enabled

                                            ?

                                            <button

                                                onClick={
                                                    () =>
                                                        handleDisable(
                                                            connector.id
                                                        )
                                                }

                                                className="
                                                bg-red-600
                                                hover:bg-red-700
                                                px-3
                                                py-2
                                                rounded-lg
                                                text-white
                                                text-sm
                                                "

                                            >

                                                Disable

                                            </button>

                                            :

                                            <button

                                                onClick={
                                                    () =>
                                                        handleEnable(
                                                            connector.id
                                                        )
                                                }

                                                className="
                                                bg-green-600
                                                hover:bg-green-700
                                                px-3
                                                py-2
                                                rounded-lg
                                                text-white
                                                text-sm
                                                "

                                            >

                                                Enable

                                            </button>

                                        }

                                    </td>

                                </tr>

                            )

                        )

                    }

                </tbody>

            </table>

        </div>

    );

}

export default ConnectorTable;