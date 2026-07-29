// components/connectors/ConnectorMetrics.jsx

import MetricCard from "../MetricCard";

function ConnectorMetrics({
    dashboard
}) {

    return (
        <div
            className="
                grid
                grid-cols-1
                md:grid-cols-2
                xl:grid-cols-4
                gap-6
            "
        >
            <MetricCard
                title="Connectors"
                value={dashboard.total}
            />

            <MetricCard
                title="Online"
                value={dashboard.online}
            />

            <MetricCard
                title="Offline"
                value={dashboard.offline}
            />

            <MetricCard
                title="Disabled"
                value={dashboard.disabled}
            />
        </div>
    );
}

export default ConnectorMetrics;