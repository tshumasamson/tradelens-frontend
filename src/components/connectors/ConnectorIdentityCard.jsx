// components/connectors/ConnectorIdentityCard.jsx

import Card
from "../common/Card";

import InfoRow
from "../common/InfoRow";


function ConnectorIdentityCard({

    connector

}) {

    return (

        <Card
            title="Identity"
        >

            <div
                className="
                space-y-5
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

                    label="Machine ID"

                    value={
                        connector.machine_id
                        ||
                        "-"
                    }

                />

                <InfoRow

                    label="Operating System"

                    value={
                        connector.os_name
                        ||
                        "-"
                    }

                    border={false}

                />

            </div>

        </Card>

    );

}

export default ConnectorIdentityCard;