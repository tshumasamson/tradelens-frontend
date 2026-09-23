import { useEffect, useState } from "react";

import {
    getAccounts,
    deleteAccount,
    createAccount,
    updateAccount
} from "../services/accountManagementApi";

import OnboardingLayout from "../components/onboarding/OnboardingLayout";

import { setSelectedAccount } from "../services/accountApi";
import {
    notifyAccountsChanged
} from "../services/accountEvents";


function Accounts({
    onboarding = false,
    onComplete = null
}) {

    const [accounts, setAccounts] = useState([]);

    const [showForm, setShowForm] = useState(false);

    const [editingAccount, setEditingAccount] =
        useState(null);

    const [loading, setLoading] = useState(true);

    const [saving, setSaving] = useState(false);

    const [deletingId, setDeletingId] =
        useState(null);

    const [error, setError] = useState("");

    const [formData, setFormData] = useState({
        account_number: "",
        broker: "",
        account_name: ""
    });


    /*
    |--------------------------------------------------------------------------
    | Load accounts
    |--------------------------------------------------------------------------
    */

    const loadAccounts = async () => {

        try {

            setLoading(true);
            setError("");

            const data = await getAccounts();

            setAccounts(data);

        } catch (err) {

            console.error(
                "Failed to load accounts:",
                err
            );

            setError(
                "Unable to load your trading accounts."
            );

        } finally {

            setLoading(false);

        }

    };


    /*
    |--------------------------------------------------------------------------
    | Initial load
    |--------------------------------------------------------------------------
    */

    useEffect(() => {

        loadAccounts();

    }, []);


    /*
    |--------------------------------------------------------------------------
    | Reset form
    |--------------------------------------------------------------------------
    */

    const resetForm = () => {

        setFormData({
            account_number: "",
            broker: "",
            account_name: ""
        });

        setEditingAccount(null);

    };


    /*
    |--------------------------------------------------------------------------
    | Open create form
    |--------------------------------------------------------------------------
    */

    const openCreateForm = () => {

        resetForm();

        setShowForm(true);

    };


    /*
    |--------------------------------------------------------------------------
    | Open edit form
    |--------------------------------------------------------------------------
    */

    const openEditForm = (account) => {

        setEditingAccount(account);

        setFormData({
            account_number:
                account.account_number || "",

            broker:
                account.broker || "",

            account_name:
                account.account_name || ""
        });

        setShowForm(true);

    };


    /*
    |--------------------------------------------------------------------------
    | Close form
    |--------------------------------------------------------------------------
    */

    const closeForm = () => {

        if (saving) {
            return;
        }

        setShowForm(false);

        resetForm();

    };


    /*
    |--------------------------------------------------------------------------
    | Handle input changes
    |--------------------------------------------------------------------------
    */

    const handleChange = (field, value) => {

        setFormData((previous) => ({
            ...previous,
            [field]: value
        }));

    };


    /*
    |--------------------------------------------------------------------------
    | Submit account
    |--------------------------------------------------------------------------
    */

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (saving) {
            return;
        }

        try {

            setSaving(true);
            setError("");

            if (editingAccount) {

                await updateAccount(
                    editingAccount.id,
                    formData
                );

            } else {

                const account =
                    await createAccount(
                        formData
                    );

                /*
                Select the newly created account.
                */

                setSelectedAccount(
                    account.id
                );

                notifyAccountsChanged();

            }

            setShowForm(false);

            resetForm();

            await loadAccounts();

            /*
            Complete onboarding if this page
            is being used as onboarding step 1.
            */

            if (
                onboarding &&
                onComplete
            ) {

                onComplete();

            }

        } catch (err) {

            console.error(
                "Failed to save account:",
                err
            );

            setError(
                "Unable to save the trading account. Please check the details and try again."
            );

        } finally {

            setSaving(false);

        }

    };


    /*
    |--------------------------------------------------------------------------
    | Delete account
    |--------------------------------------------------------------------------
    */

    const handleDelete = async (id) => {

        const confirmed =
            window.confirm(
                "Are you sure you want to delete this MT5 account?"
            );

        if (!confirmed) {
            return;
        }

        try {

            setDeletingId(id);
            setError("");

            await deleteAccount(id);

            /*
            Notify the rest of TradeLens that the
            account list has changed.
            */

            notifyAccountsChanged();

            await loadAccounts();

        } catch (err) {

            console.error(
                "Failed to delete account:",
                err
            );

            setError(
                "Unable to delete the trading account."
            );

        } finally {

            setDeletingId(null);

        }

    };


    /*
    |--------------------------------------------------------------------------
    | Empty state
    |--------------------------------------------------------------------------
    */

    const noAccounts =
        !loading &&
        accounts.length === 0;


    /*
    |--------------------------------------------------------------------------
    | Render
    |--------------------------------------------------------------------------
    */

    const content = (

        <div className="space-y-5">


            {/* ================================================== */}
            {/* Page Header */}
            {/* ================================================== */}

            <div className="
                flex
                items-center
                justify-between
                gap-4
            ">

                <div>

                    <h1 className="
                        text-xl
                        font-semibold
                        text-white
                    ">

                        {onboarding
                            ? "Link MT5 Account"
                            : "Trading Accounts"
                        }

                    </h1>


                    <p className="
                        text-xs
                        text-slate-500
                        mt-1
                    ">

                        {onboarding
                            ? "Connect the MT5 account you want TradeLens to monitor."
                            : "Manage your connected MT5 trading accounts."
                        }

                    </p>

                </div>


                {!onboarding && !noAccounts && (

                    <button

                        type="button"

                        onClick={openCreateForm}

                        className="
                            inline-flex
                            items-center
                            gap-2
                            px-4
                            py-2
                            rounded-lg
                            bg-blue-600
                            hover:bg-blue-500
                            text-white
                            text-sm
                            font-medium
                            transition
                            shadow-sm
                        "
                    >

                        <span className="text-base">
                            +
                        </span>

                        Link MT5 Account

                    </button>

                )}

            </div>


            {/* ================================================== */}
            {/* Error Message */}
            {/* ================================================== */}

            {error && (

                <div className="
                    bg-red-500/5
                    border
                    border-red-500/20
                    rounded-xl
                    px-4
                    py-3
                ">

                    <div className="
                        flex
                        items-start
                        gap-3
                    ">

                        <span className="
                            text-red-400
                            text-sm
                        ">
                            !
                        </span>

                        <p className="
                            text-sm
                            text-red-400
                        ">
                            {error}
                        </p>

                    </div>

                </div>

            )}


            {/* ================================================== */}
            {/* Loading */}
            {/* ================================================== */}

            {loading && (

                <div className="
                    bg-slate-900
                    border
                    border-slate-800
                    rounded-xl
                    p-8
                ">

                    <div className="
                        flex
                        items-center
                        justify-center
                        gap-3
                    ">

                        <div className="
                            w-4
                            h-4
                            border-2
                            border-slate-600
                            border-t-blue-400
                            rounded-full
                            animate-spin
                        " />

                        <span className="
                            text-sm
                            text-slate-500
                        ">
                            Loading accounts...
                        </span>

                    </div>

                </div>

            )}


            {/* ================================================== */}
            {/* Empty State */}
            {/* ================================================== */}

            {noAccounts && (

                <div className="
                    bg-slate-900
                    border
                    border-slate-800
                    rounded-xl
                    shadow-sm
                    p-10
                    text-center
                ">

                    <div className="
                        w-12
                        h-12
                        mx-auto
                        rounded-xl
                        bg-blue-500/10
                        border
                        border-blue-500/20
                        flex
                        items-center
                        justify-center
                        text-blue-400
                        text-xl
                    ">
                        +
                    </div>


                    <h2 className="
                        text-base
                        font-semibold
                        text-white
                        mt-4
                    ">

                        No MT5 accounts connected

                    </h2>


                    <p className="
                        text-sm
                        text-slate-500
                        mt-2
                        max-w-md
                        mx-auto
                    ">

                        Connect an MT5 trading account
                        to start tracking trades and
                        performance in TradeLens.

                    </p>


                    <button

                        type="button"

                        onClick={openCreateForm}

                        className="
                            mt-6
                            inline-flex
                            items-center
                            gap-2
                            px-4
                            py-2
                            rounded-lg
                            bg-blue-600
                            hover:bg-blue-500
                            text-white
                            text-sm
                            font-medium
                            transition
                        "
                    >

                        <span>
                            +
                        </span>

                        Link MT5 Account

                    </button>

                </div>

            )}


            {/* ================================================== */}
            {/* Accounts Table */}
            {/* ================================================== */}

            {!loading && !noAccounts && (

                <div className="
                    bg-slate-900
                    border
                    border-slate-800
                    rounded-xl
                    shadow-sm
                    overflow-hidden
                ">

                    <div className="
                        px-5
                        py-4
                        border-b
                        border-slate-800
                        flex
                        items-center
                        justify-between
                    ">

                        <div>

                            <h2 className="
                                text-base
                                font-semibold
                                text-white
                            ">
                                Connected Accounts
                            </h2>

                            <p className="
                                text-xs
                                text-slate-500
                                mt-1
                            ">

                                {accounts.length}{" "}
                                {accounts.length === 1
                                    ? "account"
                                    : "accounts"
                                }

                            </p>

                        </div>


                        {!onboarding && (

                            <button

                                type="button"

                                onClick={openCreateForm}

                                className="
                                    text-xs
                                    text-blue-400
                                    hover:text-blue-300
                                    transition
                                "
                            >

                                + Add account

                            </button>

                        )}

                    </div>


                    <div className="
                        overflow-x-auto
                    ">

                        <table className="
                            w-full
                            min-w-[700px]
                            text-sm
                        ">

                            <thead className="
                                bg-slate-950/40
                                border-b
                                border-slate-800
                            ">

                                <tr className="
                                    text-xs
                                    uppercase
                                    tracking-wide
                                    text-slate-500
                                ">

                                    <th className="
                                        text-left
                                        px-5
                                        py-3
                                        font-medium
                                    ">
                                        Account
                                    </th>


                                    <th className="
                                        text-left
                                        px-4
                                        py-3
                                        font-medium
                                    ">
                                        Account Number
                                    </th>


                                    <th className="
                                        text-left
                                        px-4
                                        py-3
                                        font-medium
                                    ">
                                        Broker
                                    </th>


                                    <th className="
                                        text-left
                                        px-4
                                        py-3
                                        font-medium
                                    ">
                                        Status
                                    </th>


                                    <th className="
                                        text-right
                                        px-5
                                        py-3
                                        font-medium
                                    ">
                                        Actions
                                    </th>

                                </tr>

                            </thead>


                            <tbody className="
                                divide-y
                                divide-slate-800/70
                            ">

                                {accounts.map(
                                    (account) => (

                                        <tr

                                            key={account.id}

                                            className="
                                                hover:bg-slate-800/30
                                                transition
                                            "
                                        >

                                            {/* Account */}

                                            <td className="
                                                px-5
                                                py-4
                                            ">

                                                <div className="
                                                    flex
                                                    items-center
                                                    gap-3
                                                ">

                                                    <div className="
                                                        w-8
                                                        h-8
                                                        rounded-lg
                                                        bg-blue-500/10
                                                        border
                                                        border-blue-500/20
                                                        flex
                                                        items-center
                                                        justify-center
                                                        text-blue-400
                                                        text-xs
                                                        font-semibold
                                                    ">

                                                        MT

                                                    </div>


                                                    <div>

                                                        <div className="
                                                            text-slate-200
                                                            font-medium
                                                        ">

                                                            {
                                                                account.account_name
                                                            }

                                                        </div>


                                                        <div className="
                                                            text-xs
                                                            text-slate-500
                                                            mt-0.5
                                                        ">

                                                            Trading / MT5 Account

                                                        </div>

                                                    </div>

                                                </div>

                                            </td>


                                            {/* Account Number */}

                                            <td className="
                                                px-4
                                                py-4
                                                text-slate-300
                                                tabular-nums
                                            ">

                                                {
                                                    account.account_number
                                                }

                                            </td>


                                            {/* Broker */}

                                            <td className="
                                                px-4
                                                py-4
                                                text-slate-300
                                            ">

                                                {
                                                    account.broker
                                                }

                                            </td>


                                            {/* Status */}

                                            <td className="
                                                px-4
                                                py-4
                                            ">

                                                <span className="
                                                    inline-flex
                                                    items-center
                                                    gap-1.5
                                                    text-xs
                                                    font-medium
                                                    text-green-400
                                                ">

                                                    <span className="
                                                        w-1.5
                                                        h-1.5
                                                        rounded-full
                                                        bg-green-400
                                                    " />

                                                    Connected

                                                </span>

                                            </td>


                                            {/* Actions */}

                                            <td className="
                                                px-5
                                                py-4
                                            ">

                                                <div className="
                                                    flex
                                                    items-center
                                                    justify-end
                                                    gap-2
                                                ">


                                                    {/* Edit */}

                                                    <button

                                                        type="button"

                                                        onClick={() =>
                                                            openEditForm(
                                                                account
                                                            )
                                                        }

                                                        className="
                                                            px-3
                                                            py-1.5
                                                            rounded-lg
                                                            border
                                                            border-slate-700
                                                            bg-slate-950
                                                            text-slate-300
                                                            hover:text-white
                                                            hover:bg-slate-800
                                                            text-xs
                                                            font-medium
                                                            transition
                                                        "
                                                    >

                                                        Edit

                                                    </button>


                                                    {/* Delete */}

                                                    <button

                                                        type="button"

                                                        onClick={() =>
                                                            handleDelete(
                                                                account.id
                                                            )
                                                        }

                                                        disabled={
                                                            deletingId ===
                                                            account.id
                                                        }

                                                        className="
                                                            px-3
                                                            py-1.5
                                                            rounded-lg
                                                            border
                                                            border-red-500/20
                                                            bg-red-500/5
                                                            text-red-400
                                                            hover:bg-red-500/10
                                                            text-xs
                                                            font-medium
                                                            transition
                                                            disabled:opacity-40
                                                            disabled:cursor-not-allowed
                                                        "
                                                    >

                                                        {deletingId ===
                                                        account.id
                                                            ? "Deleting..."
                                                            : "Delete"
                                                        }

                                                    </button>

                                                </div>

                                            </td>

                                        </tr>

                                    )
                                )}

                            </tbody>

                        </table>

                    </div>

                </div>

            )}


            {/* ================================================== */}
            {/* Account Form Modal */}
            {/* ================================================== */}

            {showForm && (

                <div

                    onClick={closeForm}

                    className="
                        fixed
                        inset-0
                        z-50
                        bg-black/70
                        backdrop-blur-sm
                        flex
                        items-center
                        justify-center
                        p-4
                    "
                >

                    <form

                        onSubmit={handleSubmit}

                        onClick={(e) =>
                            e.stopPropagation()
                        }

                        className="
                            bg-slate-900
                            border
                            border-slate-800
                            rounded-xl
                            w-full
                            max-w-md
                            shadow-2xl
                            overflow-hidden
                        "
                    >

                        {/* Modal Header */}

                        <div className="
                            px-6
                            py-5
                            border-b
                            border-slate-800
                            flex
                            items-start
                            justify-between
                        ">

                            <div>

                                <h2 className="
                                    text-base
                                    font-semibold
                                    text-white
                                ">

                                    {onboarding
                                        ? "Link MT5 Account"
                                        : editingAccount
                                            ? "Edit Account"
                                            : "Link MT5 Account"
                                    }

                                </h2>


                                <p className="
                                    text-xs
                                    text-slate-500
                                    mt-1
                                ">

                                    {onboarding
                                        ? "Step 1 of 3 • Link your MT5 account"
                                        : editingAccount
                                            ? "Update your trading account details"
                                            : "Add a trading account to TradeLens"
                                    }

                                </p>

                            </div>


                            <button

                                type="button"

                                onClick={closeForm}

                                disabled={saving}

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
                                    disabled:opacity-40
                                "
                            >

                                ×

                            </button>

                        </div>


                        {/* Modal Body */}

                        <div className="
                            px-6
                            py-5
                            space-y-4
                        ">


                            {/* Account Name */}

                            <div>

                                <label className="
                                    block
                                    text-xs
                                    font-medium
                                    text-slate-400
                                    mb-1.5
                                ">

                                    Account Name

                                </label>


                                <input

                                    type="text"

                                    value={
                                        formData.account_name
                                    }

                                    onChange={(e) =>
                                        handleChange(
                                            "account_name",
                                            e.target.value
                                        )
                                    }

                                    placeholder="e.g. My Trading Account"

                                    required

                                    className="
                                        w-full
                                        px-3
                                        py-2.5
                                        rounded-lg
                                        bg-slate-950
                                        border
                                        border-slate-800
                                        text-slate-200
                                        placeholder-slate-600
                                        text-sm
                                        outline-none
                                        focus:border-blue-500/50
                                        focus:ring-1
                                        focus:ring-blue-500/30
                                        transition
                                    "
                                />

                            </div>


                            {/* Account Number */}

                            <div>

                                <label className="
                                    block
                                    text-xs
                                    font-medium
                                    text-slate-400
                                    mb-1.5
                                ">

                                    Account Number

                                </label>


                                <input

                                    type="text"

                                    value={
                                        formData.account_number
                                    }

                                    onChange={(e) =>
                                        handleChange(
                                            "account_number",
                                            e.target.value
                                        )
                                    }

                                    placeholder="MT5 account number"

                                    required

                                    className="
                                        w-full
                                        px-3
                                        py-2.5
                                        rounded-lg
                                        bg-slate-950
                                        border
                                        border-slate-800
                                        text-slate-200
                                        placeholder-slate-600
                                        text-sm
                                        outline-none
                                        focus:border-blue-500/50
                                        focus:ring-1
                                        focus:ring-blue-500/30
                                        transition
                                    "
                                />

                            </div>


                            {/* Broker */}

                            <div>

                                <label className="
                                    block
                                    text-xs
                                    font-medium
                                    text-slate-400
                                    mb-1.5
                                ">

                                    Broker

                                </label>


                                <input

                                    type="text"

                                    value={
                                        formData.broker
                                    }

                                    onChange={(e) =>
                                        handleChange(
                                            "broker",
                                            e.target.value
                                        )
                                    }

                                    placeholder="e.g. Deriv"

                                    required

                                    className="
                                        w-full
                                        px-3
                                        py-2.5
                                        rounded-lg
                                        bg-slate-950
                                        border
                                        border-slate-800
                                        text-slate-200
                                        placeholder-slate-600
                                        text-sm
                                        outline-none
                                        focus:border-blue-500/50
                                        focus:ring-1
                                        focus:ring-blue-500/30
                                        transition
                                    "
                                />

                            </div>


                            {/* Information */}

                            <div className="
                                bg-blue-500/5
                                border
                                border-blue-500/10
                                rounded-lg
                                px-3
                                py-2.5
                            ">

                                <p className="
                                    text-xs
                                    text-slate-500
                                    leading-relaxed
                                ">

                                    TradeLens uses this information
                                    to identify the MT5 account connected
                                    to your trading data.

                                </p>

                            </div>

                        </div>


                        {/* Modal Footer */}

                        <div className="
                            px-6
                            py-4
                            border-t
                            border-slate-800
                            flex
                            items-center
                            justify-end
                            gap-2
                        ">

                            <button

                                type="button"

                                onClick={closeForm}

                                disabled={saving}

                                className="
                                    px-3
                                    py-2
                                    rounded-lg
                                    border
                                    border-slate-700
                                    bg-slate-950
                                    text-slate-300
                                    hover:text-white
                                    hover:bg-slate-800
                                    text-xs
                                    font-medium
                                    transition
                                    disabled:opacity-40
                                "
                            >

                                Cancel

                            </button>


                            <button

                                type="submit"

                                disabled={saving}

                                className="
                                    px-4
                                    py-2
                                    rounded-lg
                                    bg-blue-600
                                    hover:bg-blue-500
                                    text-white
                                    text-xs
                                    font-medium
                                    transition
                                    disabled:opacity-50
                                    disabled:cursor-not-allowed
                                "
                            >

                                {saving

                                    ? (
                                        <span className="
                                            flex
                                            items-center
                                            gap-2
                                        ">

                                            <span className="
                                                w-3
                                                h-3
                                                border-2
                                                border-white/40
                                                border-t-white
                                                rounded-full
                                                animate-spin"
                                            />

                                            Saving...

                                        </span>
                                    )

                                    : editingAccount
                                        ? "Update Account"
                                        : "Link Account"

                                }

                            </button>

                        </div>

                    </form>

                </div>

            )}

        </div>

    );


    /*
    |--------------------------------------------------------------------------
    | Onboarding wrapper
    |--------------------------------------------------------------------------
    |
    | Keep the existing onboarding behavior.
    |
    */

    if (onboarding) {

        return (

            <OnboardingLayout>

                {content}

            </OnboardingLayout>

        );

    }


    return content;

}


export default Accounts;