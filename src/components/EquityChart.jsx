import {
    ResponsiveContainer,
    AreaChart,
    Area,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
} from "recharts";

function EquityChart({ data }) {
    return (
        <div className="bg-slate-900 border border-slate-800 rounded-xl shadow-sm h-[420px] flex flex-col overflow-hidden">

            {/* Header */}
            <div className="px-5 py-4 border-b border-slate-800 flex-shrink-0 flex items-center justify-between">

                <div>
                    <h2 className="text-white text-base font-semibold">
                        Equity Curve
                    </h2>

                    <p className="text-slate-500 text-xs mt-1">
                        Account equity over time
                    </p>
                </div>

                <button
                    className="
                        bg-slate-800
                        border border-slate-700
                        text-slate-300
                        px-3 py-1.5
                        rounded-lg
                        text-xs
                        font-medium
                        hover:bg-slate-700
                        hover:text-white
                        transition
                    "
                >
                    Closed Trades
                </button>

            </div>

            {/* Chart */}
            <div className="flex-1 min-h-0 px-4 pb-4 pt-2">

                <ResponsiveContainer width="100%" height="100%">

                    <AreaChart
                        data={data}
                        margin={{
                            top: 10,
                            right: 10,
                            left: 0,
                            bottom: 5,
                        }}
                    >

                        <defs>

                            <linearGradient
                                id="equityGradient"
                                x1="0"
                                y1="0"
                                x2="0"
                                y2="1"
                            >

                                <stop
                                    offset="0%"
                                    stopColor="#1683f8"
                                    stopOpacity={0.30}
                                />

                                <stop
                                    offset="100%"
                                    stopColor="#1683f8"
                                    stopOpacity={0.02}
                                />

                            </linearGradient>

                        </defs>

                        {/* Grid */}
                        <CartesianGrid
                            stroke="#1e293b"
                            strokeDasharray="3 3"
                            vertical={false}
                        />

                        {/* X Axis */}
                        <XAxis
                            dataKey="date"
                            tickFormatter={(value) =>
                                new Date(value).toLocaleDateString(
                                    undefined,
                                    {
                                        month: "short",
                                        day: "numeric",
                                    }
                                )
                            }
                            tick={{
                                fill: "#94a3b8",
                                fontSize: 11,
                            }}
                            axisLine={false}
                            tickLine={false}
                        />

                        {/* Y Axis */}
                        <YAxis
                            tick={{
                                fill: "#94a3b8",
                                fontSize: 11,
                            }}
                            axisLine={false}
                            tickLine={false}
                        />

                        {/* Tooltip */}
                        <Tooltip
                            cursor={{
                                stroke: "#475569",
                                strokeDasharray: "3 3",
                            }}
                            contentStyle={{
                                backgroundColor: "#0f172a",
                                border: "1px solid #334155",
                                borderRadius: "8px",
                            }}
                            labelStyle={{
                                color: "#e2e8f0",
                                fontSize: 12,
                                marginBottom: 4,
                            }}
                            itemStyle={{
                                color: "#60a5fa",
                                fontSize: 12,
                            }}
                            formatter={(value) => [
                                `$${Number(value).toFixed(2)}`,
                                "Equity",
                            ]}
                        />

                        {/* Filled Area */}
                        <Area
                            type="monotone"
                            dataKey="equity"
                            stroke="none"
                            fill="url(#equityGradient)"
                            fillOpacity={1}
                        />

                        {/* Equity Line */}
                        <Area
                            type="monotone"
                            dataKey="equity"
                            stroke="#1683f8"
                            strokeWidth={2.5}
                            fill="none"
                            dot={false}
                            activeDot={{
                                r: 4,
                            }}
                        />

                    </AreaChart>

                </ResponsiveContainer>

            </div>
        </div>
    );
}

export default EquityChart;