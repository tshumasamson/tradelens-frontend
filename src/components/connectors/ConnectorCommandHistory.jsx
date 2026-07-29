import {

    useEffect,

    useState

}
from "react";

import Card
from "../common/Card";

import StatusBadge
from "../common/StatusBadge";

import {

    getConnectorCommands

}
from "../../services/connectorApi";

import {
    formatDateTime
}
from "../../utils/dateUtils";


function ConnectorCommandHistory({

    connectorId

}) {

    const [

        commands,

        setCommands

    ] = useState([]);

    const [

        currentPage,

        setCurrentPage

    ] = useState(1);

    const [

        totalPages,

        setTotalPages

    ] = useState(1);

    const [

        hasNext,

        setHasNext

    ] = useState(false);

    const [

        hasPrevious,

        setHasPrevious

    ] = useState(false);

    async function loadCommands(

        page = 1

    ) {

        const data =

            await getConnectorCommands(

                connectorId,

                page

            );

        setCommands(

            data.results || []

        );

        setCurrentPage(

            page

        );

        setHasNext(

            data.next !== null

        );

        setHasPrevious(

            data.previous !== null

        );

        setTotalPages(

            Math.ceil(

                data.count / data.results.length

            )

        );

    }

    useEffect(() => {

        loadCommands(1);

    }, [connectorId]);

    function badgeColor(status) {

        switch (status) {

            case "COMPLETED":

                return "green";

            case "FAILED":

                return "red";

            case "IN_PROGRESS":

                return "blue";

            default:

                return "yellow";

        }

    }

    return (

        <Card
            title="Command History"
        >

            {

                commands.length === 0

                ?

                <div
                    className="
                    text-slate-400
                    text-center
                    py-10
                    "
                >

                    No commands have been issued.

                </div>

                :

                <div
                    className="
                    max-h-[450px]
                    overflow-y-auto
                    "
                >

                    <table
                        className="
                        w-full
                        "
                    >

                        <thead
                            className="
                            sticky
                            top-0
                            bg-slate-900
                            z-10
                            "
                        >

                            <tr
                                className="
                                border-b
                                border-slate-800
                                text-slate-400
                                "
                            >

                                <th className="text-left py-3">
                                    Time
                                </th>

                                <th className="text-left py-3">
                                    Command
                                </th>

                                <th className="text-left py-3">
                                    Status
                                </th>

                            </tr>

                        </thead>
                    <tbody>

                        {

                            commands.map(

                                command => (

                                    <tr

                                        key={
                                            command.id
                                        }

                                        className="
                                        border-b
                                        border-slate-800
                                        "

                                    >

                                        <td
                                            className="
                                            py-4
                                            text-slate-300
                                            "
                                        >

                                            {

                                                formatDateTime(
                                                    command.created_at
                                                )

                                            }

                                        </td>

                                        <td
                                            className="
                                            py-4
                                            text-white
                                            font-medium
                                            "
                                        >

                                            {
                                                command.command
                                            }

                                        </td>

                                        <td
                                            className="
                                            py-4
                                            "
                                        >

                                            <StatusBadge
                                                color={
                                                    badgeColor(
                                                        command.status
                                                    )
                                                }
                                            >

                                                {
                                                    command.status
                                                }

                                            </StatusBadge>

                                        </td>

                                    </tr>

                                )

                            )

                        }

                    </tbody>

                </table>

                <div
                    className="
                    flex
                    items-center
                    justify-between
                    mt-6
                    pt-4
                    border-t
                    border-slate-800
                    "
                >

                    <button

                        disabled={!hasPrevious}

                        onClick={() =>
                            loadCommands(
                                currentPage - 1
                            )
                        }

                        className="
                        px-4
                        py-2
                        rounded-lg
                        bg-slate-800
                        hover:bg-slate-700
                        disabled:opacity-40
                        disabled:cursor-not-allowed
                        "
                    >

                        Previous

                    </button>

                    <div
                        className="
                        text-slate-400
                        "
                    >

                        Page {currentPage} of {totalPages}

                    </div>

                    <button

                        disabled={!hasNext}

                        onClick={() =>
                            loadCommands(
                                currentPage + 1
                            )
                        }

                        className="
                        px-4
                        py-2
                        rounded-lg
                        bg-slate-800
                        hover:bg-slate-700
                        disabled:opacity-40
                        disabled:cursor-not-allowed
                        "
                    >

                        Next

                    </button>

                </div>

            </div>

            }

        </Card>

    );

}

export default ConnectorCommandHistory;