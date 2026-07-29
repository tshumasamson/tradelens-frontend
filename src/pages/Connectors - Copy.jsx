import {
    useEffect,
    useState
}
from "react";

import {
    getConnectors,
    disableConnector,
    enableConnector,
    getConnectorDashboard
}

from "../services/connectorApi";

import ConnectorMetrics from "../components/connectors/ConnectorMetrics";
import ConnectorTable from "../components/connectors/ConnectorTable";

function Connectors() {

    const [connectors,setConnectors] = useState([]);
    const [loading,setLoading] = useState(true);
    const [serverTime, setServerTime] = useState(null);

    const [dashboard,setDashboard] = useState(
        {
            total: 0,
            online: 0,
            offline: 0,
            disabled: 0
        }
    );

    const loadConnectors =
        async () => {
            try {
                const data =
                    await getConnectors();

                setServerTime(
                    data.server_time
                );

                setConnectors(
                    data.results
                );
            }
            finally {
                setLoading(false);
            }
        };

    const loadDashboard =
        async () => {
            try {
                const data =
                    await getConnectorDashboard();
                setDashboard(data);
            } catch (error) {
                console.error(error);
            }
        };

    const loadData =
        async () => {
            await Promise.all([
                loadConnectors(),
                loadDashboard()
            ]);
        };

    useEffect(() => {

        loadData();

        const interval =
            setInterval(
                loadData,
                10000
            );

        return () =>
            clearInterval(
                interval
            );

    }, []);


    if (
        !loading &&
        connectors.length === 0
    ) {

        return (

            <div
                className="
                p-8
                text-center
                "
            >

                <div
                    className="
                    text-6xl
                    mb-4
                    "
                >
                    🔌
                </div>

                <h2
                    className="
                    text-2xl
                    text-white
                    "
                >
                    No connectors found
                </h2>

                <p
                    className="
                    text-slate-400
                    mt-2
                    "
                >
                    Download and install
                    the TradeLens Connector
                    to start syncing trades.
                </p>

            </div>

        );

    }


    return (

    <div className="space-y-8">

        <h1
            className="
            text-3xl
            font-bold
            text-white
            mb-8
            "
        >
            Connectors
        </h1>

        <ConnectorMetrics
            dashboard={dashboard}
        />

        <ConnectorTable

            connectors={connectors}

            formatLastSeen={serverTime}

            loadConnectors={loadConnectors}

        />

    </div>

);

}

export default Connectors;

