// components/connectors/ConnectorRegistrationCard.jsx

import Card
from "../common/Card";

import InfoRow
from "../common/InfoRow";

import {
    formatDateTime
}
from "../../utils/dateUtils";


function ConnectorRegistrationCard({

    connector

}) {

    return (

        <Card
            title="Registration"
        >

            <div
                className="
                space-y-5
                "
            >

                <InfoRow

                    label="IP Address"

                    value={
                        connector.ip_address
                        ||
                        "-"
                    }

                />

                <InfoRow

                    label="Created"

                    value={
                        formatDateTime(
                            connector.created_at
                        )
                    }

                />

                <InfoRow

                    label="Updated"

                    value={
                        formatDateTime(
                            connector.updated_at
                        )
                    }

                    border={false}

                />

            </div>

        </Card>

    );

}

export default ConnectorRegistrationCard;