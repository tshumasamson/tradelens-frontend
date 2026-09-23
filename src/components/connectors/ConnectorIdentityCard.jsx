// components/connectors/ConnectorIdentityCard.jsx

function ConnectorIdentityCard({ connector }) {

    const rows = [
        {
            label: "Machine",
            value: connector.machine_name || "-",
        },
        {
            label: "Version",
            value: connector.connector_version || "-",
        },
        {
            label: "Machine ID",
            value: connector.machine_id || "-",
            mono: true,
        },
        {
            label: "Operating System",
            value: connector.os_name || "-",
        },
    ];

    return (
        <div className="
            bg-slate-900
            border
            border-slate-800
            rounded-xl
            shadow-sm
            overflow-hidden
        ">

            <div className="
                px-5
                py-4
                border-b
                border-slate-800
            ">

                <h2 className="
                    text-sm
                    font-semibold
                    text-white
                ">
                    Connector Identity
                </h2>

                <p className="
                    text-xs
                    text-slate-500
                    mt-1
                ">
                    Connector installation details
                </p>

            </div>

            <div className="px-5">

                {rows.map((row, index) => (
                    <div
                        key={row.label}
                        className={`
                            flex
                            items-start
                            justify-between
                            gap-6
                            py-3.5
                            ${
                                index < rows.length - 1
                                    ? "border-b border-slate-800/70"
                                    : ""
                            }
                        `}
                    >

                        <span className="
                            text-xs
                            text-slate-500
                            flex-shrink-0
                        ">
                            {row.label}
                        </span>

                        <span className={`
                            text-sm
                            text-slate-200
                            font-medium
                            text-right
                            break-all
                            ${row.mono ? "font-mono text-xs" : ""}
                        `}>
                            {row.value}
                        </span>

                    </div>
                ))}

            </div>

        </div>
    );
}

export default ConnectorIdentityCard;