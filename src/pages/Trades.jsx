import {useEffect,useState} from "react";
import {getTrades} from "../services/tradesApi";

import {getSymbols,getStrategies} from "../services/filterApi";
import FilterPanel from "../components/FilterPanel";
import TradeDetailsModal from "../components/trades/TradeDetailsModal";


function Trades() {
    const [tradeData,setTrades] = useState([]);
    const [page,setPage] = useState(1);
    const [totalPages,setTotalPages] = useState(1);

    const [strategy, setStrategy] = useState("");
    const [symbol, setSymbol] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    const [tradeCount, setTradeCount] = useState(0);
    const [selectedTrade,setSelectedTrade] = useState(null);
    const [ordering, setOrdering] = useState("-entry_time");

    const [availableSymbols, setAvailableSymbols] = useState([]);
    const [availableStrategies,setAvailableStrategies] = useState([]);

    const loadTrades = async () => {
        const tradeData = 
            await getTrades({
                page,
                strategy,
                symbol,
                start_date:startDate,
                end_date:endDate,
                ordering                  
            });
        setTrades(tradeData.results);
        setTotalPages(Math.ceil(tradeData.count / 6));
        setTradeCount(tradeData.count);
    };



    const loadFilterOptions = async () => {
        const [
            symbols,
            strategies
        ] = await Promise.all([
            getSymbols(),
            getStrategies()
        ]);
        setAvailableSymbols(symbols);
        setAvailableStrategies(strategies);
    };

    const applyFilters = () => {
        if (page === 1) {
            loadTrades();
        } else {
            setPage(1);
        }
    };

    const clearFilters = () => {
        setStrategy("");
        setSymbol("");
        setStartDate("");
        setEndDate("");
        setOrdering("-entry_time");
        if (page === 1) {

            loadTrades();

        } else {

            setPage(1);

        }

    };

    const activeFilters = [
        strategy,
        symbol,
        startDate,
        endDate,
        ordering !== "-entry_time"
            ? ordering
            : ""

    ].filter(Boolean).length;


    const calculateDuration = (
        entryTime,
        exitTime
    ) => {

        if (!exitTime)
            return "Open";

        const start =
            new Date(
                entryTime
            );

        const end =
            new Date(
                exitTime
            );

        const diffMs =
            end - start;

        const hours =
            Math.floor(
                diffMs /
                (1000 * 60 * 60)
            );

        const minutes =
            Math.floor(

                (
                    diffMs %

                    (1000 * 60 * 60)

                ) /

                (1000 * 60)

            );

        return `${hours}h ${minutes}m`;

    };    

    useEffect(() => {
        loadTrades();
        loadFilterOptions();
    }, [page]);


    if (!tradeData.length) {

        return (

            <div
                className="
                bg-slate-900
                border
                border-slate-800
                rounded-xl
                p-8
                text-white
                "
            >

                <h2
                    className="
                    text-2xl
                    font-semibold
                    "
                >
                    No Trade Data Available
                </h2>

                <p
                    className="
                    text-slate-400
                    mt-2
                    "
                >
                    This account has no trades yet.
                </p>

            </div>

        );

    }

    return (

        <div>

            <div className="flex items-center justify-between mb-3">

                <div className="text-xs text-slate-500">
                    <span className="text-slate-200 font-medium">
                        {tradeCount.toLocaleString()}
                    </span>{" "}
                    trades
                </div>

                <div className="flex items-center gap-2">

                    <span className="text-xs text-slate-500">
                        Sort
                    </span>

                    <select
                        value={ordering}
                        onChange={(e) => setOrdering(e.target.value)}
                        className="
                            bg-slate-900
                            border border-slate-800
                            text-slate-300
                            text-xs
                            rounded-lg
                            px-3
                            py-1.5
                            outline-none
                            focus:border-slate-600
                            transition
                        "
                    >
                        <option value="-entry_time">Newest</option>
                        <option value="entry_time">Oldest</option>
                        <option value="-profit">Highest Profit</option>
                        <option value="profit">Lowest Profit</option>
                        <option value="-volume">Largest Volume</option>
                        <option value="volume">Smallest Volume</option>
                    </select>

                </div>

            </div>

            <FilterPanel
                strategy={strategy}
                setStrategy={setStrategy}
                symbol={symbol}
                setSymbol={setSymbol}
                startDate={startDate}
                setStartDate={setStartDate}
                endDate={endDate}
                setEndDate={setEndDate}
                availableStrategies={availableStrategies}
                availableSymbols={availableSymbols}
                onApply={applyFilters}
                onClear={clearFilters}
                activeFilters={activeFilters}
            />

            <div className="bg-slate-900 border border-slate-800 rounded-xl shadow-sm overflow-hidden">

                <div className="overflow-x-auto">

                    <table className="w-full min-w-[1050px] text-sm">

                        <thead className="bg-slate-950/40 border-b border-slate-800">

                            <tr className="text-xs uppercase tracking-wide text-slate-500">

                                <th className="text-left px-5 py-3 font-medium">
                                    Date
                                </th>

                                <th className="text-left px-4 py-3 font-medium">
                                    Symbol
                                </th>

                                <th className="text-left px-4 py-3 font-medium">
                                    Strategy
                                </th>

                                <th className="text-left px-4 py-3 font-medium">
                                    Side
                                </th>

                                <th className="text-right px-4 py-3 font-medium">
                                    Volume
                                </th>

                                <th className="text-right px-4 py-3 font-medium">
                                    Duration
                                </th>

                                <th className="text-right px-4 py-3 font-medium">
                                    P&L
                                </th>

                                <th className="text-center px-5 py-3 font-medium">
                                    Journal
                                </th>

                            </tr>

                        </thead>

                        <tbody className="divide-y divide-slate-800/70">

                            {tradeData.map((trade) => {

                                const profit = Number(trade.profit || 0);

                                const isProfit = profit > 0;
                                const isLoss = profit < 0;

                                return (
                                    <tr
                                        key={trade.position_id}
                                        onClick={() => setSelectedTrade(trade)}
                                        className="
                                            hover:bg-slate-800/30
                                            cursor-pointer
                                            transition
                                        "
                                    >

                                        {/* Date */}
                                        <td className="px-5 py-3.5 text-slate-300 whitespace-nowrap">

                                            {new Date(
                                                trade.exit_time
                                            ).toLocaleDateString()}

                                        </td>


                                        {/* Symbol */}
                                        <td className="px-4 py-3.5">

                                            <span className="text-slate-100 font-semibold">
                                                {trade.symbol}
                                            </span>

                                        </td>


                                        {/* Strategy */}
                                        <td className="px-4 py-3.5">

                                            <span className="text-slate-400">
                                                {trade.strategy || "-"}
                                            </span>

                                        </td>


                                        {/* Side */}
                                        <td className="px-4 py-3.5">

                                            <span
                                                className={`
                                                    text-xs
                                                    font-semibold
                                                    ${
                                                        trade.direction === "BUY"
                                                            ? "text-green-400"
                                                            : "text-red-400"
                                                    }
                                                `}
                                            >
                                                {trade.direction}
                                            </span>

                                        </td>


                                        {/* Volume */}
                                        <td className="px-4 py-3.5 text-right text-slate-300 tabular-nums">
                                            {Number(trade.volume || 0).toFixed(2)}
                                        </td>


                                        {/* Duration */}
                                        <td className="px-4 py-3.5 text-right text-slate-400 tabular-nums whitespace-nowrap">

                                            {calculateDuration(
                                                trade.entry_time,
                                                trade.exit_time
                                            )}

                                        </td>


                                        {/* P&L */}
                                        <td
                                            className={`
                                                px-4
                                                py-3.5
                                                text-right
                                                font-semibold
                                                tabular-nums
                                                ${
                                                    isProfit
                                                        ? "text-green-400"
                                                        : isLoss
                                                        ? "text-red-400"
                                                        : "text-slate-400"
                                                }
                                            `}
                                        >

                                            {isProfit ? "+" : ""}
                                            ${profit.toFixed(2)}

                                        </td>


                                        {/* Journal */}
                                        <td className="px-5 py-3.5 text-center">

                                            {trade.has_journal ? (

                                                <span
                                                    className="
                                                        inline-flex
                                                        items-center
                                                        gap-1.5
                                                        px-2.5
                                                        py-1
                                                        rounded-md
                                                        bg-green-500/10
                                                        border
                                                        border-green-500/20
                                                        text-green-400
                                                        text-xs
                                                        font-medium
                                                    "
                                                >
                                                    <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                                                    Reviewed
                                                </span>

                                            ) : (

                                                <span
                                                    className="
                                                        inline-flex
                                                        items-center
                                                        gap-1.5
                                                        px-2.5
                                                        py-1
                                                        rounded-md
                                                        bg-amber-500/10
                                                        border
                                                        border-amber-500/20
                                                        text-amber-400
                                                        text-xs
                                                        font-medium
                                                    "
                                                >
                                                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                                                    Pending
                                                </span>

                                            )}

                                        </td>

                                    </tr>
                                );

                            })}

                        </tbody>

                    </table>

                </div>


                {/* Pagination */}
                <div className="
                    px-5
                    py-3
                    border-t
                    border-slate-800
                    flex
                    items-center
                    justify-between
                ">

                    <span className="text-xs text-slate-500">
                        Page {page} of {totalPages}
                    </span>


                    <div className="flex items-center gap-2">

                        <button
                            disabled={page === 1}
                            onClick={() => setPage(page - 1)}
                            className="
                                px-3
                                py-1.5
                                rounded-lg
                                border
                                border-slate-700
                                bg-slate-900
                                text-slate-300
                                text-xs
                                font-medium
                                hover:bg-slate-800
                                disabled:opacity-40
                                disabled:cursor-not-allowed
                                transition
                            "
                        >
                            Previous
                        </button>


                        <button
                            disabled={page === totalPages}
                            onClick={() => setPage(page + 1)}
                            className="
                                px-3
                                py-1.5
                                rounded-lg
                                border
                                border-slate-700
                                bg-slate-900
                                text-slate-300
                                text-xs
                                font-medium
                                hover:bg-slate-800
                                disabled:opacity-40
                                disabled:cursor-not-allowed
                                transition
                            "
                        >
                            Next
                        </button>

                    </div>

                </div>

            </div>
            <TradeDetailsModal

                trade={selectedTrade}

                onClose={() =>
                    setSelectedTrade(
                        null
                    )
                }

                calculateDuration={
                    calculateDuration
                }

            />




        </div>

    );

}

export default Trades;