function DayPerformanceTable({

    days

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

                        </tr>

                    </thead>

                    <tbody>

                        {

                            days.map(

                                (
                                    day
                                ) => (

                                    <tr

                                        key={
                                            day.day
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
                                            {day.day}
                                        </td>

                                        <td
                                            className="
                                            py-4
                                            text-white
                                            "
                                        >
                                            {
                                                day.positions
                                            }
                                        </td>

                                        <td
                                            className="
                                            py-4
                                            text-green-400
                                            "
                                        >
                                            {
                                                day.wins
                                            }
                                        </td>

                                        <td
                                            className="
                                            py-4
                                            text-blue-400
                                            "
                                        >
                                            {
                                                day.win_rate
                                            }%
                                        </td>

                                        <td
                                            className="
                                            py-4
                                            "
                                        >

                                            <span

                                                className={

                                                    day.profit >= 0

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
                                                    day.profit
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

export default DayPerformanceTable;