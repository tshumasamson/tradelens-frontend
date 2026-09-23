import MetricCard from "../MetricCard";
import SessionProfitChart from "../SessionProfitChart";
import SessionPerformanceTable from "../SessionPerformanceTable";

function SessionAnalytics({ sessions }) {
    const bestSession = sessions.length
        ? [...sessions].sort(
              (a, b) => Number(b.profit) - Number(a.profit)
          )[0]
        : null;

    const worstSession = sessions.length
        ? [...sessions].sort(
              (a, b) => Number(a.profit) - Number(b.profit)
          )[0]
        : null;

    const bestSessionWinRate = sessions.length
        ? [...sessions].sort(
              (a, b) => Number(b.win_rate) - Number(a.win_rate)
          )[0]
        : null;

    // Profit determines arrow direction and colour.
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

    const bestSessionIcon = getProfitIcon(bestSession?.profit);
    const worstSessionIcon = getProfitIcon(worstSession?.profit);

    return (
        <div className="space-y-5">

            {/* Section label */}
            <div>
                <h2 className="text-sm font-medium text-slate-300">
                    Session Performance
                </h2>

                <p className="text-xs text-slate-500 mt-1">
                    Compare profitability and win rate across trading sessions.
                </p>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                {/* Best Session */}
                <MetricCard
                    title="Best Session"
                    prefix="$"
                    value={bestSession?.profit}
                    subtitle={bestSession?.session || "-"}
                    icon={bestSessionIcon.icon}
                    iconColor={bestSessionIcon.iconColor}
                    iconBg={bestSessionIcon.iconBg}
                />

                {/* Worst Session */}
                <MetricCard
                    title="Worst Session"
                    prefix="$"
                    value={worstSession?.profit}
                    subtitle={worstSession?.session || "-"}
                    icon={worstSessionIcon.icon}
                    iconColor={worstSessionIcon.iconColor}
                    iconBg={worstSessionIcon.iconBg}
                />

                {/* Best Win Rate */}
                <MetricCard
                    title="Best Win Rate"
                    value={bestSessionWinRate?.win_rate}
                    suffix="%"
                    subtitle={bestSessionWinRate?.session || "-"}
                    icon="◎"
                    iconColor="text-blue-400"
                    iconBg="bg-blue-500/10"
                />

            </div>

            {/* Chart + Table */}
            <div className="grid grid-cols-1 xl:grid-cols-5 gap-4">

                {/* Profit Chart */}
                <div className="xl:col-span-2 h-[450px]">
                    <SessionProfitChart data={sessions} />
                </div>

                {/* Performance Table */}
                <div className="xl:col-span-3 h-[450px]">
                    <SessionPerformanceTable sessions={sessions} />
                </div>

            </div>

        </div>
    );
}

export default SessionAnalytics;