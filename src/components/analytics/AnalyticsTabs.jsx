function AnalyticsTabs({ activeTab, setActiveTab }) {

    const tabs = [
        {
            id: "strategies",
            label: "Strategies"
        },
        {
            id: "symbols",
            label: "Symbols"
        },
        {
            id: "days",
            label: "Days"
        },
        {
            id: "sessions",
            label: "Sessions"
        }
    ];


    return (

        <div className="border-b border-slate-800">

            <div className="flex items-center gap-1 overflow-x-auto">

                {tabs.map((tab) => (

                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`
                            relative
                            px-4
                            py-3
                            text-sm
                            font-medium
                            whitespace-nowrap
                            transition
                            ${
                                activeTab === tab.id
                                    ? `
                                        text-white
                                        bg-blue-500/5
                                      `
                                    : `
                                        text-slate-500
                                        hover:text-slate-300
                                        hover:bg-slate-800/40
                                      `
                            }
                        `}
                    >

                        {tab.label}

                        {activeTab === tab.id && (
                            <span className="
                                absolute
                                left-0
                                right-0
                                bottom-0
                                h-0.5
                                bg-blue-500
                                rounded-full
                            " />
                        )}

                    </button>

                ))}

            </div>

        </div>

    );

}

export default AnalyticsTabs;