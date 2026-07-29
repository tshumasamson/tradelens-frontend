import MetricCard from "../MetricCard";
import SymbolProfitChart from "../SymbolProfitChart";
import SymbolPerformanceTable from "../SymbolPerformanceTable";


function SymbolAnalytics({

    symbols

}) {

    const bestSymbol =
        [...symbols]
            .sort(
                (a, b) =>
                    b.profit -
                    a.profit
            )[0];

    const worstSymbol =
        [...symbols]
            .sort(
                (a, b) =>
                    a.profit -
                    b.profit
            )[0];

    const mostTradedSymbol =
        [...symbols]
            .sort(
                (a, b) =>
                    b.positions -
                    a.positions
            )[0];

    const singleSymbol =
        symbols.length === 1;

    return (

        <>

            <div
                className="
                grid
                grid-cols-1
                md:grid-cols-3
                gap-6
                "
            >

                {

                    singleSymbol

                    ? (

                        <>

                            <MetricCard

                                title="Total Profit"

                                value={
                                    symbols[0]
                                    .profit
                                }

                                prefix="$"

                            />

                            <MetricCard

                                title="Win Rate"

                                value={
                                    symbols[0]
                                    .win_rate
                                }

                                suffix="%"

                            />

                            <MetricCard

                                title="Avg Trade"

                                value={
                                    symbols[0]
                                    .avg_trade
                                }

                                prefix="$"

                            />

                        </>

                    )

                    : (

                        <>

                            <MetricCard

                                title="Best Symbol"

                                subtitle={
                                    bestSymbol.symbol
                                }

                                value={
                                    bestSymbol.profit
                                }

                                prefix="$"

                            />

                            <MetricCard

                                title="Worst Symbol"

                                subtitle={
                                    worstSymbol.symbol
                                }

                                value={
                                    worstSymbol.profit
                                }

                                prefix="$"

                            />

                            <MetricCard

                                title="Most Traded"

                                subtitle={
                                    mostTradedSymbol.symbol
                                }

                                value={
                                    mostTradedSymbol.positions
                                }

                            />

                        </>

                    )

                }

            </div>

            <div
                className="
                grid
                grid-cols-1
                xl:grid-cols-5
                gap-6
                "
            >

                <div
                    className="
                    xl:col-span-2
                    h-[450px]
                    "
                >

                    <SymbolProfitChart
                        data={symbols}
                    />

                </div>

                <div
                    className="
                    xl:col-span-3
                    h-[450px]
                    "
                >

                    <SymbolPerformanceTable
                        symbols={symbols}
                    />

                </div>

            </div>

        </>

    );

}

export default SymbolAnalytics;