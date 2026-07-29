import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {getConnector} from "../services/connectorApi";

import ConnectorHeader
from "../components/connectors/ConnectorHeader";

import ConnectorIdentityCard
from "../components/connectors/ConnectorIdentityCard";

import ConnectorHealthCard
from "../components/connectors/ConnectorHealthCard";

import ConnectorRegistrationCard
from "../components/connectors/ConnectorRegistrationCard";

import ConnectorCommandPanel
from "../components/connectors/ConnectorCommandPanel";

import ConnectorCommandHistory
from "../components/connectors/ConnectorCommandHistory";


function ConnectorDetail() {

    const { id } =
        useParams();

    const [
        connector,
        setConnector
    ] = useState(null);

    useEffect(() => {

        loadConnector();

    }, [id]);

    async function loadConnector() {

        const data =
            await getConnector(id);

        setConnector(data);

    }

    if (!connector) {

        return (

            <div className="p-8">

                Loading connector...

            </div>

        );

    }

    return (

        <div
            className="
            p-8
            space-y-6
            "
        >

            <ConnectorHeader
                connector={connector}
            />

            {/* Top Row */}

            <div
                className="
                grid
                grid-cols-1
                lg:grid-cols-2
                gap-6
                "
            >

                <ConnectorIdentityCard
                    connector={connector}
                />

                <ConnectorHealthCard
                    connector={connector}
                />

            </div>


            {/* Second Row */}

            {/* Registration + Actions */}

            <div
                className="
                grid
                grid-cols-1
                xl:grid-cols-4
                gap-6
                items-start
                "
            >

                {/* Left Side */}

                <div
                    className="
                    xl:col-span-2
                    space-y-6
                    "
                >

                    <ConnectorRegistrationCard
                        connector={connector}
                    />

                    <ConnectorCommandHistory
                        connectorId={id}
                    />

                </div>

                {/* Right Side */}

                <div
                    className="
                    xl:col-span-2
                    xl:sticky
                    xl:top-6
                    self-start
                    "
                >

                    <ConnectorCommandPanel
                        connector={connector}
                        reloadConnector={loadConnector}
                    />

                </div>

            </div>           

        </div>

    );

}

export default ConnectorDetail;