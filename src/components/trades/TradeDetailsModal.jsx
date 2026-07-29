import TradeJournalForm from "./TradeJournalForm";


function TradeDetailsModal({

    trade,

    onClose,

    calculateDuration

}) {

    if (!trade)
        return null;

    return (

        <div

            onClick={onClose}

            className="
            fixed
            inset-0
            bg-black/70
            flex
            items-center
            justify-center
            z-50
            "

        >

            <div

                onClick={(e) =>
                    e.stopPropagation()
                }

                className="
                bg-slate-900
                border
                border-slate-800
                rounded-2xl
                p-8
                w-[800px]
                max-w-[95%]
                max-h-[90vh]
                overflow-y-auto
                "

            >

                <div
                    className="
                    flex
                    justify-between
                    items-center
                    mb-6
                    "
                >

                    <h2
                        className="
                        text-white
                        text-2xl
                        font-bold
                        "
                    >
                        Trade Details
                    </h2>

                    <button

                        onClick={onClose}

                        className="
                        bg-slate-800
                        hover:bg-slate-700
                        text-white
                        px-4
                        py-2
                        rounded-lg
                        "
                    >

                        Close

                    </button>

                </div>

                <div
                    className="
                    space-y-4
                    "
                >

                    <div>

                        <h3
                            className="
                            text-2xl
                            font-bold
                            text-white
                            "
                        >
                            {trade.symbol}
                        </h3>

                        <p
                            className="
                            text-slate-400
                            text-sm
                            "
                        >
                            {trade.strategy}
                        </p>

                    </div>

                    <div
                        className="
                        flex
                        justify-between
                        items-center
                        "
                    >

                        <span

                            className={

                                trade.direction === "BUY"

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

                            {trade.direction}

                        </span>

                        <span

                            className={

                                Number(
                                    trade.profit
                                ) >= 0

                                ? `
                                    text-green-400
                                    text-3xl
                                    font-bold
                                  `

                                : `
                                    text-red-400
                                    text-3xl
                                    font-bold
                                  `
                            }

                        >

                            {trade.profit}

                        </span>

                    </div>

                    <div
                        className="
                        grid
                        grid-cols-2
                        gap-y-3
                        text-sm
                        "
                    >

                        <p className="text-slate-400">
                            Duration
                        </p>

                        <p className="text-white">
                            {
                                calculateDuration(
                                    trade.entry_time,
                                    trade.exit_time
                                )
                            }
                        </p>

                        <p className="text-slate-400">
                            Volume
                        </p>

                        <p className="text-white">
                            {trade.volume}
                        </p>

                        <p className="text-slate-400">
                            Entry Price
                        </p>

                        <p className="text-white">
                            {trade.entry_price}
                        </p>

                        <p className="text-slate-400">
                            Exit Price
                        </p>

                        <p className="text-white">
                            {trade.exit_price}
                        </p>

                        <p className="text-slate-400">
                            Stop Loss
                        </p>

                        <p className="text-white">
                            {trade.stop_loss}
                        </p>

                        <p className="text-slate-400">
                            Take Profit
                        </p>

                        <p className="text-white">
                            {trade.take_profit}
                        </p>

                        <p className="text-slate-400">
                            Commission
                        </p>

                        <p className="text-white">
                            {trade.commission}
                        </p>

                        <p className="text-slate-400">
                            Swap
                        </p>

                        <p className="text-white">
                            {trade.swap}
                        </p>

                        <TradeJournalForm
                            trade={trade}
                        />

                    </div>

                </div>

            </div>
            

        </div>




    );

}
export default TradeDetailsModal;