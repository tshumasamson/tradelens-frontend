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

            <h1
                className="
                text-4xl
                text-white
                font-bold
                mb-6
                "
            >
                Trades
            </h1>

            <p
                className="
                text-slate-400
                mt-2
                "
            >
                Showing {tradeCount} trades
            </p>

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

                extraFilters={

                    <div>

                        <p
                            className="
                            text-slate-400
                            text-sm
                            mb-2
                            "
                        >
                            Sort By
                        </p>

                        <select

                            value={ordering}

                            onChange={(e) =>
                                setOrdering(
                                    e.target.value
                                )
                            }

                            className="
                            bg-slate-800
                            text-white
                            rounded-lg
                            p-3
                            w-full
                            "
                        >

                            <option value="-entry_time">
                                Newest Trades
                            </option>

                            <option value="entry_time">
                                Oldest Trades
                            </option>

                            <option value="-profit">
                                Highest Profit
                            </option>

                            <option value="profit">
                                Lowest Profit
                            </option>

                            <option value="-volume">
                                Largest Volume
                            </option>

                            <option value="volume">
                                Smallest Volume
                            </option>

                        </select>

                    </div>

                }

            />

            <div
                className="
                bg-slate-900
                rounded-2xl
                border
                border-slate-800
                overflow-hidden
                "
            >
                <table
                    className="
                    w-full
                    "
                >

                    <thead>

                        <tr
                            className="
                            text-slate-400
                            border-b
                            border-slate-800
                            "
                        >

                            <th className="p-4">
                                Date
                            </th>

                            <th className="p-4">
                                Symbol
                            </th>

                            <th className="p-4">
                                Strategy
                            </th>

                            <th className="p-4">
                                Direction
                            </th>

                            <th className="p-4">
                                Volume
                            </th>
                            <th className="p-4">
                                Duration
                            </th>
                            <th className="p-4">
                                Profit
                            </th>
                            <th
                                className="
                                px-4
                                py-3
                                text-left
                                "
                            >
                                Journal
                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {tradeData.map(

                            (trade) => (

                                <tr

                                    key={
                                        trade.position_id
                                    }

                                    onClick={() =>
                                        setSelectedTrade(
                                            trade
                                        )
                                    }

                                    className={

                                        Number(
                                            trade.profit
                                        ) >= 0

                                        ? `
                                            bg-green-500/[0.03]
                                            border-b
                                            border-slate-800
                                            hover:bg-green-500/[0.08]
                                            cursor-pointer
                                            transition
                                        `

                                        : `
                                            bg-red-500/[0.03]
                                            border-b
                                            border-slate-800
                                            hover:bg-red-500/[0.08]
                                            cursor-pointer
                                            transition
                                        `
                                    }
                                >

                                    <td
                                        className="
                                        p-4
                                        text-white
                                        "
                                    >

                                        {

                                            new Date(

                                                trade.exit_time

                                            ).toLocaleDateString()

                                        }

                                    </td>

                                    <td
                                        className="
                                        p-4
                                        text-white
                                        "
                                    >
                                        {
                                            trade.symbol
                                        }
                                    </td>

                                    <td
                                        className="
                                        p-4
                                        text-white
                                        "
                                    >
                                        {
                                            trade.strategy
                                        }
                                    </td>

                                    <td className="p-4">

                                        <span

                                            className={

                                                trade.direction === "BUY"

                                                ? `
                                                    bg-green-500/20
                                                    text-green-400
                                                    px-3
                                                    py-1
                                                    rounded-full
                                                    text-sm
                                                `

                                                : `
                                                    bg-red-500/20
                                                    text-red-400
                                                    px-3
                                                    py-1
                                                    rounded-full
                                                    text-sm
                                                `
                                            }

                                        >

                                            {trade.direction}

                                        </span>

                                    </td>
                                    <td
                                        className="
                                        p-4
                                        text-white
                                        "
                                    >
                                        {
                                            trade.volume
                                        }
                                    </td>

                                    <td
                                        className="
                                        p-4
                                        text-white
                                        "
                                    >

                                        {

                                            calculateDuration(

                                                trade.entry_time,

                                                trade.exit_time

                                            )

                                        }

                                    </td>

                                    <td className="p-4">

                                        <span

                                            className={

                                                Number(
                                                    trade.profit
                                                ) >= 0

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

                                            {trade.profit}

                                        </span>

                                    </td>

                                    <td
                                        className="
                                        px-4
                                        py-3
                                        "
                                    >

                                        {

                                            trade.has_journal

                                                ? (

                                                    <span
                                                        className="
                                                        bg-green-500/20
                                                        text-green-400
                                                        px-3
                                                        py-1
                                                        rounded-full
                                                        text-xs
                                                        font-medium
                                                        "
                                                    >
                                                        Reviewed
                                                    </span>

                                                )

                                                : (

                                                    <span
                                                        className="
                                                        bg-amber-500/20
                                                        text-amber-400
                                                        px-3
                                                        py-1
                                                        rounded-full
                                                        text-xs
                                                        font-medium
                                                        "
                                                    >
                                                        Pending
                                                    </span>

                                                )

                                        }

                                    </td>

                                </tr>

                            )

                        )}

                    </tbody>

                </table>


                <div
                    className="
                    flex
                    justify-between
                    items-center
                    mt-6
                    "
                >

                    <button

                        disabled={
                            page === 1
                        }

                        onClick={() =>

                            setPage(
                                page - 1
                            )

                        }

                        className="
                        bg-slate-800
                        text-white
                        px-4
                        py-2
                        rounded-lg
                        "
                    >

                        Previous

                    </button>

                    <span
                        className="
                        text-slate-400
                        "
                    >

                        Page {page}
                        of {totalPages}

                    </span>

                    <button

                        disabled={
                            page === totalPages
                        }

                        onClick={() =>

                            setPage(
                                page + 1
                            )

                        }

                        className="
                        bg-slate-800
                        text-white
                        px-4
                        py-2
                        rounded-lg
                        "
                    >

                        Next

                    </button>

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