import MetricCard from "../MetricCard";

import StrategyProfitChart
from "../StrategyProfitChart";

import StrategyPerformanceTable
from "../StrategyPerformanceTable";


function StrategyAnalytics({

    strategies

}) {

    const bestStrategy =
        [...strategies]
            .sort(
                (a, b) =>
                    b.total_profit -
                    a.total_profit
            )[0];

    const worstStrategy =
        [...strategies]
            .sort(
                (a, b) =>
                    a.total_profit -
                    b.total_profit
            )[0];

    const mostActiveStrategy =
        [...strategies]
            .sort(
                (a, b) =>
                    b.total_positions -
                    a.total_positions
            )[0];

    const singleStrategy =
        strategies.length === 1;

    return (

        <>

            <div
                className="
                grid
                grid-cols-1
                md:grid-cols-3
                gap-6
                "
            >

                {

                    singleStrategy

                    ? (

                        <>

                            <MetricCard

                                title="Total Profit"

                                value={
                                    strategies[0]
                                    .total_profit
                                }

                                prefix="$"

                            />

                            <MetricCard

                                title="Win Rate"

                                value={
                                    strategies[0]
                                    .win_rate
                                }

                                suffix="%"

                            />

                            <MetricCard

                                title="Trades"

                                value={
                                    strategies[0]
                                    .total_positions
                                }

                            />

                        </>

                    )

                    : (

                        <>

                            <MetricCard

                                title="Best Strategy"

                                subtitle={
                                    bestStrategy.strategy
                                }

                                value={
                                    bestStrategy.total_profit
                                }

                                prefix="$"

                            />

                            <MetricCard

                                title="Worst Strategy"

                                subtitle={
                                    worstStrategy.strategy
                                }

                                value={
                                    worstStrategy.total_profit
                                }

                                prefix="$"

                            />

                            <MetricCard

                                title="Most Active Strategy"

                                subtitle={
                                    mostActiveStrategy.strategy
                                }

                                value={
                                    mostActiveStrategy.total_positions
                                }

                            />

                        </>

                    )

                }

            </div>

            <div
                className="
                grid
                grid-cols-1
                xl:grid-cols-5
                gap-6
                "
            >

                <div
                    className="
                    xl:col-span-2
                    h-[450px]
                    "
                >

                    <StrategyProfitChart
                        data={strategies}
                    />

                </div>

                <div
                    className="
                    xl:col-span-3
                    h-[450px]
                    "
                >

                    <StrategyPerformanceTable
                        strategies={strategies}
                    />

                </div>

            </div>

        </>

    );

}

export default StrategyAnalytics;