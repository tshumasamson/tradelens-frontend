function StrategyPerformanceTable({ strategies }) {
    return (
        <div className="bg-slate-900 border border-slate-800 rounded-xl shadow-sm h-[450px] flex flex-col overflow-hidden">

            {/* Header */}
            <div className="px-5 py-4 border-b border-slate-800 flex items-center justify-between">
                <div>
                    <h2 className="text-white text-base font-semibold">
                        Strategy Performance
                    </h2>
                    <p className="text-slate-500 text-xs mt-1">
                        Performance by strategy
                    </p>
                </div>
            </div>

            {/* Table */}
            <div className="flex-1 min-h-0 overflow-auto">
                <table className="w-full min-w-[700px] text-sm">

                    <thead className="sticky top-0 z-10 bg-slate-900 border-b border-slate-800">
                        <tr className="text-xs uppercase tracking-wide text-slate-500">

                            <th className="text-left px-5 py-3 font-medium">
                                Strategy
                            </th>

                            <th className="text-right px-4 py-3 font-medium">
                                Trades
                            </th>

                            <th className="text-right px-4 py-3 font-medium">
                                Win Rate
                            </th>

                            <th className="text-right px-4 py-3 font-medium">
                                P&L
                            </th>

                            <th className="text-right px-5 py-3 font-medium">
                                Avg Trade
                            </th>

                        </tr>
                    </thead>

                    <tbody className="divide-y divide-slate-800/70">

                        {strategies.map((strategy, index) => {

                            const profit = Number(strategy.total_profit || 0);
                            const winRate = Number(strategy.win_rate || 0);
                            const totalPositions = Number(strategy.total_positions || 0);

                            const averageTrade =
                                totalPositions > 0
                                    ? profit / totalPositions
                                    : 0;

                            return (
                                <tr
                                    key={strategy.strategy || index}
                                    className="hover:bg-slate-800/30 transition"
                                >

                                    {/* Strategy */}
                                    <td className="px-5 py-3.5">
                                        <div className="text-slate-200 font-medium">
                                            {strategy.strategy || "-"}
                                        </div>
                                    </td>

                                    {/* Trades */}
                                    <td className="px-4 py-3.5 text-right text-slate-300 tabular-nums">
                                        {totalPositions.toLocaleString()}
                                    </td>

                                    {/* Win Rate */}
                                    <td className="px-4 py-3.5 text-right text-slate-300 tabular-nums">
                                        {winRate.toFixed(2)}%
                                    </td>

                                    {/* P&L */}
                                    <td
                                        className={`px-4 py-3.5 text-right font-semibold tabular-nums ${
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

                                    {/* Average Trade */}
                                    <td
                                        className={`px-5 py-3.5 text-right font-medium tabular-nums ${
                                            averageTrade > 0
                                                ? "text-green-400"
                                                : averageTrade < 0
                                                    ? "text-red-400"
                                                    : "text-slate-400"
                                        }`}
                                    >
                                        {averageTrade > 0 ? "+" : ""}
                                        ${averageTrade.toFixed(2)}
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

export default StrategyPerformanceTable;