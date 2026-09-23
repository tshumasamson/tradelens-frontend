// components/connectors/ConnectorRegistrationCard.jsx

import Card from "../common/Card";
import InfoRow from "../common/InfoRow";

import {
    formatDateTime
} from "../../utils/dateUtils";


function ConnectorRegistrationCard({
    connector
}) {

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
                        Registration
                    </h2>

                    <p
                        className="
                        text-xs
                        text-slate-500
                        mt-1
                        "
                    >
                        Connector registration details
                    </p>

                </div>

                <div
                    className="
                    h-8
                    w-8
                    rounded-lg
                    bg-purple-500/10
                    border
                    border-purple-500/20
                    flex
                    items-center
                    justify-center
                    text-purple-400
                    text-sm
                    "
                >
                    #
                </div>

            </div>


            {/* Registration Details */}

            <div
                className="
                divide-y
                divide-slate-800/70
                "
            >

                <InfoRow
                    label="IP Address"
                    value={
                        connector.ip_address || "-"
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
                    label="Last Updated"
                    border={false}
                    value={
                        formatDateTime(
                            connector.updated_at
                        )
                    }
                />

            </div>

        </Card>

    );

}


export default ConnectorRegistrationCard;