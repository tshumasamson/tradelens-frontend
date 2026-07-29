import {
    useEffect,
    useState
}
from "react";

import {
    getApiKeys,
    createApiKey,
    revokeApiKey
}
from "../services/apiKeyApi";

function ApiKeys() {

    const [apiKeys, setApiKeys] = useState([]);
    const [name, setName] = useState("");
    const [showKeyModal, setShowKeyModal] = useState(false);
    const [newApiKey, setNewApiKey] = useState(null);

    const loadApiKeys =
        async () => {

            const data =
                await getApiKeys();

            setApiKeys(data);
        };

    useEffect(() => {

        loadApiKeys();

    }, []);

    const handleCreate =
        async () => {

            if (!name.trim()) {
                return;
            }

            const key =
                await createApiKey(
                    name
                );

            setNewApiKey(key);
            setShowKeyModal(true);
            setName("");
            loadApiKeys();
        };

    const handleRevoke =
        async (id) => {

            const confirmed =
                window.confirm(
                    "Revoke this API key?"
                );

            if (!confirmed) {
                return;
            }

            await revokeApiKey(
                id
            );

            loadApiKeys();
        };

    const copyKey =
        async () => {

            await navigator
                .clipboard
                .writeText(
                    newApiKey.key
                );

            alert(
                "API Key copied."
            );
        };

    return (

        <div
            className="
            space-y-8
            "
        >

            <h1
                className="
                text-4xl
                font-bold
                text-white
                "
            >
                API Keys
            </h1>

            <div
                className="
                bg-slate-900
                border
                border-slate-800
                rounded-2xl
                p-6
                "
            >

                <h2
                    className="
                    text-xl
                    text-white
                    mb-4
                    "
                >
                    Generate New API Key
                </h2>

                <div
                    className="
                    flex
                    gap-4
                    "
                >

                    <input

                        value={name}

                        onChange={(e) =>
                            setName(
                                e.target.value
                            )
                        }

                        placeholder="Connector Name"

                        className="
                        flex-1
                        px-4
                        py-3
                        rounded-xl
                        bg-slate-800
                        text-white
                        "
                    />

                    <button

                        onClick={
                            handleCreate
                        }

                        className="
                        bg-blue-600
                        hover:bg-blue-700
                        px-5
                        rounded-xl
                        text-white
                        "
                    >

                        Generate

                    </button>

                </div>

            </div>

<div
    className="
    max-h-[320px]
    overflow-y-auto
    scrollbar-thin
    scrollbar-thumb-slate-700
    scrollbar-track-slate-900
    "
>

                <table
                    className="
                    w-full
                    text-white
                    "
                >

                    <thead>

                        <tr
                            className="
                            bg-slate-800
                            "
                        >

                            <th className="px-6 py-4 text-left">
                                Name
                            </th>

                            <th className="px-6 py-4 text-left">
                                Key
                            </th>

                            <th className="px-6 py-4 text-left">
                                Status
                            </th>

                            <th className="px-6 py-4 text-left">
                                Actions
                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {

                            apiKeys.map(
                                (key) => (

                                    <tr
                                        key={key.id}
                                        className="
                                        border-t
                                        border-slate-800
                                        "
                                    >

                                        <td className="px-6 py-4">
                                            {key.name}
                                        </td>

                                        <td className="px-6 py-4">
                                            {key.masked_key}
                                        </td>

                                        <td className="px-6 py-4">

                                            {

                                                key.is_active

                                                ?

                                                <span
                                                    className="
                                                    text-green-400
                                                    "
                                                >
                                                    Active
                                                </span>

                                                :

                                                <span
                                                    className="
                                                    text-red-400
                                                    "
                                                >
                                                    Revoked
                                                </span>

                                            }

                                        </td>

                                        <td className="px-6 py-4">

                                            {

                                                key.is_active && (

                                                    <button

                                                        onClick={() =>
                                                            handleRevoke(
                                                                key.id
                                                            )
                                                        }

                                                        className="
                                                        bg-red-600
                                                        hover:bg-red-700
                                                        px-3
                                                        py-2
                                                        rounded-lg
                                                        text-white
                                                        "
                                                    >

                                                        Revoke

                                                    </button>

                                                )

                                            }

                                        </td>

                                    </tr>

                                )
                            )

                        }

                    </tbody>

                </table>

            </div>

            {
                showKeyModal && (

                    <div
                        className="
                        fixed
                        inset-0
                        bg-black/70
                        flex
                        items-center
                        justify-center
                        z-50
                        "
                    >

                        <div
                            className="
                            bg-slate-900
                            border
                            border-slate-800
                            rounded-2xl
                            p-8
                            w-full
                            max-w-lg
                            shadow-2xl
                            "
                        >

                            <h2
                                className="
                                text-2xl
                                font-bold
                                text-white
                                mb-4
                                "
                            >
                                🔑 API Key Created
                            </h2>

                            <p
                                className="
                                text-slate-400
                                mb-6
                                "
                            >
                                Copy this API key now.
                                You won't be able to
                                see it again.
                            </p>

                            <div
                                className="
                                bg-slate-800
                                border
                                border-slate-700
                                rounded-xl
                                p-4
                                break-all
                                text-green-400
                                font-mono
                                text-sm
                                mb-6
                                "
                            >
                                {newApiKey?.key}
                            </div>

                            <div
                                className="
                                flex
                                justify-end
                                gap-3
                                "
                            >

                                <button

                                    onClick={
                                        copyKey
                                    }

                                    className="
                                    px-4
                                    py-2
                                    rounded-xl
                                    bg-blue-600
                                    hover:bg-blue-700
                                    text-white
                                    "
                                >
                                    Copy
                                </button>

                                <button

                                    onClick={() => {

                                        setShowKeyModal(
                                            false
                                        );

                                        setNewApiKey(
                                            null
                                        );

                                    }}

                                    className="
                                    px-4
                                    py-2
                                    rounded-xl
                                    bg-slate-700
                                    hover:bg-slate-600
                                    text-white
                                    "
                                >
                                    Done
                                </button>

                            </div>

                        </div>

                    </div>

                )
            }

        </div>

    );
}

export default ApiKeys;