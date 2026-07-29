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

function StrategyProfitChart({

    data

}) {

    return (

        <div
            className="
            bg-slate-900
            border
            border-slate-800
            rounded-2xl
            p-6
            h-full
            "
        >

            <h2
                className="
                text-white
                text-2xl
                font-semibold
                mb-6
                "
            >
                Profit by Strategy
            </h2>

            <div
                className="
                h-[calc(100%-60px)]
                "
            >

                <ResponsiveContainer
                    width="100%"
                    height="100%"
                >

                    <BarChart
                        data={data}
                        margin={{
                            top: 10,
                            right: 20,
                            left: 0,
                            bottom: 10
                        }}
                    >

                        <CartesianGrid

                            stroke="#1e293b"

                            vertical={false}

                        />
                        <XAxis

                            dataKey="strategy"

                            interval={0}

                            angle={-35}

                            textAnchor="end"

                            height={90}

                            tick={{
                                fill: "#94a3b8",
                                fontSize: 12
                            }}

                            axisLine={false}

                            tickLine={false}

                        />

                        <YAxis

                            tick={{
                                fill: "#94a3b8",
                                fontSize: 12
                            }}

                            axisLine={false}

                            tickLine={false}

                        />

                        <Tooltip

                            formatter={(value) => [
                                Number(value).toFixed(2),
                                "Profit"
                            ]}

                            contentStyle={{

                                backgroundColor:
                                    "#0f172a",

                                border:
                                    "1px solid #334155",

                                borderRadius:
                                    "12px",

                                color:
                                    "#ffffff"

                            }}

                            labelStyle={{

                                color:
                                    "#ffffff"

                            }}

                        />

                        <Bar

                            dataKey="total_profit"

                            radius={[
                                8,
                                8,
                                0,
                                0
                            ]}

                        >

                            {

                                data.map(

                                    (
                                        entry,
                                        index
                                    ) => (

                                        <Cell

                                            key={index}

                                            fill={

                                                entry.total_profit >= 0

                                                ? "#22c55e"

                                                : "#ef4444"

                                            }

                                        />

                                    )

                                )

                            }

                        </Bar>

                    </BarChart>

                </ResponsiveContainer>

            </div>

        </div>

    );

}

export default StrategyProfitChart;