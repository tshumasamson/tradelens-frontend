// components/common/Modal.jsx

function Modal({

    isOpen,

    title,

    children,

    onClose,

    width = "max-w-2xl"

}) {

    if (!isOpen) {

        return null;

    }

    return (

        <div
            className="
            fixed
            inset-0
            bg-black/60
            flex
            items-center
            justify-center
            z-50
            p-4
            "
        >

            <div
                className={`
                    bg-slate-900
                    border
                    border-slate-700
                    rounded-2xl
                    shadow-2xl
                    w-full
                    ${width}
                `}
            >

                <div
                    className="
                    flex
                    justify-between
                    items-center
                    px-6
                    py-4
                    border-b
                    border-slate-800
                    "
                >

                    <h2
                        className="
                        text-xl
                        font-semibold
                        text-white
                        "
                    >

                        {title}

                    </h2>

                    <button

                        onClick={onClose}

                        className="
                        text-slate-400
                        hover:text-white
                        "

                    >

                        ✕

                    </button>

                </div>

                <div
                    className="
                    p-6
                    "
                >

                    {children}

                </div>

            </div>

        </div>

    );

}

export default Modal;