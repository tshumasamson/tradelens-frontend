function SymbolPerformanceTable({
    symbols
}) {

    return (

        <div
            className="
            bg-slate-900
            border
            border-slate-800
            rounded-2xl
            p-6
            h-full
            flex
            flex-col
            "
        >

            <h2
                className="
                text-white
                text-2xl
                font-semibold
                mb-6
                "
            >
                Symbol Performance
            </h2>

            <div
                className="
                flex-1
                overflow-y-auto
                overflow-x-auto
                "
            >

                <table
                    className="
                    w-full
                    text-left
                    "
                >

                    <thead>

                        <tr
                            className="
                            border-b
                            border-slate-800
                            text-slate-400
                            "
                        >

                            <th className="pb-4">
                                Symbol
                            </th>

                            <th className="pb-4">
                                Positions
                            </th>

                            <th className="pb-4">
                                Win Rate
                            </th>

                            <th className="pb-4">
                                Profit
                            </th>

                            <th className="pb-4">
                                Avg Trade
                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {

                            symbols.map(

                                (
                                    symbol
                                ) => (

                                    <tr

                                        key={
                                            symbol.symbol
                                        }

                                        className="
                                        border-b
                                        border-slate-800
                                        hover:bg-slate-800/50
                                        transition
                                        "

                                    >

                                        <td
                                            className="
                                            py-4
                                            text-white
                                            font-medium
                                            "
                                        >
                                            {
                                                symbol.symbol
                                            }
                                        </td>

                                        <td
                                            className="
                                            py-4
                                            text-white
                                            "
                                        >
                                            {
                                                symbol.positions
                                            } 
                                        </td>

                                        <td
                                            className="
                                            py-4
                                            text-blue-400
                                            "
                                        >
                                            {
                                                symbol.win_rate
                                            }%
                                        </td>

                                        <td
                                            className="
                                            py-4
                                            "
                                        >

                                            <span

                                                className={

                                                        symbol.profit >= 0

                                                    ? `
                                                        bg-green-500/20
                                                        text-green-400
                                                        px-3
                                                        py-1
                                                        rounded-full
                                                      `

                                                    : `
                                                        bg-red-500/20
                                                        text-red-400
                                                        px-3
                                                        py-1
                                                        rounded-full
                                                      `
                                                }

                                            >

                                                {
                                                    symbol.profit
                                                }

                                            </span>

                                        </td>

                                        <td
                                            className="
                                            py-4
                                            "
                                        >

                                            <span

                                                className={

                                                    symbol.avg_trade >= 0

                                                    ? `
                                                        text-green-400
                                                      `

                                                    : `
                                                        text-red-400
                                                      `
                                                }

                                            >

                                                {
                                                    symbol.avg_trade
                                                }

                                            </span>

                                        </td>

                                    </tr>

                                )

                            )

                        }

                    </tbody>

                </table>

            </div>

        </div>

    );

}

export default SymbolPerformanceTable;