function OnboardingLayout({

    step = 1,

    totalSteps = 3,

    progress = null,

    title,

    description,

    icon,

    children

}) {


    const progressValue = Math.min(
        100,
        Math.max(
            0,
            progress ??
            Math.round((step / totalSteps) * 100)
        )
    );

    return (

        <div
            className="
            min-h-screen
            bg-slate-950
            flex
            items-center
            justify-center
            px-6
            "
        >

            <div
                className="
                w-full
                max-w-4xl
                max-h-[90vh]
                overflow-y-auto
                "
            >

                <div
                    className="
                    bg-slate-900
                    border
                    border-slate-800
                    rounded-3xl
                    shadow-2xl
                    p-6 md:p-10
                    "
                >

                    <div className="text-4xl md:text-5xl">

                        {icon}

                    </div>

                    <p
                        className="
                        mt-6
                        text-blue-400
                        font-semibold
                        "
                    >

                        Step {step} of {totalSteps}

                    </p>

                    <div
                        className="
                        mt-5
                        w-full
                        bg-slate-800
                        rounded-full
                        h-2
                    "
                    >

                        <div

                            className="
                            bg-blue-500
                            h-2
                            rounded-full
                            transition-all
                            duration-500
                            "

                            style={{
                                width: `${progressValue}%`
                            }}

                        />

                    </div>
                    <div
                        className="
                        mt-2
                        flex
                        justify-end
                        text-xs
                        text-slate-500
                        "
                    >

                        {progressValue}% Complete

                    </div>
                    <h1
                        className="
                        mt-3
                        text-3xl md:text-4xl
                        font-bold
                        text-white
                        "
                    >

                        {title}

                    </h1>

                    {

                        description && (

                            <p
                                className="
                                mt-5
                                text-slate-400
                                leading-7
                                "
                            >

                                {description}

                            </p>

                        )

                    }

                    <div className="mt-10">

                        {children}

                    </div>

                </div>

            </div>

        </div>

    );

}

export default OnboardingLayout;