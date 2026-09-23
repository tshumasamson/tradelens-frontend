function MonthlyTable({ monthly }) {
    return (
        <div className="bg-slate-900 border border-slate-800 rounded-xl shadow-sm h-[420px] flex flex-col overflow-hidden">

            {/* Header */}
            <div className="px-5 py-4 border-b border-slate-800 flex-shrink-0">
                <h2 className="text-white text-base font-semibold">
                    Monthly Performance
                </h2>

                <p className="text-slate-500 text-xs mt-1">
                    Monthly trading performance
                </p>
            </div>

            {/* Table */}
            <div className="flex-1 min-h-0 overflow-hidden">

                <table className="w-full text-sm">

                    {/* Header */}
                    <thead className="bg-slate-900 border-b border-slate-800">

                        <tr className="text-xs uppercase tracking-wide text-slate-500">

                            <th className="text-left px-5 py-3 font-medium">
                                Month
                            </th>

                            <th className="text-right px-4 py-3 font-medium">
                                P&L
                            </th>

                            <th className="text-right px-4 py-3 font-medium">
                                Win Rate
                            </th>

                            <th className="text-right px-5 py-3 font-medium">
                                Profit Factor
                            </th>

                        </tr>

                    </thead>

                    {/* Body */}
                    <tbody className="divide-y divide-slate-800/70">

                        {monthly.map((row, index) => {

                            const profit = Number(
                                row.net_trading_profit || 0
                            );

                            const winRate = Number(
                                row.win_rate || 0
                            );

                            const profitFactor = Number(
                                row.profit_factor || 0
                            );

                            return (
                                <tr
                                    key={row.month || index}
                                    className="hover:bg-slate-800/30 transition"
                                >

                                    {/* Month */}
                                    <td className="px-5 py-2.5 text-slate-200 font-medium">
                                        {row.month || "-"}
                                    </td>

                                    {/* P&L */}
                                    <td
                                        className={`px-4 py-2.5 text-right font-semibold tabular-nums ${
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

                                    {/* Win Rate */}
                                    <td className="px-4 py-2.5 text-right text-slate-300 tabular-nums">
                                        {winRate.toFixed(2)}%
                                    </td>

                                    {/* Profit Factor */}
                                    <td
                                        className={`px-5 py-2.5 text-right font-medium tabular-nums ${
                                            profitFactor > 1
                                                ? "text-green-400"
                                                : profitFactor < 1
                                                    ? "text-red-400"
                                                    : "text-slate-300"
                                        }`}
                                    >
                                        {profitFactor.toFixed(2)}
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

export default MonthlyTable;