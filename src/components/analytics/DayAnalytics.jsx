import MetricCard from "../MetricCard";

import DayProfitChart
from "../DayProfitChart";

import DayPerformanceTable
from "../DayPerformanceTable";


function DayAnalytics({

    days

}) {

    const bestDay =
        [...days]
            .sort(
                (a,b)=>
                    b.profit -
                    a.profit
            )[0];

    const worstDay =
        [...days]
            .sort(
                (a,b)=>
                    a.profit -
                    b.profit
            )[0];

    const bestDayWinRate =
        [...days]
            .sort(
                (a,b)=>
                    b.win_rate -
                    a.win_rate
            )[0];

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

                <MetricCard

                    title="Best Day"

                    subtitle={
                        bestDay.day
                    }

                    value={
                        bestDay.profit
                    }

                    prefix="$"

                />

                <MetricCard

                    title="Worst Day"

                    subtitle={
                        worstDay.day
                    }

                    value={
                        worstDay.profit
                    }

                    prefix="$"

                />

                <MetricCard

                    title="Best Win Rate"

                    subtitle={
                        bestDayWinRate.day
                    }

                    value={
                        bestDayWinRate.win_rate
                    }

                    suffix="%"

                />

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

                    <DayProfitChart
                        data={days}
                    />

                </div>

                <div
                    className="
                    xl:col-span-3
                    h-[450px]
                    "
                >

                    <DayPerformanceTable
                        days={days}
                    />

                </div>

            </div>

        </>

    );

}

export default DayAnalytics;