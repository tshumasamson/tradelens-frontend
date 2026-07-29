function Card({

    title,

    children,

    className = ""

}) {

    return (

        <div
            className={`
                bg-slate-900
                border
                border-slate-800
                rounded-2xl
                p-6
                ${className}
            `}
        >

            {

                title && (

                    <h2
                        className="
                        text-xl
                        font-semibold
                        text-white
                        mb-6
                        "
                    >

                        {title}

                    </h2>

                )

            }

            {children}

        </div>

    );

}

export default Card;