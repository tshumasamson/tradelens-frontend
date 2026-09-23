// components/connectors/ConnectorCommandHistory.jsx

import {
    useEffect,
    useState
} from "react";

import Card from "../common/Card";

import StatusBadge from "../common/StatusBadge";

import {
    getConnectorCommands
} from "../../services/connectorApi";

import {
    formatDateTime
} from "../../utils/dateUtils";


const PAGE_SIZE = 6;


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


    const [
        loading,
        setLoading
    ] = useState(true);


    const [
        error,
        setError
    ] = useState(null);


    async function loadCommands(
        page = 1
    ) {

        setLoading(true);

        setError(null);


        try {

            const data =
                await getConnectorCommands(
                    connectorId,
                    page
                );


            const results =
                data.results || [];


            setCommands(
                results
            );


            setCurrentPage(
                page
            );


            setHasNext(
                data.next !== null &&
                data.next !== undefined
            );


            setHasPrevious(
                data.previous !== null &&
                data.previous !== undefined
            );


            /*
             * Backend pagination uses 6 results
             * per page.
             *
             * Example:
             *
             * count = 9
             * page size = 6
             *
             * 9 / 6 = 1.5
             * ceil = 2 pages
             */

            setTotalPages(
                Math.max(
                    1,
                    Math.ceil(
                        (data.count || 0) /
                        PAGE_SIZE
                    )
                )
            );

        }

        catch (err) {

            console.error(
                err
            );


            setError(
                "Unable to load command history."
            );


            setCommands([]);

        }

        finally {

            setLoading(false);

        }

    }


    useEffect(() => {

        if (!connectorId) {
            return;
        }


        loadCommands(
            1
        );

    }, [connectorId]);


    function badgeColor(
        status
    ) {

        switch (
            status
        ) {

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


    function formatCommand(
        command
    ) {

        if (!command) {
            return "-";
        }


        return command.replaceAll(
            "_",
            " "
        );

    }


    return (

        <Card>


            {/* ------------------------------------------------ */}
            {/* Header */}
            {/* ------------------------------------------------ */}

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
                        text-sm
                        font-semibold
                        text-white
                        "
                    >

                        Command History

                    </h2>


                    <p
                        className="
                        text-xs
                        text-slate-500
                        mt-1
                        "
                    >

                        Recent commands sent to this connector

                    </p>

                </div>


                <div
                    className="
                    h-8
                    w-8
                    rounded-lg
                    bg-slate-800
                    border
                    border-slate-700
                    flex
                    items-center
                    justify-center
                    text-slate-400
                    text-sm
                    "
                >

                    ≡

                </div>

            </div>


            {/* ------------------------------------------------ */}
            {/* Error */}
            {/* ------------------------------------------------ */}

            {
                error && (

                    <div
                        className="
                        rounded-lg
                        border
                        border-red-500/20
                        bg-red-500/10
                        px-3
                        py-2.5
                        text-xs
                        text-red-300
                        "
                    >

                        {error}

                    </div>

                )
            }


            {/* ------------------------------------------------ */}
            {/* Loading */}
            {/* ------------------------------------------------ */}

            {
                loading && (

                    <div
                        className="
                        py-10
                        text-center
                        text-xs
                        text-slate-500
                        "
                    >

                        Loading command history...

                    </div>

                )
            }


            {/* ------------------------------------------------ */}
            {/* Empty State */}
            {/* ------------------------------------------------ */}

            {
                !loading &&
                !error &&
                commands.length === 0 && (

                    <div
                        className="
                        rounded-lg
                        border
                        border-dashed
                        border-slate-800
                        py-10
                        text-center
                        "
                    >

                        <div
                            className="
                            text-sm
                            text-slate-400
                            "
                        >

                            No commands have been issued.

                        </div>


                        <div
                            className="
                            text-xs
                            text-slate-600
                            mt-1
                            "
                        >

                            Connector actions will appear here.

                        </div>

                    </div>

                )
            }


            {/* ------------------------------------------------ */}
            {/* Command Table */}
            {/* ------------------------------------------------ */}

            {
                !loading &&
                !error &&
                commands.length > 0 && (

                    <>

                        <div
                            className="
                            overflow-x-auto
                            "
                        >

                            <table
                                className="
                                w-full
                                "
                            >

                                <thead>

                                    <tr
                                        className="
                                        border-b
                                        border-slate-800
                                        text-[11px]
                                        uppercase
                                        tracking-wider
                                        text-slate-500
                                        "
                                    >

                                        <th
                                            className="
                                            py-2.5
                                            pr-4
                                            text-left
                                            font-medium
                                            "
                                        >

                                            Time

                                        </th>


                                        <th
                                            className="
                                            py-2.5
                                            pr-4
                                            text-left
                                            font-medium
                                            "
                                        >

                                            Command

                                        </th>


                                        <th
                                            className="
                                            py-2.5
                                            text-left
                                            font-medium
                                            "
                                        >

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
                                                    border-slate-800/60
                                                    last:border-b-0
                                                    hover:bg-slate-800/30
                                                    transition
                                                    "
                                                >


                                                    {/* Time */}

                                                    <td
                                                        className="
                                                        py-3
                                                        pr-4
                                                        text-xs
                                                        text-slate-400
                                                        whitespace-nowrap
                                                        "
                                                    >

                                                        {
                                                            formatDateTime(
                                                                command.created_at
                                                            )
                                                        }

                                                    </td>


                                                    {/* Command */}

                                                    <td
                                                        className="
                                                        py-3
                                                        pr-4
                                                        "
                                                    >

                                                        <span
                                                            className="
                                                            text-sm
                                                            font-medium
                                                            text-slate-200
                                                            "
                                                        >

                                                            {
                                                                formatCommand(
                                                                    command.command
                                                                )
                                                            }

                                                        </span>

                                                    </td>


                                                    {/* Status */}

                                                    <td
                                                        className="
                                                        py-3
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

                        </div>


                        {/* ------------------------------------------------ */}
                        {/* Pagination */}
                        {/* ------------------------------------------------ */}

                        <div
                            className="
                            flex
                            items-center
                            justify-between
                            gap-3
                            mt-4
                            pt-3
                            border-t
                            border-slate-800
                            "
                        >


                            {/* Previous */}

                            <button
                                type="button"

                                disabled={
                                    !hasPrevious ||
                                    loading
                                }

                                onClick={() =>
                                    loadCommands(
                                        currentPage - 1
                                    )
                                }

                                className="
                                px-3
                                py-1.5
                                rounded-md
                                border
                                border-slate-800
                                bg-slate-900
                                text-xs
                                text-slate-400
                                hover:bg-slate-800
                                hover:text-white
                                disabled:opacity-30
                                disabled:cursor-not-allowed
                                "
                            >

                                ← Previous

                            </button>


                            {/* Page Indicator */}

                            <div
                                className="
                                text-xs
                                text-slate-500
                                "
                            >

                                Page{" "}

                                <span
                                    className="
                                    text-slate-300
                                    font-medium
                                    "
                                >

                                    {currentPage}

                                </span>


                                {" "}of{" "}


                                <span
                                    className="
                                    text-slate-300
                                    font-medium
                                    "
                                >

                                    {totalPages}

                                </span>

                            </div>


                            {/* Next */}

                            <button
                                type="button"

                                disabled={
                                    !hasNext ||
                                    loading
                                }

                                onClick={() =>
                                    loadCommands(
                                        currentPage + 1
                                    )
                                }

                                className="
                                px-3
                                py-1.5
                                rounded-md
                                border
                                border-slate-800
                                bg-slate-900
                                text-xs
                                text-slate-400
                                hover:bg-slate-800
                                hover:text-white
                                disabled:opacity-30
                                disabled:cursor-not-allowed
                                "
                            >

                                Next →

                            </button>

                        </div>

                    </>

                )
            }

        </Card>

    );

}


export default ConnectorCommandHistory;