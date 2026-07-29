function SessionPerformanceTable({

    sessions

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
                Day Performance
            </h2>

            <div
                className="
                flex-1
                overflow-y-auto
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

                            <th>Day</th>

                            <th>Trades</th>

                            <th>Wins</th>

                            <th>Win Rate</th>

                            <th>Profit</th>
                            <th>Avg Trade</th>

                        </tr>

                    </thead>

                    <tbody>

                        {

                            sessions.map(

                                (
                                    session
                                ) => (

                                    <tr

                                        key={
                                            session.session
                                        }

                                        className="
                                        border-b
                                        border-slate-800
                                        "

                                    >

                                        <td
                                            className="
                                            py-4
                                            text-white
                                            "
                                        >
                                            {session.session}
                                        </td>

                                        <td
                                            className="
                                            py-4
                                            text-white
                                            "
                                        >
                                            {
                                                session.positions
                                            }
                                        </td>

                                        <td
                                            className="
                                            py-4
                                            text-green-400
                                            "
                                        >
                                            {
                                                session.wins
                                            }
                                        </td>

                                        <td
                                            className="
                                            py-4
                                            text-blue-400
                                            "
                                        >
                                            {
                                                session.win_rate
                                            }%
                                        </td>

                                        <td
                                            className="
                                            py-4
                                            "
                                        >

                                            <span

                                                className={

                                                    session.profit >= 0

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

                                                $

                                                {
                                                    session.profit
                                                }

                                            </span>

                                            </td>
                                                                                    <td
                                                className="
                                                py-4
                                                text-blue-400
                                                "
                                            >
                                                {
                                                    session.avg_trade
                                                }%
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

export default SessionPerformanceTable;