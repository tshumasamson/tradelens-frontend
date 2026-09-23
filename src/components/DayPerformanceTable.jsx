function DayPerformanceTable({ days }) {
    return (
        <div className="bg-slate-900 border border-slate-800 rounded-xl shadow-sm h-[450px] flex flex-col overflow-hidden">

            {/* Header */}
            <div className="px-5 py-4 border-b border-slate-800">
                <h2 className="text-white text-base font-semibold">
                    Day Performance
                </h2>

                <p className="text-slate-500 text-xs mt-1">
                    Performance by trading day
                </p>
            </div>

            {/* Table */}
            <div className="flex-1 min-h-0 overflow-auto">

                <table className="w-full min-w-[650px] text-sm">

                    <thead className="sticky top-0 z-10 bg-slate-900 border-b border-slate-800">

                        <tr className="text-xs uppercase tracking-wide text-slate-500">

                            <th className="text-left px-5 py-3 font-medium">
                                Day
                            </th>

                            <th className="text-right px-4 py-3 font-medium">
                                Trades
                            </th>

                            <th className="text-right px-4 py-3 font-medium">
                                Wins
                            </th>

                            <th className="text-right px-4 py-3 font-medium">
                                Win Rate
                            </th>

                            <th className="text-right px-5 py-3 font-medium">
                                P&L
                            </th>

                        </tr>

                    </thead>

                    <tbody className="divide-y divide-slate-800/70">

                        {days.map((day, index) => {

                            const profit = Number(day.profit || 0);
                            const positions = Number(day.positions || 0);
                            const wins = Number(day.wins || 0);
                            const winRate = Number(day.win_rate || 0);

                            return (
                                <tr
                                    key={day.day || index}
                                    className="hover:bg-slate-800/30 transition"
                                >

                                    {/* Day */}
                                    <td className="px-5 py-3.5 text-slate-200 font-medium">
                                        {day.day || "-"}
                                    </td>

                                    {/* Trades */}
                                    <td className="px-4 py-3.5 text-right text-slate-300 tabular-nums">
                                        {positions.toLocaleString()}
                                    </td>

                                    {/* Wins */}
                                    <td className="px-4 py-3.5 text-right text-slate-300 tabular-nums">
                                        {wins.toLocaleString()}
                                    </td>

                                    {/* Win Rate */}
                                    <td className="px-4 py-3.5 text-right text-slate-300 tabular-nums">
                                        {winRate.toFixed(2)}%
                                    </td>

                                    {/* P&L */}
                                    <td
                                        className={`px-5 py-3.5 text-right font-semibold tabular-nums ${
                                            profit > 0
                                                ? "text-green-400"
                                                : profit < 0
                                                    ? "text-red-400"
                                                    : "text-slate-300"
                                        }`}
                                    >
                                        {profit > 0 ? "+" : ""}
                                        ${profit.toFixed(2)}
                                    </td>

                                </tr>
                            );
                        })}

                    </tbody>

                </table>

            </div>
        </div>
    );
}

export default DayPerformanceTable;