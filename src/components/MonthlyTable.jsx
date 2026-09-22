function MonthlyTable({

    monthly

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
                Monthly Performance
            </h2>

            <div
                className="
                overflow-y-auto
                max-h-[400px]
                "
            >


                <table
                    className="
                    w-full
                    text-left
                    "
                >

                    <thead
                        className="
                        sticky
                        top-0
                        bg-slate-900
                        "
                    >

                        <tr
                            className="
                            text-slate-400
                            border-b
                            border-slate-800
                            "
                        >

                            <th className="pb-4">
                                Month
                            </th>

                            <th className="pb-4">
                                Profit
                            </th>

                            <th className="pb-4">
                                Win Rate
                            </th>

                            <th className="pb-4">
                                Profit Factor
                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {monthly.map(

                            (row) => (

                                <tr
                                    key={row.month}
                                    className="
                                    border-b
                                    border-slate-800
                                    hover:bg-slate-800
                                    transition
                                    "
                                >

                                    <td className="py-4 text-white">
                                        {row.month}
                                    </td>

                                    <td
                                        className={
                                            row.net_trading_profit < 0

                                            ? "py-4 text-red-500"

                                            : "py-4 text-green-500"
                                        }
                                    >
                                        {
                                            row.net_trading_profit
                                        }
                                    </td>

                                    <td className="py-4 text-white">
                                        {row.win_rate}%
                                    </td>

                                    <td className="py-4 text-white">
                                        {row.profit_factor}
                                    </td>

                                </tr>

                            )

                        )}

                    </tbody>

                </table>
            </div>

        </div>

    );

}

export default MonthlyTable;