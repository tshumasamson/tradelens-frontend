function StrategyPerformanceTable({

    strategies

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
                Strategy Performance
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
                                Strategy
                            </th>

                            <th className="pb-4">
                                Trades
                            </th>

                            <th className="pb-4">
                                Wins
                            </th>

                            <th className="pb-4">
                                Losses
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

                            strategies.map(

                                (
                                    strategy
                                ) => (

                                    <tr

                                        key={
                                            strategy.strategy
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
                                                strategy.strategy
                                            }
                                        </td>

                                        <td
                                            className="
                                            py-4
                                            text-white
                                            "
                                        >
                                            {
                                                strategy.total_positions
                                            }
                                        </td>

                                        <td
                                            className="
                                            py-4
                                            text-green-400
                                            "
                                        >
                                            {
                                                strategy.winning_positions
                                            }
                                        </td>

                                        <td
                                            className="
                                            py-4
                                            text-red-400
                                            "
                                        >
                                            {
                                                strategy.losing_positions
                                            }
                                        </td>

                                        <td
                                            className="
                                            py-4
                                            text-blue-400
                                            "
                                        >
                                            {
                                                strategy.win_rate
                                            }%
                                        </td>

                                        <td
                                            className="
                                            py-4
                                            "
                                        >

                                            <span

                                                className={

                                                    strategy.total_profit >= 0

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
                                                    strategy.total_profit
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

                                                    strategy.average_profit >= 0

                                                    ? `
                                                        text-green-400
                                                      `

                                                    : `
                                                        text-red-400
                                                      `
                                                }

                                            >

                                                {
                                                    strategy.average_profit
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

export default StrategyPerformanceTable;