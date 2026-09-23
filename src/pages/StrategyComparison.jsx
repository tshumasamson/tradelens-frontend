import { useEffect, useState } from "react";

import FilterPanel from "../components/FilterPanel";

import {
    getSymbols,
    getStrategies
} from "../services/filterApi";

import {
    getStrategyRanking
} from "../services/strategyRankingApi";

import StrategyComparisonTable from "../components/StrategyComparisonTable";
import StrategyComparisonProfitChart from "../components/StrategyComparisonProfitChart";


function StrategyComparison() {

    const [strategies, setStrategies] = useState([]);

    const [selectedStrategies, setSelectedStrategies] = useState([]);

    const [strategy, setStrategy] = useState("");
    const [symbol, setSymbol] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    const [availableSymbols, setAvailableSymbols] = useState([]);
    const [availableStrategies, setAvailableStrategies] = useState([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");


    /*
    |--------------------------------------------------------------------------
    | Load strategy comparison data
    |--------------------------------------------------------------------------
    */

    const loadStrategies = async (
        filterOverrides = {}
    ) => {

        try {

            setLoading(true);
            setError("");

            const params = {
                strategy:
                    filterOverrides.strategy !== undefined
                        ? filterOverrides.strategy
                        : strategy,

                symbol:
                    filterOverrides.symbol !== undefined
                        ? filterOverrides.symbol
                        : symbol,

                start_date:
                    filterOverrides.start_date !== undefined
                        ? filterOverrides.start_date
                        : startDate,

                end_date:
                    filterOverrides.end_date !== undefined
                        ? filterOverrides.end_date
                        : endDate
            };


            const data = await getStrategyRanking(params);

            setStrategies(data);


            /*
            Keep only selected strategies that still
            exist after applying filters.
            */

            setSelectedStrategies((previous) =>
                previous.filter((selected) =>
                    data.some(
                        (item) =>
                            item.strategy === selected
                    )
                )
            );

        } catch (err) {

            console.error(
                "Failed to load strategy comparison:",
                err
            );

            setStrategies([]);

            setError(
                "Unable to load strategy comparison data."
            );

        } finally {

            setLoading(false);

        }

    };


    /*
    |--------------------------------------------------------------------------
    | Load filter options
    |--------------------------------------------------------------------------
    */

    const loadFilterOptions = async () => {

        try {

            const [
                symbols,
                strategyOptions
            ] = await Promise.all([
                getSymbols(),
                getStrategies()
            ]);

            setAvailableSymbols(symbols);
            setAvailableStrategies(strategyOptions);

        } catch (err) {

            console.error(
                "Failed to load filter options:",
                err
            );

        }

    };


    /*
    |--------------------------------------------------------------------------
    | Initial load
    |--------------------------------------------------------------------------
    */

    useEffect(() => {

        const initialize = async () => {

            await Promise.all([
                loadStrategies(),
                loadFilterOptions()
            ]);

        };

        initialize();

    }, []);


    /*
    |--------------------------------------------------------------------------
    | Strategy selection
    |--------------------------------------------------------------------------
    */

    const toggleStrategy = (strategyName) => {

        setSelectedStrategies((previous) => {

            if (
                previous.includes(strategyName)
            ) {

                return previous.filter(
                    (item) =>
                        item !== strategyName
                );

            }

            return [
                ...previous,
                strategyName
            ];

        });

    };


    /*
    |--------------------------------------------------------------------------
    | Clear filters
    |--------------------------------------------------------------------------
    */

    const clearFilters = () => {

        setStrategy("");
        setSymbol("");
        setStartDate("");
        setEndDate("");

        setSelectedStrategies([]);

        loadStrategies({
            strategy: "",
            symbol: "",
            start_date: "",
            end_date: ""
        });

    };


    /*
    |--------------------------------------------------------------------------
    | Apply filters
    |--------------------------------------------------------------------------
    */

    const applyFilters = () => {

        loadStrategies({
            strategy,
            symbol,
            start_date: startDate,
            end_date: endDate
        });

    };


    /*
    |--------------------------------------------------------------------------
    | Active filter count
    |--------------------------------------------------------------------------
    */

    const activeFilters = [
        strategy,
        symbol,
        startDate,
        endDate
    ].filter(Boolean).length;


    /*
    |--------------------------------------------------------------------------
    | Displayed strategies
    |--------------------------------------------------------------------------
    */

    const displayedStrategies =
        selectedStrategies.length
            ? strategies.filter(
                (item) =>
                    selectedStrategies.includes(
                        item.strategy
                    )
            )
            : strategies;


    /*
    |--------------------------------------------------------------------------
    | Empty / loading / error states
    |--------------------------------------------------------------------------
    */

    if (loading) {

        return (
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-8">

                <div className="flex items-center gap-3">

                    <div className="w-4 h-4 border-2 border-slate-600 border-t-blue-400 rounded-full animate-spin" />

                    <span className="text-sm text-slate-400">
                        Loading strategy comparison...
                    </span>

                </div>

            </div>
        );

    }


    return (

        <div className="space-y-5">

            {/* -------------------------------------------------- */}
            {/* Page Header */}
            {/* -------------------------------------------------- */}

            <div>

                <h1 className="text-xl font-semibold text-white">
                    Strategy Comparison
                </h1>

                <p className="text-xs text-slate-500 mt-1">
                    Compare trading strategy performance
                </p>

            </div>


            {/* -------------------------------------------------- */}
            {/* Filters */}
            {/* -------------------------------------------------- */}

            <FilterPanel

                strategy={strategy}
                setStrategy={setStrategy}

                symbol={symbol}
                setSymbol={setSymbol}

                startDate={startDate}
                setStartDate={setStartDate}

                endDate={endDate}
                setEndDate={setEndDate}

                availableStrategies={
                    availableStrategies
                }

                availableSymbols={
                    availableSymbols
                }

                onApply={applyFilters}

                onClear={clearFilters}

                activeFilters={activeFilters}

            />


            {/* -------------------------------------------------- */}
            {/* Error */}
            {/* -------------------------------------------------- */}

            {error && (

                <div className="bg-red-500/5 border border-red-500/20 rounded-xl px-4 py-3">

                    <p className="text-sm text-red-400">
                        {error}
                    </p>

                </div>

            )}


            {/* -------------------------------------------------- */}
            {/* No data */}
            {/* -------------------------------------------------- */}

            {!strategies.length && !error && (

                <div className="bg-slate-900 border border-slate-800 rounded-xl p-8">

                    <h2 className="text-base font-semibold text-white">
                        No Strategy Data Available
                    </h2>

                    <p className="text-sm text-slate-500 mt-2">
                        There is no strategy performance data
                        matching the selected filters.
                    </p>

                </div>

            )}


            {strategies.length > 0 && (

                <>

                    {/* ------------------------------------------ */}
                    {/* Strategy Selector */}
                    {/* ------------------------------------------ */}

                    <div className="bg-slate-900 border border-slate-800 rounded-xl shadow-sm">

                        <div className="px-5 py-4 border-b border-slate-800 flex items-center justify-between">

                            <div>

                                <h2 className="text-base font-semibold text-white">
                                    Select Strategies
                                </h2>

                                <p className="text-xs text-slate-500 mt-1">
                                    Select specific strategies to compare
                                </p>

                            </div>


                            <div className="flex items-center gap-3">

                                <span className="text-xs text-slate-500">

                                    {selectedStrategies.length > 0
                                        ? `${selectedStrategies.length} selected`
                                        : "All strategies"
                                    }

                                </span>


                                {selectedStrategies.length > 0 && (

                                    <button
                                        onClick={() =>
                                            setSelectedStrategies([])
                                        }
                                        className="
                                            text-xs
                                            text-slate-500
                                            hover:text-slate-200
                                            transition
                                        "
                                    >
                                        Clear selection
                                    </button>

                                )}

                            </div>

                        </div>


                        <div className="p-5 flex flex-wrap gap-2">

                            {strategies.map((item) => {

                                const selected =
                                    selectedStrategies.includes(
                                        item.strategy
                                    );

                                return (

                                    <button

                                        key={item.strategy}

                                        onClick={() =>
                                            toggleStrategy(
                                                item.strategy
                                            )
                                        }

                                        className={`
                                            inline-flex
                                            items-center
                                            gap-2
                                            px-3
                                            py-2
                                            rounded-lg
                                            border
                                            text-sm
                                            font-medium
                                            transition
                                            ${
                                                selected
                                                    ? "bg-blue-500/10 border-blue-500/40 text-blue-400"
                                                    : "bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700"
                                            }
                                        `}

                                    >

                                        <span
                                            className={`
                                                w-2
                                                h-2
                                                rounded-full
                                                ${
                                                    selected
                                                        ? "bg-blue-400"
                                                        : "bg-slate-600"
                                                }
                                            `}
                                        />

                                        {item.strategy}

                                    </button>

                                );

                            })}

                        </div>

                    </div>


                    {/* ------------------------------------------ */}
                    {/* Chart + Table */}
                    {/* ------------------------------------------ */}

                    {displayedStrategies.length > 0 ? (

                        <div className="grid grid-cols-1 xl:grid-cols-5 gap-4">

                            <div className="xl:col-span-2">

                                <StrategyComparisonProfitChart
                                    strategies={
                                        displayedStrategies
                                    }
                                />

                            </div>


                            <div className="xl:col-span-3">

                                <StrategyComparisonTable
                                    strategies={
                                        displayedStrategies
                                    }
                                />

                            </div>

                        </div>

                    ) : (

                        <div className="bg-slate-900 border border-slate-800 rounded-xl p-8">

                            <p className="text-sm text-slate-500">
                                Select at least one strategy to display
                                the comparison.
                            </p>

                        </div>

                    )}

                </>

            )}

        </div>

    );

}


export default StrategyComparison;