function MetricCard({
    title,
    value,
    subtitle = null,
    prefix = "",
    suffix = "",
    icon = "↗︎",
    iconColor = "text-green-400",
    iconBg = "bg-green-500/10",
}) {
    const numericValue = Number(value);

    const formatValue = (value) => {
        if (value === null || value === undefined) {
            return "-";
        }

        const number = Number(value);

        if (!Number.isNaN(number)) {
            return number.toFixed(2);
        }

        return value;
    };

    /*
     * Profit-based metrics should follow the value:
     *
     * Positive  -> green
     * Negative  -> red
     * Zero      -> neutral/white
     *
     * Non-profit metrics keep their supplied colour.
     */
    const isNegative =
        !Number.isNaN(numericValue) &&
        numericValue < 0;

    const isPositive =
        !Number.isNaN(numericValue) &&
        numericValue > 0;


    /*
     * These are the cards where the value itself represents
     * financial performance.
     */
    const profitMetricTitles = [
        "Net Profit",
        "Total Profit",
        "Best Strategy",
        "Worst Strategy",
        "Best Symbol",
        "Worst Symbol",
        "Best Day",
        "Worst Day",
        "Best Session",
        "Worst Session",
        "Avg Trade",
    ];

    const isProfitMetric =
        profitMetricTitles.includes(title);


    /*
     * Value colour
     */
    const getValueColor = () => {

        if (!isProfitMetric) {
            return "text-white";
        }

        if (isPositive) {
            return "text-green-400";
        }

        if (isNegative) {
            return "text-red-400";
        }

        return "text-slate-300";
    };


    /*
     * Only change the icon automatically for profit metrics.
     *
     * This preserves:
     * - Win Rate icon
     * - Profit Factor icon
     * - Most Active Strategy icon
     * - Most Traded Symbol icon
     */
    const displayIcon =
        isProfitMetric && isNegative
            ? "↘︎"
            : isProfitMetric && isPositive
            ? "↗︎"
            : icon;


    /*
     * Icon colour
     */
    const displayIconColor =
        isProfitMetric && isNegative
            ? "text-red-400"
            : isProfitMetric && isPositive
            ? "text-green-400"
            : iconColor;


    /*
     * Icon background
     */
    const displayIconBg =
        isProfitMetric && isNegative
            ? "bg-red-500/10"
            : isProfitMetric && isPositive
            ? "bg-green-500/10"
            : iconBg;


    return (
        <div
            className="
                bg-slate-900
                border
                border-slate-800
                rounded-xl
                px-5
                py-4
                shadow-sm
                hover:border-slate-700
                transition
            "
        >

            {/* Header */}
            <div className="flex items-center gap-3">

                <div
                    className={`
                        w-9
                        h-9
                        rounded-lg
                        ${displayIconBg}
                        flex
                        items-center
                        justify-center
                        ${displayIconColor}
                        text-lg
                        font-semibold
                        flex-shrink-0
                    `}
                >
                    {displayIcon}
                </div>

                <div className="min-w-0">

                    <p className="text-slate-300 text-sm font-medium truncate">
                        {title}
                    </p>

                    {subtitle && (
                        <p className="text-slate-500 text-xs mt-0.5 truncate">
                            {subtitle}
                        </p>
                    )}

                </div>

            </div>


            {/* Value */}
            <div
                className={`
                    text-2xl
                    font-bold
                    tracking-tight
                    mt-3
                    tabular-nums
                    ${getValueColor()}
                `}
            >
                {prefix}
                {formatValue(value)}
                {suffix}
            </div>

        </div>
    );
}

export default MetricCard;