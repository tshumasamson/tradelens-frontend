import { Link } from "react-router-dom";

function Sidebar() {

    const menuItem =

        "text-slate-300 hover:text-white hover:bg-slate-800 px-4 py-3 rounded-lg transition";

    return (

        <aside
            className="
            w-72
            bg-slate-950
            border-r
            border-slate-800
            min-h-screen
            p-6
            "
        >

            <h1
                className="
                text-4xl
                font-bold
                text-white
                "
            >
                TradLens
            </h1>

            <p
                className="
                text-slate-400
                mt-1
                mb-10
                "
            >
                Trading Analytics
            </p>

            <nav
                className="
                flex
                flex-col
                gap-2
                "
            >

                <Link
                    to="/"
                    className={menuItem}
                >
                    📊 Dashboard
                </Link>

                <Link
                    to="/trades"
                    className={menuItem}
                >
                    💼 Trades
                </Link>

                <Link
                    to="/analytics"
                    className={menuItem}
                >
                    📈 Analytics
                </Link>

                <Link
                    to="/strategy-comparison"
                    className={menuItem}
                >
                    🎯 Strategy Comparison
                </Link>

                <Link 
                    to="/accounts"
                    className={menuItem}
                >
                    💳 Accounts
                    
                </Link>



                <Link
                    to="/api-keys"
                    className={menuItem}
                >
                    🔑 API Keys
                </Link>
                <Link
                    to="/connectors"
                    className={menuItem}
                >
                    🔌 Connectors
                </Link>
                <Link
                    to="/settings"
                    className={menuItem}
                >
                    ⚙ Settings
                </Link>

            </nav>

        </aside>

    );

}

export default Sidebar;