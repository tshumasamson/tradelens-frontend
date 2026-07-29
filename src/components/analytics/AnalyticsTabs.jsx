function AnalyticsTabs({

    activeTab,

    setActiveTab

}) {

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

        <div
            className="
            flex
            flex-wrap
            gap-3
            mb-6
            "
        >

            {

                tabs.map((tab) => (

                    <button

                        key={tab.id}

                        onClick={() =>
                            setActiveTab(
                                tab.id
                            )
                        }

                        className={

                            activeTab === tab.id

                            ? `
                                bg-blue-600
                                text-white
                                px-5
                                py-3
                                rounded-xl
                                font-medium
                              `

                            : `
                                bg-slate-900
                                border
                                border-slate-800
                                text-slate-400
                                hover:text-white
                                px-5
                                py-3
                                rounded-xl
                              `
                        }

                    >

                        {tab.label}

                    </button>

                ))

            }

        </div>

    );

}

export default AnalyticsTabs;