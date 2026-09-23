import { NavLink } from "react-router-dom";

function Sidebar() {

    const getMenuItemClass = ({ isActive }) => `
        flex
        items-center
        gap-3
        px-4
        py-3
        rounded-lg
        transition
        duration-200
        text-sm
        font-medium
        ${
            isActive
                ? `
                    bg-blue-600
                    text-white
                    shadow-md
                    shadow-blue-600/20
                `
                : `
                    text-slate-300
                    hover:text-white
                    hover:bg-slate-800
                `
        }
    `;

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

            {/* TradeLens Branding */}
            <div className="mb-10">

                <div
                    className="
                        flex
                        items-center
                        gap-3
                    "
                >

                    {/* TradeLens Logo */}
                    <img
                        src="/logo.png"
                        alt="TradeLens"
                        className="
                            w-12
                            h-12
                            object-contain
                            flex-shrink-0
                        "
                    />

                    {/* Brand Name */}
                    <div>

                        <h1
                            className="
                                text-3xl
                                font-bold
                                tracking-tight
                                leading-none
                            "
                        >
                            <span className="text-white">
                                Trade
                            </span>

                            <span className="text-green-500">
                                Lens
                            </span>
                        </h1>

                        <p
                            className="
                                text-slate-400
                                text-xs
                                mt-1
                            "
                        >
                            Trading Analytics
                        </p>

                    </div>

                </div>

            </div>


            {/* Navigation */}
            <nav
                className="
                    flex
                    flex-col
                    gap-2
                "
            >

                <NavLink
                    to="/"
                    end
                    className={getMenuItemClass}
                >
                    <span className="text-lg">
                        📊
                    </span>

                    <span>
                        Dashboard
                    </span>
                </NavLink>


                <NavLink
                    to="/trades"
                    className={getMenuItemClass}
                >
                    <span className="text-lg">
                        💼
                    </span>

                    <span>
                        Trades
                    </span>
                </NavLink>


                <NavLink
                    to="/analytics"
                    className={getMenuItemClass}
                >
                    <span className="text-lg">
                        📈
                    </span>

                    <span>
                        Analytics
                    </span>
                </NavLink>


                <NavLink
                    to="/strategy-comparison"
                    className={getMenuItemClass}
                >
                    <span className="text-lg">
                        🎯
                    </span>

                    <span>
                        Strategy Comparison
                    </span>
                </NavLink>


                <NavLink
                    to="/accounts"
                    className={getMenuItemClass}
                >
                    <span className="text-lg">
                        💳
                    </span>

                    <span>
                        Accounts
                    </span>
                </NavLink>


                <NavLink
                    to="/api-keys"
                    className={getMenuItemClass}
                >
                    <span className="text-lg">
                        🔑
                    </span>

                    <span>
                        API Keys
                    </span>
                </NavLink>


                <NavLink
                    to="/connectors"
                    className={getMenuItemClass}
                >
                    <span className="text-lg">
                        🔌
                    </span>

                    <span>
                        Connectors
                    </span>
                </NavLink>


                <NavLink
                    to="/settings"
                    className={getMenuItemClass}
                >
                    <span className="text-lg">
                        ⚙
                    </span>

                    <span>
                        Settings
                    </span>
                </NavLink>


                <NavLink
                    to="/help/installation"
                    className={getMenuItemClass}
                >
                    <span className="text-lg">
                        ❓
                    </span>

                    <span>
                        Help
                    </span>
                </NavLink>

            </nav>

        </aside>
    );
}

export default Sidebar;