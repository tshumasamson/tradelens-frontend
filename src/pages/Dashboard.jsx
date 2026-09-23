import { useEffect, useState } from "react";
import MetricCard from "../components/MetricCard";

import MonthlyTable from "../components/MonthlyTable";
import { getDashboard } from "../services/dashboardApi";

import EquityChart from "../components/EquityChart";
import { getEquityCurve } from "../services/equityApi";

import StrategyRanking from "../components/StrategyRanking";
import { getStrategyRanking } from "../services/strategyRankingApi";

import SymbolRanking from "../components/SymbolRanking";
import { getSymbolRanking } from "../services/symbolRankingApi";

import {getSymbols,getStrategies} from "../services/filterApi";
import FilterPanel from "../components/FilterPanel";
import {getSelectedAccountId} from "../services/accountApi";
import {subscribeToAccountsChanged} from "../services/accountEvents";

function Dashboard() {

    const [dashboard, setDashboard] = useState(null);
    const [equityData, setEquityData] = useState([]);
    const [strategies, setStrategies] = useState([]);
    const [symbols,setSymbols] = useState([]);

    const [strategy,setStrategy] = useState("");
    const [symbol,setSymbol] = useState("");
    const [startDate,setStartDate] = useState("");
    const [endDate,setEndDate] = useState("");

    const [availableSymbols, setAvailableSymbols] = useState([]);
    const [availableStrategies,setAvailableStrategies] = useState([]);

    const loadDashboard = async () => {
        let accountId = getSelectedAccountId();
        if (!accountId) {
            const accounts = await getAccounts();
            if (accounts.length === 0) {
                return;
            }
            accountId = accounts[0].id;
            setSelectedAccount(accountId);
        }

        const [
            dashboardData,
            curveData,
            strategyData,
            symbolData
        ] = await Promise.all([
                getDashboard({
                    strategy,
                    symbol,
                    start_date:startDate,
                    end_date:endDate
                }),
                getEquityCurve({
                    strategy,
                    symbol,
                    start_date:startDate,
                    end_date:endDate
                }),
                getStrategyRanking({
                    strategy,
                    symbol,
                    start_date:startDate,
                    end_date:endDate
                }),
                getSymbolRanking({
                    strategy,
                    symbol,
                    start_date:startDate,
                    end_date:endDate
                })               
        ]);
        setDashboard(dashboardData);
        setEquityData(curveData.curve);
        setStrategies(strategyData);
        setSymbols(symbolData);
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

    const clearFilters = () => {
        setStrategy("");
        setSymbol("");
        setStartDate("");
        setEndDate("");
    };


    useEffect(() => {

        const initialize =
            async () => {

                await Promise.all([
                    loadDashboard(),
                    loadFilterOptions()
                ]);
            };

        initialize();
        return subscribeToAccountsChanged(
            loadDashboard
        );

    }, []);

if (
    !dashboard ||
    !dashboard.account_value
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
                Unable to Load Dashboard
            </h2>

            <p
                className="
                text-slate-400
                mt-2
                "
            >
                The selected account could
                not be found or dashboard
                data is unavailable.
            </p>

        </div>

    );

}

    return (

        <div className="space-y-5">
            
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
                    loadDashboard
                }

                onClear={
                    clearFilters
                }

            />


<div
    className="
        grid
        grid-cols-1
        sm:grid-cols-2
        xl:grid-cols-4
        gap-4
    "
>

    <MetricCard
        title="Current Equity"
        prefix="$"
        value={
            dashboard.account_value.current_equity
        }
        subtitle="Current account equity"
        icon="◉"
        iconColor="text-cyan-400"
        iconBg="bg-cyan-500/10"
    />

<MetricCard
    title="Net Profit"
    prefix="$"
    value={dashboard.summary.net_trading_profit}
    subtitle="Net trading profit"
    icon="↗"
    iconColor="text-green-400"
    iconBg="bg-green-500/10"
/>

    <MetricCard
        title="Profit Factor"
        value={
            dashboard.performance.profit_factor
        }
        subtitle="Gross profit / loss"
        icon="▮"
        iconColor="text-purple-400"
        iconBg="bg-purple-500/10"
    />

    <MetricCard
        title="Win Rate"
        value={
            dashboard.performance.win_rate
        }
        suffix="%"
        subtitle="Winning trades"
        icon="◎"
        iconColor="text-blue-400"
        iconBg="bg-blue-500/10"
    />

</div>

            <div
                className="
                grid
                grid-cols-1
                xl:grid-cols-3
                gap-6
                "
            >

                <div
                    className="
                    xl:col-span-2
                    "
                >

                    <EquityChart
                        data={equityData}
                    />

                </div>

                <div>

                    <MonthlyTable
                        monthly={
                            dashboard.monthly
                        }
                    />

                </div>               

            </div>

            <div
                className="
                grid
                grid-cols-1
                xl:grid-cols-2
                gap-6
                "
            >

            <StrategyRanking

                strategies={strategies}

                onSelectStrategy={(value) => {

                    setStrategy(value);

                    setTimeout(() => {

                        loadDashboard();

                    }, 0);

                }}

            />

            <SymbolRanking

                symbols={symbols}

                onSelectSymbol={(value) => {

                    setSymbol(value);
                    setTimeout(() => {

                        loadDashboard();

                    }, 0);

                }}

            />

            </div>

        </div>

    );

}

export default Dashboard;