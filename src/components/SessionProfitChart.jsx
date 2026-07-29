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

function SessionProfitChart({

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
                Session Profit
            </h2>

            <div
                className="
                h-[calc(100%-60px)]
                "
            >

                <ResponsiveContainer>

                    <BarChart
                        data={data}
                    >

                        <CartesianGrid

                            stroke="#1e293b"

                            vertical={false}

                        />

                        <XAxis

                            dataKey="session"
                            interval={0}

                            angle={-35}

                            textAnchor="end"

                            height={90}

                            tick={{
                                fill:"#94a3b8"
                            }}

                            axisLine={false}

                            tickLine={false}

                        />

                        <YAxis

                            tick={{
                                fill:"#94a3b8"
                            }}

                            axisLine={false}

                            tickLine={false}

                        />

                        <Tooltip />

                        <Bar
                            dataKey="profit"
                            radius={[8,8,0,0]}
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

                                                entry.profit >= 0

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

export default SessionProfitChart;