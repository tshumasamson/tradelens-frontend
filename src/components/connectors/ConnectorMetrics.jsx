function ConnectorMetrics({ dashboard }) {
    const metrics = [
        {
            key: "total",
            label: "Total Connectors",
            value: Number(dashboard?.total || 0),
            description: "Registered connectors",
            icon: "◉",
            iconColor: "text-blue-400",
            iconBg: "bg-blue-500/10",
        },
        {
            key: "online",
            label: "Online",
            value: Number(dashboard?.online || 0),
            description: "Currently reporting",
            icon: "●",
            iconColor: "text-green-400",
            iconBg: "bg-green-500/10",
        },
        {
            key: "offline",
            label: "Offline",
            value: Number(dashboard?.offline || 0),
            description: "Not reporting",
            icon: "○",
            iconColor: "text-red-400",
            iconBg: "bg-red-500/10",
        },
        {
            key: "disabled",
            label: "Disabled",
            value: Number(dashboard?.disabled || 0),
            description: "Administratively disabled",
            icon: "!",
            iconColor: "text-amber-400",
            iconBg: "bg-amber-500/10",
        },
    ];

    return (
        <div className="
            grid
            grid-cols-2
            lg:grid-cols-4
            gap-3
        ">

            {metrics.map((metric) => (
                <div
                    key={metric.key}
                    className="
                        bg-slate-900
                        border
                        border-slate-800
                        rounded-xl
                        shadow-sm
                        px-4
                        py-4
                    "
                >

                    <div className="
                        flex
                        items-start
                        justify-between
                        gap-3
                    ">

                        {/* Metric information */}

                        <div className="min-w-0">

                            <p className="
                                text-xs
                                font-medium
                                text-slate-500
                            ">
                                {metric.label}
                            </p>

                            <p className="
                                text-2xl
                                font-semibold
                                text-white
                                tracking-tight
                                mt-1.5
                                tabular-nums
                            ">
                                {metric.value.toLocaleString()}
                            </p>

                            <p className="
                                text-xs
                                text-slate-600
                                mt-1
                            ">
                                {metric.description}
                            </p>

                        </div>

                        {/* Icon */}

                        <div
                            className={`
                                w-9
                                h-9
                                rounded-lg
                                ${metric.iconBg}
                                flex
                                items-center
                                justify-center
                                flex-shrink-0
                                ${metric.iconColor}
                                text-sm
                                font-semibold
                            `}
                        >
                            {metric.icon}
                        </div>

                    </div>

                </div>
            ))}

        </div>
    );
}

export default ConnectorMetrics;