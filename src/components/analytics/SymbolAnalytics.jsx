import MetricCard from "../MetricCard";
import SymbolProfitChart from "../SymbolProfitChart";
import SymbolPerformanceTable from "../SymbolPerformanceTable";

function SymbolAnalytics({ symbols }) {
    const bestSymbol = symbols.length
        ? [...symbols].sort(
              (a, b) => Number(b.profit) - Number(a.profit)
          )[0]
        : null;

    const worstSymbol = symbols.length
        ? [...symbols].sort(
              (a, b) => Number(a.profit) - Number(b.profit)
          )[0]
        : null;

    const mostTradedSymbol = symbols.length
        ? [...symbols].sort(
              (a, b) =>
                  Number(b.positions) - Number(a.positions)
          )[0]
        : null;

    const singleSymbol = symbols.length === 1;

    // Determine icon based on actual profit.
    // Positive/zero profit -> green upward arrow.
    // Negative profit -> red downward arrow.
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

    const bestSymbolIcon = getProfitIcon(bestSymbol?.profit);
    const worstSymbolIcon = getProfitIcon(worstSymbol?.profit);

    return (
        <div className="space-y-5">

            {/* Section label */}
            <div>
                <h2 className="text-sm font-medium text-slate-300">
                    Symbol Performance
                </h2>

                <p className="text-xs text-slate-500 mt-1">
                    Compare profitability and trading activity across symbols.
                </p>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                {singleSymbol ? (
                    <>
                        {/* Total Profit */}
                        <MetricCard
                            title="Total Profit"
                            prefix="$"
                            value={bestSymbol?.profit}
                            subtitle={bestSymbol?.symbol || "-"}
                            icon={bestSymbolIcon.icon}
                            iconColor={bestSymbolIcon.iconColor}
                            iconBg={bestSymbolIcon.iconBg}
                        />

                        {/* Win Rate */}
                        <MetricCard
                            title="Win Rate"
                            value={bestSymbol?.win_rate}
                            suffix="%"
                            subtitle={bestSymbol?.symbol || "-"}
                            icon="◎"
                            iconColor="text-blue-400"
                            iconBg="bg-blue-500/10"
                        />

                        {/* Average Trade */}
                        <MetricCard
                            title="Avg Trade"
                            prefix="$"
                            value={
                                Number(bestSymbol?.positions) > 0
                                    ? Number(bestSymbol.profit) /
                                      Number(bestSymbol.positions)
                                    : 0
                            }
                            subtitle={bestSymbol?.symbol || "-"}
                            icon="≋"
                            iconColor="text-purple-400"
                            iconBg="bg-purple-500/10"
                        />
                    </>
                ) : (
                    <>
                        {/* Best Symbol */}
                        <MetricCard
                            title="Best Symbol"
                            prefix="$"
                            value={bestSymbol?.profit}
                            subtitle={bestSymbol?.symbol || "-"}
                            icon={bestSymbolIcon.icon}
                            iconColor={bestSymbolIcon.iconColor}
                            iconBg={bestSymbolIcon.iconBg}
                        />

                        {/* Worst Symbol */}
                        <MetricCard
                            title="Worst Symbol"
                            prefix="$"
                            value={worstSymbol?.profit}
                            subtitle={worstSymbol?.symbol || "-"}
                            icon={worstSymbolIcon.icon}
                            iconColor={worstSymbolIcon.iconColor}
                            iconBg={worstSymbolIcon.iconBg}
                        />

                        {/* Most Traded Symbol */}
                        <MetricCard
                            title="Most Traded Symbol"
                            value={mostTradedSymbol?.positions}
                            subtitle={mostTradedSymbol?.symbol || "-"}
                            icon="▥"
                            iconColor="text-blue-400"
                            iconBg="bg-blue-500/10"
                        />
                    </>
                )}

            </div>

            {/* Chart + Table */}
            <div className="grid grid-cols-1 xl:grid-cols-5 gap-4">

                {/* Profit Chart */}
                <div className="xl:col-span-2 h-[450px]">
                    <SymbolProfitChart data={symbols} />
                </div>

                {/* Performance Table */}
                <div className="xl:col-span-3 h-[450px]">
                    <SymbolPerformanceTable symbols={symbols} />
                </div>

            </div>

        </div>
    );
}

export default SymbolAnalytics;