import {

    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid

} from "recharts";

function EquityChart({

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
            shadow-lg
            "
        >

            <div
                className="
                flex
                justify-between
                items-center
                mb-6
                "
            >

                <h2
                    className="
                    text-white
                    text-xl
                    font-semibold
                    "
                >
                    Equity Curve
                </h2>

                <span
                    className="
                    text-slate-400
                    text-sm
                    "
                >
                    Closed Trades
                </span>

            </div>

            <div
                className="
                w-full
                h-[400px]
                "
            >

                <ResponsiveContainer
                    width="100%"
                    height="100%"
                >

                    <LineChart
                        data={data}
                    >

                        <CartesianGrid
                            stroke="#334155"
                            strokeDasharray="3 3"
                        />

                        <XAxis
                            dataKey="date"
                            tickFormatter={(value) =>
                                new Date(value)
                                .toLocaleDateString()
                            }
                            stroke="#94a3b8"
                        />

                        <YAxis
                            stroke="#94a3b8"
                        />

                        <Tooltip

                            contentStyle={{
                                backgroundColor:
                                    "#0f172a",

                                border:
                                    "1px solid #334155"
                            }}

                            labelStyle={{
                                color: "#fff"
                            }}
                        />

                        <Line

                            type="monotone"

                            dataKey="equity"

                            stroke="#3b82f6"

                            strokeWidth={3}

                            dot={false}

                        />

                    </LineChart>

                </ResponsiveContainer>

            </div>

        </div>

    );

}

export default EquityChart;