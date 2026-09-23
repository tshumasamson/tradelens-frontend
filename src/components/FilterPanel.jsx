function FilterPanel({
    strategy,
    setStrategy,

    symbol,
    setSymbol,

    startDate,
    setStartDate,

    endDate,
    setEndDate,

    availableStrategies = [],
    availableSymbols = [],

    activeFilters = 0,
    extraFilters = null,

    onApply,
    onClear
}) {

    return (
        <div
            className="
                bg-slate-900
                border
                border-slate-800
                rounded-xl
                px-4
                py-3
                mb-5
            "
        >

            <div
                className="
                    flex
                    flex-col
                    xl:flex-row
                    xl:items-center
                    gap-3
                "
            >

                {/* Filter label */}
                <div
                    className="
                        flex
                        items-center
                        gap-2
                        shrink-0
                    "
                >
                    <div
                        className="
                            w-8
                            h-8
                            rounded-lg
                            bg-blue-500/10
                            text-blue-400
                            flex
                            items-center
                            justify-center
                            text-sm
                        "
                    >
                        ⚙
                    </div>

                    <span
                        className="
                            text-white
                            text-sm
                            font-medium
                        "
                    >
                        Filters
                    </span>

                    {activeFilters > 0 && (
                        <span
                            className="
                                px-2
                                py-0.5
                                rounded-full
                                bg-blue-500/10
                                text-blue-400
                                text-xs
                                font-medium
                            "
                        >
                            {activeFilters}
                        </span>
                    )}
                </div>


                {/* Strategy */}
                <div className="flex-1 min-w-0">

                    <input
                        list="strategies"
                        value={strategy}
                        onChange={(e) =>
                            setStrategy(e.target.value)
                        }
                        placeholder="Strategy"
                        className="
                            w-full
                            h-10
                            bg-slate-800
                            border
                            border-slate-700
                            text-white
                            placeholder-slate-500
                            px-3
                            rounded-lg
                            text-sm
                            outline-none
                            focus:border-blue-500
                            focus:ring-1
                            focus:ring-blue-500/30
                            transition
                        "
                    />

                    <datalist id="strategies">
                        {availableStrategies.map(
                            (strategy) => (
                                <option
                                    key={strategy}
                                    value={strategy}
                                />
                            )
                        )}
                    </datalist>

                </div>


                {/* Symbol */}
                <div className="flex-1 min-w-0">

                    <input
                        list="symbols"
                        value={symbol}
                        onChange={(e) =>
                            setSymbol(e.target.value)
                        }
                        placeholder="Symbol"
                        className="
                            w-full
                            h-10
                            bg-slate-800
                            border
                            border-slate-700
                            text-white
                            placeholder-slate-500
                            px-3
                            rounded-lg
                            text-sm
                            outline-none
                            focus:border-blue-500
                            focus:ring-1
                            focus:ring-blue-500/30
                            transition
                        "
                    />

                    <datalist id="symbols">
                        {availableSymbols.map(
                            (symbol) => (
                                <option
                                    key={symbol}
                                    value={symbol}
                                />
                            )
                        )}
                    </datalist>

                </div>


                {/* Start date */}
                <div className="flex-1 min-w-0">

                    <input
                        type="date"
                        value={startDate}
                        onChange={(e) =>
                            setStartDate(e.target.value)
                        }
                        className="
                            w-full
                            h-10
                            bg-slate-800
                            border
                            border-slate-700
                            text-white
                            px-3
                            rounded-lg
                            text-sm
                            outline-none
                            focus:border-blue-500
                            focus:ring-1
                            focus:ring-blue-500/30
                            transition
                        "
                    />

                </div>


                {/* End date */}
                <div className="flex-1 min-w-0">

                    <input
                        type="date"
                        value={endDate}
                        onChange={(e) =>
                            setEndDate(e.target.value)
                        }
                        className="
                            w-full
                            h-10
                            bg-slate-800
                            border
                            border-slate-700
                            text-white
                            px-3
                            rounded-lg
                            text-sm
                            outline-none
                            focus:border-blue-500
                            focus:ring-1
                            focus:ring-blue-500/30
                            transition
                        "
                    />

                </div>


                {/* Extra filters */}
                {extraFilters}


                {/* Apply */}
                <button
                    onClick={onApply}
                    className="
                        h-10
                        px-5
                        rounded-lg
                        bg-blue-600
                        hover:bg-blue-500
                        text-white
                        text-sm
                        font-medium
                        transition
                        whitespace-nowrap
                    "
                >
                    Apply
                </button>


                {/* Clear */}
                <button
                    onClick={onClear}
                    className="
                        h-10
                        px-4
                        rounded-lg
                        bg-slate-800
                        hover:bg-slate-700
                        border
                        border-slate-700
                        text-slate-300
                        text-sm
                        font-medium
                        transition
                        whitespace-nowrap
                    "
                >
                    Clear
                </button>

            </div>

        </div>
    );
}

export default FilterPanel;