// components/connectors/ConnectorHealthCard.jsx

import {
    formatDateTime,
    formatTimeAgo
}
from "../../utils/dateUtils";

import Card
from "../common/Card";

import InfoRow
from "../common/InfoRow";

import StatusBadge
from "../common/StatusBadge";


function ConnectorHealthCard({

    connector

}) {

    return (

        <Card
            title="Health"
        >

            <div
                className="
                space-y-5
                "
            >

                <InfoRow

                    label="MT5"

                    value={

                        <StatusBadge
                            color={
                                connector.mt5_connected
                                    ? "green"
                                    : "red"
                            }
                        >

                            {

                                connector.mt5_connected

                                    ? "Connected"

                                    : "Disconnected"

                            }

                        </StatusBadge>

                    }

                />

                <InfoRow

                    label="Queue"

                    value={

                        <StatusBadge
                            color={

                                connector.queue_size === 0

                                    ? "green"

                                    : connector.queue_size <= 10

                                    ? "yellow"

                                    : "red"

                            }
                        >

                            {connector.queue_size}

                        </StatusBadge>

                    }

                />

                <InfoRow

                    label="Dead Letters"

                    value={

                        <StatusBadge
                            color={

                                connector.dead_letter_count === 0

                                    ? "green"

                                    : connector.dead_letter_count <= 10

                                    ? "yellow"

                                    : "red"

                            }
                        >

                            {connector.dead_letter_count}

                        </StatusBadge>

                    }

                />

                <InfoRow

                    label="Heartbeat"

                    value={

                        <StatusBadge
                            color="blue"
                        >

                            {connector.heartbeat_interval}s

                        </StatusBadge>

                    }

                />

                <InfoRow

                    label="Last Seen"

                    border={false}

                    value={

                        <div
                            className="
                            text-right
                            "
                        >

                            <div
                                className="
                                text-white
                                "
                            >

                                {

                                    formatTimeAgo(
                                        connector.last_seen
                                    )

                                }

                            </div>

                            <div
                                className="
                                text-xs
                                text-slate-400
                                "
                            >

                                {

                                    formatDateTime(
                                        connector.last_seen
                                    )

                                }

                            </div>

                        </div>

                    }

                />

            </div>

        </Card>

    );

}

export default ConnectorHealthCard;