import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    Cell
} from "recharts";


function StrategyComparisonProfitChart({
    strategies
}) {

    return (

        <div className="
            bg-slate-900
            border
            border-slate-800
            rounded-xl
            shadow-sm
            h-[450px]
            flex
            flex-col
            overflow-hidden
        ">

            {/* ---------------------------------------------- */}
            {/* Header */}
            {/* ---------------------------------------------- */}

            <div className="
                px-5
                py-4
                border-b
                border-slate-800
                flex-shrink-0
            ">

                <h2 className="
                    text-white
                    text-base
                    font-semibold
                ">
                    Profit Comparison
                </h2>

                <p className="
                    text-slate-500
                    text-xs
                    mt-1
                ">
                    Net trading profit by strategy
                </p>

            </div>


            {/* ---------------------------------------------- */}
            {/* Chart */}
            {/* ---------------------------------------------- */}

            <div className="
                flex-1
                min-h-0
                px-4
                pb-4
                pt-3
            ">

                <ResponsiveContainer
                    width="100%"
                    height="100%"
                >

                    <BarChart
                        data={strategies}
                        margin={{
                            top: 10,
                            right: 10,
                            left: 0,
                            bottom: 25
                        }}
                    >

                        <CartesianGrid
                            stroke="#1e293b"
                            strokeDasharray="3 3"
                            vertical={false}
                        />


                        <XAxis

                            dataKey="strategy"

                            tick={{
                                fill: "#94a3b8",
                                fontSize: 11
                            }}

                            axisLine={false}

                            tickLine={false}

                            interval={0}

                            angle={
                                strategies.length > 5
                                    ? -25
                                    : 0
                            }

                            textAnchor={
                                strategies.length > 5
                                    ? "end"
                                    : "middle"
                            }

                        />


                        <YAxis

                            tick={{
                                fill: "#94a3b8",
                                fontSize: 11
                            }}

                            axisLine={false}

                            tickLine={false}

                            tickFormatter={(value) =>
                                `$${value}`
                            }

                        />


                        <Tooltip

                            cursor={{
                                fill: "#1e293b",
                                opacity: 0.35
                            }}

                            contentStyle={{
                                backgroundColor: "#0f172a",
                                border: "1px solid #334155",
                                borderRadius: "8px"
                            }}

                            labelStyle={{
                                color: "#e2e8f0",
                                fontSize: 12,
                                marginBottom: 4
                            }}

                            itemStyle={{
                                fontSize: 12
                            }}

                            formatter={(value) => [
                                `$${Number(value).toFixed(2)}`,
                                "Profit"
                            ]}

                        />


                        <Bar
                            dataKey="profit"
                            radius={[4, 4, 0, 0]}
                            maxBarSize={55}
                        >

                            {strategies.map(
                                (item, index) => (

                                    <Cell

                                        key={index}

                                        fill={
                                            Number(item.profit) >= 0
                                                ? "#22c55e"
                                                : "#ef4444"
                                        }

                                    />

                                )
                            )}

                        </Bar>

                    </BarChart>

                </ResponsiveContainer>

            </div>

        </div>

    );

}


export default StrategyComparisonProfitChart;