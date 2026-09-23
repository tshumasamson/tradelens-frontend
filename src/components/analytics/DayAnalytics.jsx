import MetricCard from "../MetricCard";
import DayProfitChart from "../DayProfitChart";
import DayPerformanceTable from "../DayPerformanceTable";

function DayAnalytics({ days }) {
    const bestDay = days.length
        ? [...days].sort(
              (a, b) => Number(b.profit) - Number(a.profit)
          )[0]
        : null;

    const worstDay = days.length
        ? [...days].sort(
              (a, b) => Number(a.profit) - Number(b.profit)
          )[0]
        : null;

    const bestDayWinRate = days.length
        ? [...days].sort(
              (a, b) => Number(b.win_rate) - Number(a.win_rate)
          )[0]
        : null;

    // Profit determines the direction and colour of the arrow.
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

    const bestDayIcon = getProfitIcon(bestDay?.profit);
    const worstDayIcon = getProfitIcon(worstDay?.profit);

    return (
        <div className="space-y-5">

            {/* Section label */}
            <div>
                <h2 className="text-sm font-medium text-slate-300">
                    Daily Performance
                </h2>

                <p className="text-xs text-slate-500 mt-1">
                    Compare profitability and win rate across trading days.
                </p>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                {/* Best Day */}
                <MetricCard
                    title="Best Day"
                    prefix="$"
                    value={bestDay?.profit}
                    subtitle={bestDay?.day || "-"}
                    icon={bestDayIcon.icon}
                    iconColor={bestDayIcon.iconColor}
                    iconBg={bestDayIcon.iconBg}
                />

                {/* Worst Day */}
                <MetricCard
                    title="Worst Day"
                    prefix="$"
                    value={worstDay?.profit}
                    subtitle={worstDay?.day || "-"}
                    icon={worstDayIcon.icon}
                    iconColor={worstDayIcon.iconColor}
                    iconBg={worstDayIcon.iconBg}
                />

                {/* Best Win Rate */}
                <MetricCard
                    title="Best Win Rate"
                    value={bestDayWinRate?.win_rate}
                    suffix="%"
                    subtitle={bestDayWinRate?.day || "-"}
                    icon="◎"
                    iconColor="text-blue-400"
                    iconBg="bg-blue-500/10"
                />

            </div>

            {/* Chart + Table */}
            <div className="grid grid-cols-1 xl:grid-cols-5 gap-4">

                {/* Profit Chart */}
                <div className="xl:col-span-2 h-[450px]">
                    <DayProfitChart data={days} />
                </div>

                {/* Performance Table */}
                <div className="xl:col-span-3 h-[450px]">
                    <DayPerformanceTable days={days} />
                </div>

            </div>

        </div>
    );
}

export default DayAnalytics;