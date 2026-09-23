import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    Cell,
} from "recharts";

function DayProfitChart({ data }) {
    return (
        <div className="bg-slate-900 border border-slate-800 rounded-xl shadow-sm h-[450px] flex flex-col overflow-hidden">

            {/* Header */}
            <div className="px-5 py-4 border-b border-slate-800">
                <h2 className="text-white text-base font-semibold">
                    Profit by Day
                </h2>

                <p className="text-slate-500 text-xs mt-1">
                    Profit and loss by trading day
                </p>
            </div>

            {/* Chart */}
            <div className="flex-1 min-h-0 px-4 pb-4 pt-2">

                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={data}
                        margin={{
                            top: 10,
                            right: 10,
                            left: 0,
                            bottom: 10,
                        }}
                    >

                        <CartesianGrid
                            stroke="#1e293b"
                            vertical={false}
                            strokeDasharray="3 3"
                        />

                        <XAxis
                            dataKey="day"
                            interval={0}
                            angle={-35}
                            textAnchor="end"
                            height={70}
                            tick={{
                                fill: "#94a3b8",
                                fontSize: 12,
                            }}
                            axisLine={false}
                            tickLine={false}
                        />

                        <YAxis
                            tick={{
                                fill: "#94a3b8",
                                fontSize: 12,
                            }}
                            axisLine={false}
                            tickLine={false}
                        />

                        <Tooltip
                            cursor={{
                                fill: "rgba(51, 65, 85, 0.18)",
                            }}
                            contentStyle={{
                                backgroundColor: "#0f172a",
                                border: "1px solid #334155",
                                borderRadius: "8px",
                            }}
                            labelStyle={{
                                color: "#e2e8f0",
                                fontSize: 12,
                            }}
                            itemStyle={{
                                color: "#e2e8f0",
                                fontSize: 12,
                            }}
                            formatter={(value) => [
                                `$${Number(value).toFixed(2)}`,
                                "Profit",
                            ]}
                        />

                        <Bar
                            dataKey="profit"
                            radius={[5, 5, 0, 0]}
                            maxBarSize={55}
                        >
                            {data.map((entry, index) => (
                                <Cell
                                    key={`day-${index}`}
                                    fill={
                                        Number(entry.profit) >= 0
                                            ? "#22c55e"
                                            : "#ef4444"
                                    }
                                />
                            ))}
                        </Bar>

                    </BarChart>
                </ResponsiveContainer>

            </div>
        </div>
    );
}

export default DayProfitChart;