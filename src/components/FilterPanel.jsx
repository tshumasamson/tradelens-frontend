function FilterPanel({

    strategy,
    setStrategy,

    symbol,
    setSymbol,

    startDate,
    setStartDate,

    endDate,
    setEndDate,

    availableStrategies=[],

    availableSymbols=[],
    activeFilters = 0,
    extraFilters= null,


    onApply,

    onClear

}) {

    return (

        <div
            className="
            bg-slate-900
            border
            border-slate-800
            rounded-2xl
            p-6
            mb-6
            "
        >

            <div
                className="
                grid
                grid-cols-1
                md:grid-cols-4
                gap-4
                "
            >

                <input

                    list="strategies"

                    value={strategy}

                    onChange={(e) =>
                        setStrategy(
                            e.target.value
                        )
                    }

                    placeholder="Strategy"

                    className="
                    bg-slate-800
                    text-white
                    p-3
                    rounded-lg
                    w-full
                    "

                />

                <datalist id="strategies">

                    {

                        availableStrategies.map(

                            (strategy) => (

                                <option

                                    key={strategy}

                                    value={strategy}

                                />

                            )

                        )

                    }

                </datalist>

                <input

                    list="symbols"

                    value={symbol}

                    onChange={(e) =>
                        setSymbol(
                            e.target.value
                        )
                    }

                    placeholder="Symbol"

                    className="
                    bg-slate-800
                    text-white
                    p-3
                    rounded-lg
                    w-full
                    "

                />

                <datalist id="symbols">

                    {

                        availableSymbols.map(

                            (symbol) => (

                                <option

                                    key={symbol}

                                    value={symbol}

                                />

                            )

                        )

                    }

                </datalist>

                <input

                    type="date"

                    value={startDate}

                    onChange={(e) =>
                        setStartDate(
                            e.target.value
                        )
                    }

                    className="
                    bg-slate-800
                    text-white
                    p-3
                    rounded-lg
                    "

                />

                <input

                    type="date"

                    value={endDate}

                    onChange={(e) =>
                        setEndDate(
                            e.target.value
                        )
                    }

                    className="
                    bg-slate-800
                    text-white
                    p-3
                    rounded-lg
                    "

                />

                {extraFilters}

            </div>

            <div
                className="
                mt-4
                flex
                gap-3
                "
            >

                <button

                    onClick={onApply}

                    className="
                    bg-blue-600
                    hover:bg-blue-700
                    text-white
                    px-6
                    py-3
                    rounded-lg
                    "
                >

                    Apply Filters

                </button>

                <button

                    onClick={onClear}

                    className="
                    bg-slate-700
                    hover:bg-slate-600
                    text-white
                    px-6
                    py-3
                    rounded-lg
                    "
                >

                    Clear Filters

                </button>

                {

                    activeFilters > 0 && (

                        <span
                            className="
                            bg-blue-500/20
                            text-blue-400
                            px-4
                            py-2
                            rounded-full
                            text-sm
                            font-medium
                            "
                        >

                            {activeFilters}

                            {" "}

                            Active Filter

                            {
                                activeFilters > 1
                                ? "s"
                                : ""
                            }

                        </span>

                    )

                }

            </div>

             

        </div>

    );

}

export default FilterPanel;