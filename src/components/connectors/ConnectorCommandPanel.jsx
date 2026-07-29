import Card
from "../common/Card";

import {
    sendCommand
}
from "../../services/connectorApi";


const COMMAND_GROUPS = [

    {

        title: "Operations",

        commands: [

            {

                label: "Sync Now",

                command: "SYNC_NOW",

                description:
                    "Immediately synchronize pending trades."

            },

            {

                label: "Restart Connector",

                command: "RESTART",

                description:
                    "Restart the connector service."

            }

        ]

    },

    {

        title: "Configuration",

        commands: [

            {

                label: "Reconfigure",

                command: "RECONFIGURE",

                description:
                    "Apply runtime configuration."

            },

            {

                label: "Switch Trading Account",

                command: "SWITCH_ACCOUNT",

                description:
                    "Launch the provisioning wizard."

            }

        ]

    }

];


function ConnectorCommandPanel({

    connector,

    reloadConnector

}) {

    async function executeCommand(

        command

    ) {

        try {

            await sendCommand(

                connector.id,

                command

            );

            reloadConnector();

        }

        catch (error) {

            console.error(error);

        }

    }

    return (

        <Card
            title="Actions"
        >

            {

                COMMAND_GROUPS.map(

                    group => (

                        <div

                            key={group.title}

                            className="mb-8"

                        >

                            <h3
                                className="
                                text-sm
                                font-semibold
                                uppercase
                                tracking-wide
                                text-slate-400
                                mb-3
                                "
                            >

                                {group.title}

                            </h3>

                            <div
                                className="
                                space-y-3
                                "
                            >

                                {

                                    group.commands.map(

                                        command => (

                                            <button

                                                key={
                                                    command.command
                                                }

                                                onClick={() =>
                                                    executeCommand(
                                                        command.command
                                                    )
                                                }

                                                className="
                                                w-full
                                                bg-slate-800
                                                hover:bg-slate-700
                                                border
                                                border-slate-700
                                                rounded-lg
                                                px-5
                                                py-4
                                                text-left
                                                transition
                                                "
                                            >

                                                <div
                                                    className="
                                                    text-white
                                                    font-semibold
                                                    "
                                                >

                                                    {
                                                        command.label
                                                    }

                                                </div>

                                                <div
                                                    className="
                                                    text-sm
                                                    text-slate-400
                                                    mt-1
                                                    "
                                                >

                                                    {
                                                        command.description
                                                    }

                                                </div>

                                            </button>

                                        )

                                    )

                                }

                            </div>

                        </div>

                    )

                )

            }

            <div
                className="
                border
                border-red-900
                rounded-lg
                p-5
                "
            >

                <h3
                    className="
                    text-red-400
                    font-semibold
                    mb-3
                    "
                >

                    Danger Zone

                </h3>

                <button

                    onClick={() =>
                        executeCommand(
                            "DISABLE"
                        )
                    }

                    className="
                    w-full
                    bg-red-900
                    hover:bg-red-800
                    border
                    border-red-700
                    rounded-lg
                    px-5
                    py-4
                    text-left
                    transition
                    "

                >

                    <div
                        className="
                        text-white
                        font-semibold
                        "
                    >

                        Disable Connector

                    </div>

                    <div
                        className="
                        text-red-300
                        text-sm
                        mt-1
                        "
                    >

                        Prevent this connector from sending any more data.

                    </div>

                </button>

            </div>

        </Card>

    );

}

export default ConnectorCommandPanel;