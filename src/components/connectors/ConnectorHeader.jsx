// components/connectors/ConnectorHeader.jsx

import {
    Link
}
from "react-router-dom";

import Card
from "../common/Card";

import StatusBadge
from "../common/StatusBadge";


function ConnectorHeader({

    connector

}) {

    const healthy =

        connector.status === "online"

        &&

        connector.mt5_connected

        &&

        connector.queue_size === 0;


    return (

        <Card>

            <div
                className="
                flex
                justify-between
                items-start
                "
            >

                <div>

                    <div
                        className="
                        flex
                        items-center
                        gap-4
                        "
                    >

                        <h1
                            className="
                            text-3xl
                            font-bold
                            text-white
                            "
                        >

                            {connector.machine_name}

                        </h1>

                        <StatusBadge

                            color={

                                connector.status === "online"

                                    ? "green"

                                    : connector.status === "disabled"

                                    ? "yellow"

                                    : "red"

                            }

                        >

                            {

                                connector.status
                                    .toUpperCase()

                            }

                        </StatusBadge>

                    </div>

                    <p
                        className="
                        text-slate-400
                        mt-2
                        "
                    >

                        {connector.account_name}

                        {" • "}

                        {connector.account_number}

                    </p>

                </div>

                <div
                    className="
                    flex
                    items-center
                    gap-4
                    "
                >

                    <StatusBadge
                        color={
                            healthy
                                ? "green"
                                : "yellow"
                        }
                    >

                        {

                            healthy

                                ?

                                "Healthy"

                                :

                                "Needs Attention"

                        }

                    </StatusBadge>

                    <Link

                        to="/connectors"

                        className="
                        bg-slate-700
                        hover:bg-slate-600
                        text-white
                        px-4
                        py-2
                        rounded-lg
                        "

                    >

                        Back

                    </Link>

                </div>

            </div>

        </Card>

    );

}

export default ConnectorHeader;