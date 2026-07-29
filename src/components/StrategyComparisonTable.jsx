function StrategyComparisonTable({

    strategies

}) {

    return (

        <div
            className="
            bg-slate-900
            border
            border-slate-800
            rounded-2xl
            overflow-hidden
            "
        >

            <table
                className="
                w-full
                "
            >

                <thead>

                    <tr
                        className="
                        border-b
                        border-slate-800
                        "
                    >

                        <th className="p-4 text-left text-slate-400">
                            Strategy
                        </th>

                        <th className="p-4 text-left text-slate-400">
                            Profit
                        </th>

                        <th className="p-4 text-left text-slate-400">
                            Win Rate
                        </th>

                        <th className="p-4 text-left text-slate-400">
                            Trades
                        </th>

                        <th className="p-4 text-left text-slate-400">
                            Avg Trade
                        </th>

                    </tr>

                </thead>

                <tbody>

                    {

                        strategies.map(

                            (strategy) => (

                                <tr

                                    key={
                                        strategy.strategy
                                    }

                                    className="
                                    border-b
                                    border-slate-800
                                    "

                                >

                                    <td className="p-4 text-white">

                                        {
                                            strategy.strategy
                                        }

                                    </td>

                                    <td

                                        className={

                                            strategy.profit >= 0

                                            ? "p-4 text-green-400"

                                            : "p-4 text-red-400"

                                        }

                                    >

                                        $

                                        {

                                            strategy.profit
                                        }

                                    </td>

                                    <td className="p-4 text-white">

                                        {

                                            strategy.win_rate

                                        }%

                                    </td>

                                    <td className="p-4 text-white">

                                        {

                                            strategy.positions

                                        }

                                    </td>

                                    <td

                                        className={

                                            strategy.avg_trade >= 0

                                            ? "p-4 text-green-400"

                                            : "p-4 text-red-400"

                                        }

                                    >

                                        $

                                        {

                                            strategy.avg_trade

                                        }

                                    </td>

                                </tr>

                            )

                        )

                    }

                </tbody>

            </table>

        </div>

    );

}

export default StrategyComparisonTable;