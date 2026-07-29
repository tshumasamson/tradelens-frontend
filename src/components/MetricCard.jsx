function MetricCard({

    title,

    value,

    subtitle = null,

    prefix = "",

    suffix = ""

}) {

    const formatValue = (value) => {

        if (

            value === null ||

            value === undefined

        ) {

            return "-";

        }

        const numericValue = Number(value);

        if (

            !Number.isNaN(
                numericValue
            )

        ) {

            return numericValue.toFixed(2);

        }

        return value;

    };

    const getValueColor = () => {

        const numericValue =
            Number(value);

        if (

            Number.isNaN(
                numericValue
            )

        ) {

            return "text-white";
        }

        if (
            numericValue > 0
        ) {

            return "text-green-400";
        }

        if (
            numericValue < 0
        ) {

            return "text-red-400";
        }

        return "text-white";

    };

    return (

        <div
            className="
            bg-slate-900
            border
            border-slate-800
            rounded-2xl
            p-6
            "
        >

            <p
                className="
                text-slate-400
                text-sm
                uppercase
                tracking-wide
                "
            >
                {title}
            </p>

            {

                subtitle && (

                    <p
                        className="
                        text-slate-300
                        text-sm
                        mt-2
                        truncate
                        "
                    >
                        {subtitle}
                    </p>

                )

            }

            <h2

                className={`
                    text-3xl
                    font-bold
                    mt-3
                    ${getValueColor()}
                `}

            >

                {prefix}

                {

                    formatValue(
                        value
                    )

                }

                {suffix} 

            </h2>

        </div>

    );

}

export default MetricCard;