import TradeJournalForm from "./TradeJournalForm";

function TradeDetailsModal({
    trade,
    onClose,
    calculateDuration
}) {
    if (!trade) {
        return null;
    }

    const profit = Number(trade.profit || 0);

    const isProfit = profit > 0;
    const isLoss = profit < 0;

    const totalCosts =
        Number(trade.commission || 0) +
        Number(trade.swap || 0);

    return (
        <div
            onClick={onClose}
            className="
                fixed
                inset-0
                bg-black/70
                backdrop-blur-sm
                flex
                items-center
                justify-center
                z-50
                p-4
            "
        >

            {/* Modal */}
            <div
                onClick={(e) => e.stopPropagation()}
                className="
                    bg-slate-900
                    border
                    border-slate-800
                    rounded-xl
                    w-[800px]
                    max-w-[95vw]
                    max-h-[90vh]
                    overflow-y-auto
                    shadow-2xl
                "
            >

                {/* Header */}
                <div
                    className="
                        px-6
                        py-5
                        border-b
                        border-slate-800
                        flex
                        items-start
                        justify-between
                    "
                >

                    <div>

                        <h2 className="text-xl font-semibold text-white">
                            Trade Review
                        </h2>

                        <p className="text-sm text-slate-500 mt-1">
                            {trade.symbol}
                            {trade.strategy
                                ? ` · ${trade.strategy}`
                                : ""}
                        </p>

                    </div>


                    {/* Close */}
                    <button
                        onClick={onClose}
                        className="
                            w-8
                            h-8
                            rounded-lg
                            flex
                            items-center
                            justify-center
                            text-slate-400
                            hover:text-white
                            hover:bg-slate-800
                            transition
                            text-lg
                        "
                        aria-label="Close"
                    >
                        ×
                    </button>

                </div>


                {/* Content */}
                <div className="px-6 py-5">

                    {/* Trade Summary */}
                    <div>

                        <div className="flex items-center justify-between">

                            <div>

                                <h3 className="text-lg font-semibold text-white">
                                    {trade.symbol}
                                </h3>

                                <p className="text-xs text-slate-500 mt-1">
                                    {trade.strategy || "No strategy"}
                                </p>

                            </div>


                            {/* Direction */}
                            <span
                                className={`
                                    inline-flex
                                    items-center
                                    px-2.5
                                    py-1
                                    rounded-md
                                    text-xs
                                    font-semibold
                                    border
                                    ${
                                        trade.direction === "BUY"
                                            ? `
                                                bg-green-500/10
                                                border-green-500/20
                                                text-green-400
                                            `
                                            : `
                                                bg-red-500/10
                                                border-red-500/20
                                                text-red-400
                                            `
                                    }
                                `}
                            >
                                {trade.direction}
                            </span>

                        </div>


                        {/* P&L */}
                        <div
                            className={`
                                text-3xl
                                font-bold
                                tracking-tight
                                mt-4
                                ${
                                    isProfit
                                        ? "text-green-400"
                                        : isLoss
                                        ? "text-red-400"
                                        : "text-slate-300"
                                }
                            `}
                        >
                            {isProfit ? "+" : ""}
                            ${profit.toFixed(2)}
                        </div>

                    </div>


                    {/* Main Trade Metrics */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6">

                        {/* Volume */}
                        <div className="bg-slate-950 border border-slate-800 rounded-lg p-3">

                            <p className="text-xs text-slate-500">
                                Volume
                            </p>

                            <p className="text-sm text-slate-200 font-medium mt-1">
                                {trade.volume ?? "-"}
                            </p>

                        </div>


                        {/* Duration */}
                        <div className="bg-slate-950 border border-slate-800 rounded-lg p-3">

                            <p className="text-xs text-slate-500">
                                Duration
                            </p>

                            <p className="text-sm text-slate-200 font-medium mt-1">
                                {calculateDuration(
                                    trade.entry_time,
                                    trade.exit_time
                                )}
                            </p>

                        </div>


                        {/* Entry Price */}
                        <div className="bg-slate-950 border border-slate-800 rounded-lg p-3">

                            <p className="text-xs text-slate-500">
                                Entry Price
                            </p>

                            <p className="text-sm text-slate-200 font-medium mt-1">
                                {trade.entry_price ?? "-"}
                            </p>

                        </div>


                        {/* Exit Price */}
                        <div className="bg-slate-950 border border-slate-800 rounded-lg p-3">

                            <p className="text-xs text-slate-500">
                                Exit Price
                            </p>

                            <p className="text-sm text-slate-200 font-medium mt-1">
                                {trade.exit_price ?? "-"}
                            </p>

                        </div>

                    </div>


                    {/* Risk / Cost Metrics */}
                    <div className="grid grid-cols-3 gap-3 mt-3">

                        {/* Stop Loss */}
                        <div className="bg-slate-950 border border-slate-800 rounded-lg p-3">

                            <p className="text-xs text-slate-500">
                                Stop Loss
                            </p>

                            <p className="text-sm text-slate-200 font-medium mt-1">
                                {trade.stop_loss ?? "-"}
                            </p>

                        </div>


                        {/* Take Profit */}
                        <div className="bg-slate-950 border border-slate-800 rounded-lg p-3">

                            <p className="text-xs text-slate-500">
                                Take Profit
                            </p>

                            <p className="text-sm text-slate-200 font-medium mt-1">
                                {trade.take_profit ?? "-"}
                            </p>

                        </div>


                        {/* Costs */}
                        <div className="bg-slate-950 border border-slate-800 rounded-lg p-3">

                            <p className="text-xs text-slate-500">
                                Costs
                            </p>

                            <p className="text-sm text-slate-200 font-medium mt-1">
                                ${totalCosts.toFixed(2)}
                            </p>

                        </div>

                    </div>


                    {/* Trade Journal */}
                    <TradeJournalForm
                        trade={trade}
                    />

                </div>

            </div>

        </div>
    );
}

export default TradeDetailsModal;