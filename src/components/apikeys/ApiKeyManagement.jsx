import { useEffect, useState } from "react";
import {
    getApiKeys,
    createApiKey,
    revokeApiKey,
} from "../../services/apiKeyApi";

function ApiKeyManagement() {
    const [apiKeys, setApiKeys] = useState([]);
    const [name, setName] = useState("");

    const [loading, setLoading] = useState(true);
    const [creating, setCreating] = useState(false);
    const [revokingId, setRevokingId] = useState(null);

    const [error, setError] = useState("");

    const [showCreateForm, setShowCreateForm] = useState(false);
    const [showKeyModal, setShowKeyModal] = useState(false);
    const [newApiKey, setNewApiKey] = useState(null);

    const [copied, setCopied] = useState(false);

    // ---------------------------------------------------------
    // Load API keys
    // ---------------------------------------------------------

    const loadApiKeys = async () => {
        try {
            setError("");

            const data = await getApiKeys();

            setApiKeys(Array.isArray(data) ? data : []);
        } catch (err) {
            console.error("Failed to load API keys:", err);

            setError(
                "Unable to load your API keys. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadApiKeys();
    }, []);

    // ---------------------------------------------------------
    // Create API key
    // ---------------------------------------------------------

    const handleCreate = async (e) => {
        e?.preventDefault();

        const trimmedName = name.trim();

        if (!trimmedName) {
            setError("Please enter a name for the API key.");
            return;
        }

        try {
            setCreating(true);
            setError("");
            setCopied(false);

            const key = await createApiKey(trimmedName);

            setNewApiKey(key);
            setShowKeyModal(true);
            setShowCreateForm(false);
            setName("");

            await loadApiKeys();
        } catch (err) {
            console.error("Failed to create API key:", err);

            setError(
                err?.response?.data?.detail ||
                "Unable to create the API key. Please try again."
            );
        } finally {
            setCreating(false);
        }
    };

    // ---------------------------------------------------------
    // Revoke API key
    // ---------------------------------------------------------

    const handleRevoke = async (id) => {
        const confirmed = window.confirm(
            "Revoke this API key?\n\nAny connector using this key will no longer be able to authenticate."
        );

        if (!confirmed) {
            return;
        }

        try {
            setRevokingId(id);
            setError("");

            await revokeApiKey(id);

            await loadApiKeys();
        } catch (err) {
            console.error("Failed to revoke API key:", err);

            setError(
                err?.response?.data?.detail ||
                "Unable to revoke the API key. Please try again."
            );
        } finally {
            setRevokingId(null);
        }
    };

    // ---------------------------------------------------------
    // Copy newly generated key
    // ---------------------------------------------------------

    const copyKey = async () => {
        if (!newApiKey?.key) {
            return;
        }

        try {
            await navigator.clipboard.writeText(newApiKey.key);

            setCopied(true);

            setTimeout(() => {
                setCopied(false);
            }, 2000);
        } catch (err) {
            console.error("Unable to copy API key:", err);

            setError(
                "Unable to copy the API key. Please copy it manually."
            );
        }
    };

    // ---------------------------------------------------------
    // Close secret modal
    // ---------------------------------------------------------

    const closeKeyModal = () => {
        setShowKeyModal(false);
        setNewApiKey(null);
        setCopied(false);
    };

    // ---------------------------------------------------------
    // Empty state
    // ---------------------------------------------------------

    const renderEmptyState = () => (
        <div className="px-6 py-14 text-center">
            <div className="mx-auto w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                <span className="text-blue-400 text-xl">
                    🔑
                </span>
            </div>

            <h3 className="mt-4 text-base font-semibold text-white">
                No API Keys
            </h3>

            <p className="mt-2 max-w-md mx-auto text-sm text-slate-500">
                Create an API key to securely connect TradeLens
                connectors and integrations to your account.
            </p>

            <button
                type="button"
                onClick={() => {
                    setError("");
                    setShowCreateForm(true);
                }}
                className="
                    mt-5
                    inline-flex
                    items-center
                    gap-2
                    px-4
                    py-2.5
                    rounded-lg
                    bg-blue-600
                    hover:bg-blue-500
                    text-white
                    text-sm
                    font-medium
                    transition
                "
            >
                <span>+</span>
                Create API Key
            </button>
        </div>
    );

    // ---------------------------------------------------------
    // Loading state
    // ---------------------------------------------------------

    if (loading) {
        return (
            <div className="space-y-5">
                <div>
                    <h1 className="text-xl font-semibold text-white">
                        API Keys
                    </h1>

                    <p className="text-sm text-slate-500 mt-1">
                        Manage credentials used by TradeLens
                        connectors and integrations.
                    </p>
                </div>

                <div className="bg-slate-900 border border-slate-800 rounded-xl shadow-sm">
                    <div className="px-5 py-4 border-b border-slate-800">
                        <div className="h-4 w-32 bg-slate-800 rounded animate-pulse" />
                    </div>

                    <div className="p-6 space-y-4">
                        {[1, 2, 3].map((item) => (
                            <div
                                key={item}
                                className="h-12 bg-slate-800/50 rounded-lg animate-pulse"
                            />
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-5">

            {/* -------------------------------------------------
                Header
            ------------------------------------------------- */}

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

                <div>
                    <h1 className="text-xl font-semibold text-white">
                        API Keys
                    </h1>

                    <p className="text-sm text-slate-500 mt-1">
                        Manage credentials used by TradeLens
                        connectors and integrations.
                    </p>
                </div>

                {!showCreateForm && (
                    <button
                        type="button"
                        onClick={() => {
                            setError("");
                            setShowCreateForm(true);
                        }}
                        className="
                            inline-flex
                            items-center
                            justify-center
                            gap-2
                            px-4
                            py-2.5
                            rounded-lg
                            bg-blue-600
                            hover:bg-blue-500
                            text-white
                            text-sm
                            font-medium
                            transition
                            whitespace-nowrap
                        "
                    >
                        <span className="text-base leading-none">
                            +
                        </span>

                        Create API Key
                    </button>
                )}
            </div>

            {/* -------------------------------------------------
                Error
            ------------------------------------------------- */}

            {error && (
                <div className="flex items-start gap-3 px-4 py-3 rounded-lg border border-red-500/20 bg-red-500/10">
                    <span className="text-red-400 text-sm">
                        !
                    </span>

                    <p className="text-sm text-red-300 flex-1">
                        {error}
                    </p>

                    <button
                        type="button"
                        onClick={() => setError("")}
                        className="text-red-400 hover:text-red-300 text-sm"
                    >
                        ×
                    </button>
                </div>
            )}

            {/* -------------------------------------------------
                Create form
            ------------------------------------------------- */}

            {showCreateForm && (
                <div className="bg-slate-900 border border-slate-800 rounded-xl shadow-sm">

                    <div className="px-5 py-4 border-b border-slate-800 flex items-center justify-between">
                        <div>
                            <h2 className="text-sm font-semibold text-white">
                                Create API Key
                            </h2>

                            <p className="text-xs text-slate-500 mt-1">
                                Give this key a name so you can identify
                                where it is being used.
                            </p>
                        </div>

                        <button
                            type="button"
                            onClick={() => {
                                setShowCreateForm(false);
                                setName("");
                            }}
                            className="
                                w-8
                                h-8
                                rounded-lg
                                flex
                                items-center
                                justify-center
                                text-slate-400
                                hover:text-white
                                hover:bg-slate-800
                                transition
                            "
                            aria-label="Close"
                        >
                            ×
                        </button>
                    </div>

                    <form
                        onSubmit={handleCreate}
                        className="p-5"
                    >
                        <div className="max-w-xl">

                            <label
                                htmlFor="api-key-name"
                                className="block text-xs font-medium text-slate-400 mb-2"
                            >
                                API Key Name
                            </label>

                            <input
                                id="api-key-name"
                                type="text"
                                value={name}
                                onChange={(e) =>
                                    setName(e.target.value)
                                }
                                placeholder="e.g. MT5 Connector"
                                disabled={creating}
                                autoFocus
                                className="
                                    w-full
                                    px-3.5
                                    py-2.5
                                    rounded-lg
                                    bg-slate-950
                                    border
                                    border-slate-700
                                    text-slate-200
                                    placeholder:text-slate-600
                                    text-sm
                                    outline-none
                                    focus:border-blue-500
                                    focus:ring-1
                                    focus:ring-blue-500/30
                                    disabled:opacity-50
                                    transition
                                "
                            />

                            <p className="text-xs text-slate-600 mt-2">
                                Example: MT5 Connector, Laptop Connector,
                                or Backup Connector.
                            </p>
                        </div>

                        <div className="flex items-center gap-2 mt-5">

                            <button
                                type="submit"
                                disabled={creating || !name.trim()}
                                className="
                                    px-4
                                    py-2.5
                                    rounded-lg
                                    bg-blue-600
                                    hover:bg-blue-500
                                    disabled:opacity-40
                                    disabled:cursor-not-allowed
                                    text-white
                                    text-sm
                                    font-medium
                                    transition
                                "
                            >
                                {creating
                                    ? "Generating..."
                                    : "Generate API Key"
                                }
                            </button>

                            <button
                                type="button"
                                disabled={creating}
                                onClick={() => {
                                    setShowCreateForm(false);
                                    setName("");
                                }}
                                className="
                                    px-4
                                    py-2.5
                                    rounded-lg
                                    border
                                    border-slate-700
                                    bg-slate-900
                                    hover:bg-slate-800
                                    text-slate-300
                                    text-sm
                                    font-medium
                                    transition
                                "
                            >
                                Cancel
                            </button>

                        </div>
                    </form>
                </div>
            )}

            {/* -------------------------------------------------
                API key table
            ------------------------------------------------- */}

            <div className="bg-slate-900 border border-slate-800 rounded-xl shadow-sm overflow-hidden">

                <div className="px-5 py-4 border-b border-slate-800 flex items-center justify-between">

                    <div>
                        <h2 className="text-sm font-semibold text-white">
                            Your API Keys
                        </h2>

                        <p className="text-xs text-slate-500 mt-1">
                            {apiKeys.length}{" "}
                            {apiKeys.length === 1
                                ? "key"
                                : "keys"}{" "}
                            configured
                        </p>
                    </div>

                </div>

                {apiKeys.length === 0 ? (
                    renderEmptyState()
                ) : (
                    <div className="overflow-x-auto">

                        <table className="w-full min-w-[720px] text-sm">

                            <thead className="bg-slate-950/40 border-b border-slate-800">
                                <tr className="text-xs uppercase tracking-wide text-slate-500">

                                    <th className="text-left px-5 py-3 font-medium">
                                        Name
                                    </th>

                                    <th className="text-left px-4 py-3 font-medium">
                                        API Key
                                    </th>

                                    <th className="text-left px-4 py-3 font-medium">
                                        Status
                                    </th>

                                    <th className="text-right px-5 py-3 font-medium">
                                        Actions
                                    </th>

                                </tr>
                            </thead>

                            <tbody className="divide-y divide-slate-800/70">

                                {apiKeys.map((key) => {

                                    const isRevoking =
                                        revokingId === key.id;

                                    return (
                                        <tr
                                            key={key.id}
                                            className="
                                                hover:bg-slate-800/30
                                                transition
                                            "
                                        >

                                            {/* Name */}

                                            <td className="px-5 py-4">

                                                <div className="text-slate-200 font-medium">
                                                    {key.name}
                                                </div>

                                            </td>

                                            {/* Masked key */}

                                            <td className="px-4 py-4">

                                                <span className="
                                                    inline-flex
                                                    items-center
                                                    px-2.5
                                                    py-1
                                                    rounded-md
                                                    bg-slate-950
                                                    border
                                                    border-slate-800
                                                    text-slate-400
                                                    font-mono
                                                    text-xs
                                                ">
                                                    {key.masked_key || "••••••••••••"}
                                                </span>

                                            </td>

                                            {/* Status */}

                                            <td className="px-4 py-4">

                                                {key.is_active ? (
                                                    <span className="
                                                        inline-flex
                                                        items-center
                                                        gap-1.5
                                                        px-2.5
                                                        py-1
                                                        rounded-md
                                                        bg-green-500/10
                                                        border
                                                        border-green-500/20
                                                        text-green-400
                                                        text-xs
                                                        font-medium
                                                    ">
                                                        <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                                                        Active
                                                    </span>
                                                ) : (
                                                    <span className="
                                                        inline-flex
                                                        items-center
                                                        gap-1.5
                                                        px-2.5
                                                        py-1
                                                        rounded-md
                                                        bg-red-500/10
                                                        border
                                                        border-red-500/20
                                                        text-red-400
                                                        text-xs
                                                        font-medium
                                                    ">
                                                        <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
                                                        Revoked
                                                    </span>
                                                )}

                                            </td>

                                            {/* Actions */}

                                            <td className="px-5 py-4 text-right">

                                                {key.is_active ? (
                                                    <button
                                                        type="button"
                                                        disabled={isRevoking}
                                                        onClick={() =>
                                                            handleRevoke(
                                                                key.id
                                                            )
                                                        }
                                                        className="
                                                            px-3
                                                            py-1.5
                                                            rounded-lg
                                                            border
                                                            border-red-500/20
                                                            bg-red-500/5
                                                            hover:bg-red-500/10
                                                            text-red-400
                                                            text-xs
                                                            font-medium
                                                            disabled:opacity-40
                                                            disabled:cursor-not-allowed
                                                            transition
                                                        "
                                                    >
                                                        {isRevoking
                                                            ? "Revoking..."
                                                            : "Revoke"
                                                        }
                                                    </button>
                                                ) : (
                                                    <span className="text-xs text-slate-600">
                                                        No actions
                                                    </span>
                                                )}

                                            </td>

                                        </tr>
                                    );
                                })}

                            </tbody>

                        </table>

                    </div>
                )}

            </div>

            {/* -------------------------------------------------
                One-time secret modal
            ------------------------------------------------- */}

            {showKeyModal && newApiKey?.key && (
                <div
                    className="
                        fixed
                        inset-0
                        z-50
                        flex
                        items-center
                        justify-center
                        bg-black/70
                        backdrop-blur-sm
                        p-4
                    "
                    onClick={closeKeyModal}
                >

                    <div
                        className="
                            w-full
                            max-w-lg
                            bg-slate-900
                            border
                            border-slate-800
                            rounded-xl
                            shadow-2xl
                            overflow-hidden
                        "
                        onClick={(e) =>
                            e.stopPropagation()
                        }
                    >

                        {/* Modal header */}

                        <div className="px-6 py-5 border-b border-slate-800">

                            <div className="flex items-start justify-between gap-4">

                                <div className="flex items-start gap-3">

                                    <div className="
                                        w-10
                                        h-10
                                        rounded-lg
                                        bg-green-500/10
                                        border
                                        border-green-500/20
                                        flex
                                        items-center
                                        justify-center
                                        flex-shrink-0
                                    ">
                                        <span className="text-green-400">
                                            ✓
                                        </span>
                                    </div>

                                    <div>
                                        <h2 className="text-base font-semibold text-white">
                                            API Key Created
                                        </h2>

                                        <p className="text-xs text-slate-500 mt-1">
                                            Save this key before closing.
                                        </p>
                                    </div>

                                </div>

                                <button
                                    type="button"
                                    onClick={closeKeyModal}
                                    className="
                                        w-8
                                        h-8
                                        rounded-lg
                                        flex
                                        items-center
                                        justify-center
                                        text-slate-400
                                        hover:text-white
                                        hover:bg-slate-800
                                        transition
                                    "
                                    aria-label="Close"
                                >
                                    ×
                                </button>

                            </div>

                        </div>

                        {/* Secret */}

                        <div className="p-6">

                            <div className="
                                rounded-lg
                                border
                                border-amber-500/20
                                bg-amber-500/5
                                px-4
                                py-3
                                mb-5
                            ">
                                <p className="text-xs text-amber-300">
                                    This key will only be shown once.
                                    Copy it now and store it securely.
                                </p>
                            </div>

                            <div className="
                                bg-slate-950
                                border
                                border-slate-700
                                rounded-lg
                                p-4
                                font-mono
                                text-sm
                                text-green-400
                                break-all
                                select-all
                            ">
                                {newApiKey.key}
                            </div>

                            {/* Actions */}

                            <div className="flex items-center justify-end gap-2 mt-5">

                                <button
                                    type="button"
                                    onClick={copyKey}
                                    className={`
                                        px-4
                                        py-2.5
                                        rounded-lg
                                        text-sm
                                        font-medium
                                        transition
                                        ${
                                            copied
                                                ? "bg-green-600 text-white"
                                                : "bg-blue-600 hover:bg-blue-500 text-white"
                                        }
                                    `}
                                >
                                    {copied
                                        ? "✓ Copied"
                                        : "Copy API Key"
                                    }
                                </button>

                                <button
                                    type="button"
                                    onClick={closeKeyModal}
                                    className="
                                        px-4
                                        py-2.5
                                        rounded-lg
                                        border
                                        border-slate-700
                                        bg-slate-900
                                        hover:bg-slate-800
                                        text-slate-300
                                        text-sm
                                        font-medium
                                        transition
                                    "
                                >
                                    Done
                                </button>

                            </div>

                        </div>

                    </div>

                </div>
            )}

        </div>
    );
}

export default ApiKeyManagement;