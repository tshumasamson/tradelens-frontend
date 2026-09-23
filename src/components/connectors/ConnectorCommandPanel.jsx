import {
    useState
} from "react";

import Card from "../common/Card";

import {
    sendCommand
} from "../../services/connectorApi";


const COMMAND_GROUPS = [

    {
        title: "Operations",
        description: "Control the connector runtime.",
        commands: [

            {
                label: "Sync Now",
                command: "SYNC_NOW",
                description:
                    "Immediately synchronize pending trades.",
                icon: "↻"
            },

            {
                label: "Restart Connector",
                command: "RESTART",
                description:
                    "Restart the connector service.",
                icon: "↻"
            }

        ]
    },

    {
        title: "Configuration",
        description: "Manage connector configuration.",
        commands: [

            {
                label: "Reconfigure",
                command: "RECONFIGURE",
                description:
                    "Apply runtime configuration.",
                icon: "⚙"
            },

            {
                label: "Switch Trading Account",
                command: "SWITCH_ACCOUNT",
                description:
                    "Launch the provisioning wizard.",
                icon: "⇄"
            }

        ]
    }

];


function ConnectorCommandPanel({
    connector,
    reloadConnector
}) {

    const [
        executingCommand,
        setExecutingCommand
    ] = useState(null);

    const [
        error,
        setError
    ] = useState(null);


    async function executeCommand(
        command
    ) {

        if (
            executingCommand
        ) {
            return;
        }


        setError(null);

        setExecutingCommand(
            command
        );


        try {

            await sendCommand(
                connector.id,
                command
            );

            await reloadConnector();

        }

        catch (error) {

            console.error(
                error
            );

            setError(
                "Unable to send the command. Please try again."
            );

        }

        finally {

            setExecutingCommand(
                null
            );

        }

    }


    async function disableConnector() {

        const confirmed =
            window.confirm(
                "Disable this connector?\n\n" +
                "The connector will no longer be allowed to operate normally."
            );


        if (!confirmed) {
            return;
        }


        await executeCommand(
            "DISABLE"
        );

    }


    return (

        <Card>

            {/* Header */}

            <div
                className="
                flex
                items-center
                justify-between
                mb-5
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
                        Connector Actions
                    </h2>

                    <p
                        className="
                        text-xs
                        text-slate-500
                        mt-1
                        "
                    >
                        Send commands to this connector
                    </p>

                </div>


                <div
                    className="
                    h-8
                    w-8
                    rounded-lg
                    bg-blue-500/10
                    border
                    border-blue-500/20
                    flex
                    items-center
                    justify-center
                    text-blue-400
                    text-sm
                    "
                >
                    ⚡
                </div>

            </div>


            {/* Error */}

            {
                error && (

                    <div
                        className="
                        mb-5
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


            {/* Command Groups */}

            <div
                className="
                space-y-6
                "
            >

                {
                    COMMAND_GROUPS.map(
                        group => (

                            <div
                                key={
                                    group.title
                                }
                            >

                                <div
                                    className="
                                    mb-2.5
                                    "
                                >

                                    <h3
                                        className="
                                        text-[11px]
                                        font-semibold
                                        uppercase
                                        tracking-wider
                                        text-slate-500
                                        "
                                    >
                                        {
                                            group.title
                                        }
                                    </h3>

                                    <p
                                        className="
                                        text-xs
                                        text-slate-600
                                        mt-0.5
                                        "
                                    >
                                        {
                                            group.description
                                        }
                                    </p>

                                </div>


                                <div
                                    className="
                                    space-y-2
                                    "
                                >

                                    {
                                        group.commands.map(
                                            command => {

                                                const isExecuting =
                                                    executingCommand ===
                                                    command.command;


                                                return (

                                                    <button
                                                        key={
                                                            command.command
                                                        }

                                                        type="button"

                                                        disabled={
                                                            !!executingCommand
                                                        }

                                                        onClick={() =>
                                                            executeCommand(
                                                                command.command
                                                            )
                                                        }

                                                        className="
                                                        group
                                                        w-full
                                                        flex
                                                        items-center
                                                        gap-3
                                                        rounded-lg
                                                        border
                                                        border-slate-800
                                                        bg-slate-900/60
                                                        px-3
                                                        py-3
                                                        text-left
                                                        transition
                                                        hover:border-slate-700
                                                        hover:bg-slate-800
                                                        disabled:opacity-50
                                                        disabled:cursor-not-allowed
                                                        "
                                                    >

                                                        <div
                                                            className="
                                                            h-8
                                                            w-8
                                                            shrink-0
                                                            rounded-lg
                                                            bg-slate-800
                                                            border
                                                            border-slate-700
                                                            flex
                                                            items-center
                                                            justify-center
                                                            text-slate-300
                                                            text-sm
                                                            group-hover:text-white
                                                            "
                                                        >

                                                            {
                                                                isExecuting
                                                                    ? "..."
                                                                    : command.icon
                                                            }

                                                        </div>


                                                        <div
                                                            className="
                                                            min-w-0
                                                            flex-1
                                                            "
                                                        >

                                                            <div
                                                                className="
                                                                text-sm
                                                                font-medium
                                                                text-slate-200
                                                                "
                                                            >

                                                                {
                                                                    isExecuting
                                                                        ? "Sending..."
                                                                        : command.label
                                                                }

                                                            </div>

                                                            <div
                                                                className="
                                                                text-[11px]
                                                                text-slate-500
                                                                mt-0.5
                                                                "
                                                            >

                                                                {
                                                                    command.description
                                                                }

                                                            </div>

                                                        </div>


                                                        <div
                                                            className="
                                                            text-slate-600
                                                            group-hover:text-slate-400
                                                            transition
                                                            "
                                                        >
                                                            →
                                                        </div>

                                                    </button>

                                                );

                                            }
                                        )
                                    }

                                </div>

                            </div>

                        )
                    )
                }

            </div>


            {/* Divider */}

            <div
                className="
                border-t
                border-slate-800
                my-6
                "
            />


            {/* Danger Zone */}

            <div>

                <div
                    className="
                    mb-3
                    "
                >

                    <h3
                        className="
                        text-[11px]
                        font-semibold
                        uppercase
                        tracking-wider
                        text-red-400
                        "
                    >
                        Danger Zone
                    </h3>

                    <p
                        className="
                        text-xs
                        text-slate-600
                        mt-1
                        "
                    >
                        Actions that affect connector availability.
                    </p>

                </div>


                <button
                    type="button"
                    disabled={
                        !!executingCommand
                    }

                    onClick={
                        disableConnector
                    }

                    className="
                    w-full
                    flex
                    items-center
                    gap-3
                    rounded-lg
                    border
                    border-red-500/20
                    bg-red-500/5
                    px-3
                    py-3
                    text-left
                    transition
                    hover:bg-red-500/10
                    hover:border-red-500/30
                    disabled:opacity-50
                    disabled:cursor-not-allowed
                    "
                >

                    <div
                        className="
                        h-8
                        w-8
                        shrink-0
                        rounded-lg
                        bg-red-500/10
                        border
                        border-red-500/20
                        flex
                        items-center
                        justify-center
                        text-red-400
                        text-sm
                        "
                    >
                        !
                    </div>


                    <div
                        className="
                        min-w-0
                        flex-1
                        "
                    >

                        <div
                            className="
                            text-sm
                            font-medium
                            text-red-300
                            "
                        >

                            {
                                executingCommand === "DISABLE"
                                    ? "Disabling..."
                                    : "Disable Connector"
                            }

                        </div>

                        <div
                            className="
                            text-[11px]
                            text-red-400/70
                            mt-0.5
                            "
                        >
                            Prevent this connector from operating normally.
                        </div>

                    </div>


                    <div
                        className="
                        text-red-500/60
                        "
                    >
                        →
                    </div>

                </button>

            </div>

        </Card>

    );

}


export default ConnectorCommandPanel;