function StrategyRanking({

    strategies,
    onSelectStrategy

}) {

    return (

        <div
            className="
            bg-slate-900
            border
            border-slate-800
            rounded-2xl
            p-6
            h-[360px]
            flex
            flex-col
            "
        >

            <h2
                className="
                text-white
                text-2xl
                font-semibold
                mb-6
                "
            >
                Strategy Ranking
            </h2>

            <div
                className="
                space-y-3
                max-h-[500px]
                overflow-y-auto
                pr-2
                "
            >

                {strategies.map(

                    (strategy) => (

                        <button

                            key={strategy.strategy}

                            onClick={() =>

                                onSelectStrategy(
                                    strategy.strategy
                                )

                            }

                            className="
                            w-full
                            flex
                            justify-between
                            items-center
                            p-4
                            rounded-xl
                            bg-slate-800
                            hover:bg-slate-700
                            transition
                            cursor-pointer
                            "
                        >

                            <div>

                                <p
                                    className="
                                    text-white
                                    font-medium
                                    "
                                >
                                    {
                                        strategy.strategy
                                    }
                                </p>

                                <p
                                    className="
                                    text-slate-400
                                    text-sm
                                    "
                                >
                                    {
                                        strategy.positions
                                    } positions
                                </p>

                            </div>

                            <span

                                className={

                                    strategy.profit >= 0

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

                                {strategy.profit}

                            </span>

                        </button>

                    )

                )}

            </div>

        </div>

    );

}

export default StrategyRanking;