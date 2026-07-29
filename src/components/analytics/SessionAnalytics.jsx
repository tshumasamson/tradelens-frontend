import MetricCard from "../MetricCard";

import SessionProfitChart
from "../SessionProfitChart";

import SessionPerformanceTable
from "../SessionPerformanceTable";


function SessionAnalytics({

    sessions

}) {

    const bestSession =
        [...sessions]
            .sort(
                (a,b)=>
                    b.profit -
                    a.profit
            )[0];

    const worstSession =
        [...sessions]
            .sort(
                (a,b)=>
                    a.profit -
                    b.profit
            )[0];

    const bestSessionWinRate =
        [...sessions]
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

                    title="Best Session"

                    subtitle={
                        bestSession.session
                    }

                    value={
                        bestSession.profit
                    }

                    prefix="$"

                />

                <MetricCard

                    title="Worst Session"

                    subtitle={
                        worstSession.session
                    }

                    value={
                        worstSession.profit
                    }

                    prefix="$"

                />

                <MetricCard

                    title="Best Win Rate"

                    subtitle={
                        bestSessionWinRate.session
                    }

                    value={
                        bestSessionWinRate.win_rate
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

                    <SessionProfitChart
                        data={sessions}
                    />

                </div>

                <div
                    className="
                    xl:col-span-3
                    h-[450px]
                    "
                >

                    <SessionPerformanceTable
                        sessions={sessions}
                    />

                </div>

            </div>

        </>

    );

}

export default SessionAnalytics;