function SymbolRanking({ symbols, onSelectSymbol }) {
    return (
        <div className="bg-slate-900 border border-slate-800 rounded-xl shadow-sm h-[330px] flex flex-col overflow-hidden">

            {/* Header */}
            <div className="px-5 py-4 border-b border-slate-800 flex-shrink-0">
                <h2 className="text-white text-base font-semibold">
                    Symbol Ranking
                </h2>

                <p className="text-slate-500 text-xs mt-1">
                    Performance by traded symbol
                </p>
            </div>

            {/* Ranking List */}
            <div className="flex-1 min-h-0 overflow-y-auto">

                {symbols.map((symbol, index) => {
                    const profit = Number(symbol.profit || 0);
                    const positions = Number(symbol.positions || 0);

                    return (
                        <button
                            key={symbol.symbol}
                            onClick={() =>
                                onSelectSymbol(symbol.symbol)
                            }
                            className="
                                w-full
                                flex
                                items-center
                                gap-3
                                px-5
                                py-3
                                border-b
                                border-slate-800/70
                                hover:bg-slate-800/40
                                transition
                                text-left
                            "
                        >

                            {/* Rank */}
                            <div className="w-6 flex-shrink-0 text-center">
                                <span className="text-xs font-medium text-slate-500">
                                    {index + 1}
                                </span>
                            </div>

                            {/* Symbol */}
                            <div className="flex-1 min-w-0">

                                <p className="text-sm text-slate-200 font-medium">
                                    {symbol.symbol}
                                </p>

                                <p className="text-xs text-slate-500 mt-0.5">
                                    {positions.toLocaleString()} positions
                                </p>

                            </div>

                            {/* Profit */}
                            <div
                                className={`
                                    text-sm
                                    font-semibold
                                    tabular-nums
                                    ${
                                        profit > 0
                                            ? "text-green-400"
                                            : profit < 0
                                            ? "text-red-400"
                                            : "text-slate-400"
                                    }
                                `}
                            >
                                {profit > 0 ? "+" : ""}
                                ${profit.toFixed(2)}
                            </div>

                        </button>
                    );
                })}

            </div>
        </div>
    );
}

export default SymbolRanking;