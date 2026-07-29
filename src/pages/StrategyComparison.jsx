import {useEffect,useState} from "react";
import FilterPanel from "../components/FilterPanel";
import MetricCard from "../components/MetricCard";
import {getStrategyRanking} from "../services/strategyRankingApi";
import StrategyComparisonTable from "../components/StrategyComparisonTable";
import StrategyComparisonProfitChart from "../components/StrategyComparisonProfitChart";

function StrategyComparison() {
    const [strategies,setStrategies] = useState([]);
    const [selectedStrategies,setSelectedStrategies] = useState([]);

    const toggleStrategy = (
        strategyName
    ) => {
        setSelectedStrategies(
            (prev) =>
                prev.includes(
                    strategyName
                )
                ? prev.filter(
                    (s) =>
                        s !== strategyName
                )
                : [...prev,strategyName]
        );
    };

    const displayedStrategies =

        selectedStrategies.length

            ? strategies.filter(

                (strategy) =>

                    selectedStrategies.includes(

                        strategy.strategy

                    )

            )

            : strategies;

    const loadStrategies = async () => {
        const data = await getStrategyRanking();
        setStrategies(data);
    };

    useEffect(() => {
        loadStrategies();

    }, []);

    if (!strategies.length) {

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
                    No Strategy Data Available
                </h2>

                <p
                    className="
                    text-slate-400
                    mt-2
                    "
                >
                    This account has no strategy
                    performance data yet.
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
                font-bold
                text-white
                "
            >
                Strategy Comparison
            </h1>

            <div
                className="
                bg-slate-900
                border
                border-slate-800
                rounded-2xl
                p-6
                "
            >

                <h2
                    className="
                    text-white
                    text-xl
                    font-semibold
                    mb-4
                    "
                >
                    Select Strategies
                </h2>

                <div
                    className="
                    flex
                    flex-wrap
                    gap-3
                    "
                >

                    {

                        strategies.map(

                            (strategy) => (

                                <button

                                    key={
                                        strategy.strategy
                                    }

                                    onClick={() =>
                                        toggleStrategy(

                                            strategy.strategy

                                        )
                                    }

                                    className={

                                        selectedStrategies.includes(

                                            strategy.strategy

                                        )

                                        ? `
                                            bg-blue-600
                                            text-white
                                            px-4
                                            py-2
                                            rounded-lg
                                        `

                                        : `
                                            bg-slate-800
                                            text-slate-300
                                            px-4
                                            py-2
                                            rounded-lg
                                        `
                                    }

                                >

                                    {

                                        strategy.strategy

                                    }

                                </button>

                            )

                        )

                    }

                </div>

            </div>

            <StrategyComparisonProfitChart

                strategies={
                    displayedStrategies
                }

            />

            <StrategyComparisonTable
                strategies={displayedStrategies}
            />

        </div>

    );

}

export default StrategyComparison;