// components/common/StatusBadge.jsx

function StatusBadge({

    color = "gray",

    children

}) {

    const colors = {

        green:
            "bg-green-600",

        red:
            "bg-red-600",

        yellow:
            "bg-yellow-600",

        blue:
            "bg-blue-600",

        gray:
            "bg-slate-600"

    };

    return (

        <span
            className={`
                inline-flex
                items-center
                gap-2
                px-3
                py-1
                rounded-full
                text-xs
                font-semibold
                text-white
                ${colors[color]}
            `}
        >

            <span>

                ●

            </span>

            <span>

                {children}

            </span>

        </span>

    );

}

export default StatusBadge;