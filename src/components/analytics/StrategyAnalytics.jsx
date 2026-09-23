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

    const getProfitIcon = (profit) => {
        const numericProfit = Number(profit);

        if (numericProfit < 0) {
            return {
                icon: "↘︎",
                iconColor: "text-red-400",
                iconBg: "bg-red-500/10",
            };
        }

        return {
            icon: "↗︎",
            iconColor: "text-green-400",
            iconBg: "bg-green-500/10",
        };
    };
    const bestStrategyIcon = getProfitIcon(bestStrategy?.total_profit);
    const worstStrategyIcon = getProfitIcon(worstStrategy?.total_profit);

    return (

        <>
            <div className="mb-3">
                <h2 className="text-sm font-medium text-slate-300">
                    Strategy Performance
                </h2>

                <p className="text-xs text-slate-500 mt-1">
                    Compare profitability and trading activity across strategies.
                </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                <MetricCard
                    title="Best Strategy"
                    prefix="$"
                    value={bestStrategy?.total_profit}
                    subtitle={bestStrategy?.strategy || "-"}
                    icon={bestStrategyIcon.icon}
                    iconColor={bestStrategyIcon.iconColor}
                    iconBg={bestStrategyIcon.iconBg}
                />

                <MetricCard
                    title="Worst Strategy"
                    prefix="$"
                    value={worstStrategy?.total_profit}
                    subtitle={worstStrategy?.strategy|| "-"}
                    icon={worstStrategyIcon.icon}
                    iconColor={worstStrategyIcon.iconColor}
                    iconBg={worstStrategyIcon.iconBg}
                />

                <MetricCard
                    title="Most Active Strategy"
                    value={mostActiveStrategy?.total_positions}
                    subtitle={mostActiveStrategy?.strategy || "-"}
                    icon="▥"
                    iconColor="text-blue-400"
                    iconBg="bg-blue-500/10"
                />

            </div>

            <div className="grid grid-cols-1 xl:grid-cols-5 gap-4">

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