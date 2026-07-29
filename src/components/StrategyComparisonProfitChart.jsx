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

        <div
            className="
            bg-slate-900
            border
            border-slate-800
            rounded-2xl
            p-6
            "
        >

            <h2
                className="
                text-white
                text-xl
                font-semibold
                mb-6
                "
            >
                Profit Comparison
            </h2>

            <div
                className="
                h-[400px]
                "
            >

                <ResponsiveContainer>

                    <BarChart
                        data={strategies}
                    >

                        <CartesianGrid
                            stroke="#1e293b"
                        />

                        <XAxis
                            dataKey="strategy"
                        />

                        <YAxis />

                        <Tooltip />

                        <Bar
                            dataKey="profit"
                        >

                            {

                                strategies.map(

                                    (
                                        item,
                                        index
                                    ) => (

                                        <Cell

                                            key={
                                                index
                                            }

                                            fill={

                                                item.profit >= 0

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

export default StrategyComparisonProfitChart;