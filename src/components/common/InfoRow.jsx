function InfoRow({

    label,

    value,

    border = true

}) {

    return (

        <div
            className={`
                flex
                justify-between
                items-start
                ${border
                    ? "border-b border-slate-800 pb-3"
                    : ""
                }
            `}
        >

            <span
                className="
                text-slate-400
                "
            >

                {label}

            </span>

            <div
                className="
                text-right
                text-white
                font-medium
                "
            >

                {value}

            </div>

        </div>

    );

}

export default InfoRow;