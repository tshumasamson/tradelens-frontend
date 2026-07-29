import {useEffect,useState} from "react";
import {getStrategyAnalytics} from "../services/analyticsApi";
import {getSymbolRanking} from "../services/symbolRankingApi";
import {getDayAnalytics} from "../services/dayAnalyticsApi";
import {getSessionAnalytics} from "../services/sessionAnalyticsApi";
import {getSymbols,getStrategies} from "../services/filterApi";
import FilterPanel from "../components/FilterPanel";

import AnalyticsTabs from "../components/analytics/AnalyticsTabs";
import StrategyAnalytics from "../components/analytics/StrategyAnalytics";
import SymbolAnalytics from "../components/analytics/SymbolAnalytics";
import DayAnalytics from "../components/analytics/DayAnalytics";
import SessionAnalytics from "../components/analytics/SessionAnalytics";

function Analytics() {

    const [strategies,setStrategies] = useState([]);
    const [symbols, setSymbols] = useState([]);
    const [days,setDays] = useState([]);

    const [strategy,setStrategy] = useState("");
    const [symbol,setSymbol] = useState("");
    const [startDate,setStartDate] = useState("");
    const [endDate,setEndDate] = useState("");

    const [availableSymbols, setAvailableSymbols] = useState([]);
    const [availableStrategies,setAvailableStrategies] = useState([]);

    const [sessions,setSessions] = useState([]);

    const [activeTab,setActiveTab] = useState("strategies");

    const loadAnalytics = async () => {

        const params = {
            strategy,
            symbol,
            start_date: startDate,
            end_date: endDate
        };

        const [
            strategyData,
            symbolData,
            dayData,
            sessionData
        ] = await Promise.all([
            getStrategyAnalytics(params),
            getSymbolRanking(params),
            getDayAnalytics(params),
            getSessionAnalytics(params)
        ]);
        setStrategies(strategyData);
        setSymbols(symbolData);
        setDays(dayData);
        setSessions(sessionData);
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

    useEffect(() => {

        loadAnalytics();
        loadFilterOptions();

    }, []);

    if (

        !strategies.length &&

        !symbols.length &&

        !days.length

    ) {

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
                    No Analytics Data Available
                </h2>

                <p
                    className="
                    text-slate-400
                    mt-2
                    "
                >
                    This account has no trading
                    activity available for
                    analytics yet.
                </p>

            </div>

        );

    }

    return (

        <div
            className="
            space-y-8
            "
        >

            <h1
                className="
                text-4xl
                text-white
                font-bold
                "
            >
                Analytics
            </h1>


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

                onApply={
                    loadAnalytics
                }

                onClear={() => {

                    setStrategy("");
                    setSymbol("");
                    setStartDate("");
                    setEndDate("");

                }}

            />
            <AnalyticsTabs
                activeTab={activeTab}
                setActiveTab={setActiveTab}
            />

            {

                activeTab === "strategies" && (

                    <StrategyAnalytics

                        strategies={
                            strategies
                        }

                    />

                )

            }

            {

                activeTab === "symbols" && (

                    <SymbolAnalytics

                        symbols={
                            symbols
                        }

                    />

                )

            }

            {

                activeTab === "days" && (

                    <DayAnalytics

                        days={
                            days
                        }

                    />

                )

            }
            {

                activeTab === "sessions" && (

                    <SessionAnalytics

                        sessions={
                            sessions
                        }

                    />

                )

            }

        </div>

    );

}

export default Analytics;