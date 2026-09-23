function MonthlyTable({ monthly = [] }) {

    return (

        <div className="
            h-[420px]
            flex
            flex-col
            overflow-hidden
            rounded-xl
            border
            border-slate-800
            bg-slate-900
            shadow-sm
        ">

            {/* Header */}

            <div className="
                flex-shrink-0
                border-b
                border-slate-800
                px-5
                py-4
            ">

                <h2 className="
                    text-[13px]
                    font-semibold
                    tracking-tight
                    text-slate-100
                ">
                    Monthly Performance
                </h2>

                <p className="
                    mt-0.5
                    text-[11px]
                    text-slate-500
                ">
                    Monthly trading performance
                </p>

            </div>


            {/* Scrollable Table Area */}

            <div className="
                min-h-0
                flex-1
                overflow-y-auto
                overflow-x-hidden
                scrollbar-thin
                scrollbar-track-slate-900
                scrollbar-thumb-slate-700
            ">

                <table className="
                    w-full
                    text-sm
                ">

                    {/* Table Header */}

                    <thead className="
                        sticky
                        top-0
                        z-10
                        border-b
                        border-slate-800
                        bg-slate-900
                    ">

                        <tr className="
                            text-[10px]
                            uppercase
                            tracking-wide
                            text-slate-500
                        ">

                            <th className="
                                px-5
                                py-3
                                text-left
                                font-medium
                            ">
                                Month
                            </th>

                            <th className="
                                px-4
                                py-3
                                text-right
                                font-medium
                            ">
                                P&L
                            </th>

                            <th className="
                                px-4
                                py-3
                                text-right
                                font-medium
                            ">
                                Win Rate
                            </th>

                            <th className="
                                px-5
                                py-3
                                text-right
                                font-medium
                            ">
                                Profit Factor
                            </th>

                        </tr>

                    </thead>


                    {/* Table Body */}

                    <tbody className="
                        divide-y
                        divide-slate-800/70
                    ">

                        {monthly.length === 0 ? (

                            <tr>

                                <td
                                    colSpan="4"
                                    className="
                                        px-5
                                        py-10
                                        text-center
                                        text-xs
                                        text-slate-500
                                    "
                                >
                                    No monthly performance data
                                </td>

                            </tr>

                        ) : (

                            monthly.map((row, index) => {

                                const profit =
                                    Number(
                                        row.net_trading_profit || 0
                                    );

                                const winRate =
                                    Number(
                                        row.win_rate || 0
                                    );

                                const profitFactor =
                                    Number(
                                        row.profit_factor || 0
                                    );


                                return (

                                    <tr
                                        key={
                                            row.month ||
                                            index
                                        }
                                        className="
                                            transition
                                            hover:bg-slate-800/30
                                        "
                                    >

                                        {/* Month */}

                                        <td className="
                                            px-5
                                            py-2.5
                                            text-xs
                                            font-medium
                                            text-slate-200
                                        ">
                                            {row.month || "-"}
                                        </td>


                                        {/* P&L */}

                                        <td
                                            className={`
                                                px-4
                                                py-2.5
                                                text-right
                                                text-xs
                                                font-semibold
                                                tabular-nums
                                                ${
                                                    profit > 0
                                                        ? "text-emerald-400"
                                                        : profit < 0
                                                            ? "text-red-400"
                                                            : "text-slate-300"
                                                }
                                            `}
                                        >
                                            {profit > 0 ? "+" : ""}
                                            ${profit.toFixed(2)}
                                        </td>


                                        {/* Win Rate */}

                                        <td className="
                                            px-4
                                            py-2.5
                                            text-right
                                            text-xs
                                            tabular-nums
                                            text-slate-300
                                        ">
                                            {winRate.toFixed(2)}%
                                        </td>


                                        {/* Profit Factor */}

                                        <td
                                            className={`
                                                px-5
                                                py-2.5
                                                text-right
                                                text-xs
                                                font-medium
                                                tabular-nums
                                                ${
                                                    profitFactor > 1
                                                        ? "text-emerald-400"
                                                        : profitFactor < 1
                                                            ? "text-red-400"
                                                            : "text-slate-300"
                                                }
                                            `}
                                        >
                                            {profitFactor.toFixed(2)}
                                        </td>

                                    </tr>

                                );

                            })

                        )}

                    </tbody>

                </table>

            </div>

        </div>

    );

}


export default MonthlyTable;