import {useEffect,useState} from "react";
import {getAccounts,deleteAccount} from "../services/accountManagementApi";
import {createAccount,updateAccount} from "../services/accountManagementApi";
import OnboardingLayout from "../components/onboarding/OnboardingLayout";
import {setSelectedAccount } from "../services/accountApi";
import {notifyAccountsChanged} from "../services/accountEvents";


function Accounts({

    onboarding = false,

    onComplete = null

}) {

    const [accounts, setAccounts] =  useState([]);
    const [showForm, setShowForm] =  useState(false);
    const [editingAccount, setEditingAccount] =  useState(null);
    
    const handleSubmit =
        async (e) => {

            e.preventDefault();

            if (editingAccount) {

                await updateAccount(

                    editingAccount.id,

                    formData

                );

            }

            else {

                const account =
                    await createAccount(
                        formData
                    );

                setSelectedAccount(
                    account.id
                );
                notifyAccountsChanged();
            }

            setShowForm(false);

            await loadAccounts();

            if (onboarding && onComplete) {
                onComplete();
            }
        };


    const [formData, setFormData] =  
        useState({
            account_number: "",
            broker: "",
            account_name: ""
        });

    const loadAccounts =
        async () => {

            const data =
                await getAccounts();

            setAccounts(data);
        };

    useEffect(() => {

        loadAccounts();

    }, []);

    const handleDelete =
        async (id) => {

            if (
                !window.confirm(
                    "Delete account?"
                )
            ) {
                return;
            }

            await deleteAccount(id);

            loadAccounts();
        };




const noAccounts =
    accounts.length === 0;
    
    

    return (

        <div
            className="space-y-6"
        >

        <div
            className="
            flex
            justify-between
            items-center
            bg-slate-900
            border
            border-slate-800
            rounded-2xl
            p-6
            "
        >

            <div>

                <h2
                    className="
                    text-white
                    text-2xl
                    font-bold
                    "
                >
                    {
                        onboarding

                        ?

                        "Step 1 of 3 • Link MT5 Account"

                        :

                        editingAccount

                            ?

                            "Edit Account"

                            :

                            "Link MT5 Account"

                    }
                </h2>

                <p
                    className="
                    text-slate-400
                    text-sm
                    mt-1
                    "
                >
                    {
                        onboarding
                        ?
                        "Let's link the MT5 account you want TradeLens to monitor."
                        :
                        "Manage your trading account details"
                    }
                </p>

            </div>

                <button

                    onClick={() => {

                        setEditingAccount(null);

                        setFormData({

                            account_number: "",

                            broker: "",

                            account_name: ""

                        });

                        setShowForm(true);

                    }}

                    className="
                    bg-blue-600
                    hover:bg-blue-700
                    transition
                    px-5
                    py-3
                    rounded-xl
                    font-medium
                    text-white
                    shadow-lg
                    shadow-blue-600/20
                    "
                >

                    Link MT5 Account

                </button>

            </div>


{noAccounts ? (

    <div
        className="
        bg-slate-900
        border
        border-slate-800
        rounded-2xl
        p-10
        text-center
        "
    >

        <div
            className="
            text-6xl
            mb-4
            "
        >
            💳
        </div>

        <h2
            className="
            text-white
            text-3xl
            font-bold
            "
        >
            No Linked MT5 Accounts
        </h2>

        <p
            className="
            text-slate-400
            mt-3
            mb-8
            "
        >
            Link your first MT5 account
            to begin tracking performance.
        </p>

        <button

            onClick={() => {

                setEditingAccount(
                    null
                );

                setFormData({

                    account_number: "",

                    broker: "",

                    account_name: ""

                });

                setShowForm(
                    true
                );

            }}

            className="
            bg-blue-600
            hover:bg-blue-700
            transition
            px-6
            py-3
            rounded-xl
            font-medium
            text-white
            shadow-lg
            shadow-blue-600/20
            "

        >

            + Link MT5 Account

        </button>

    </div>

) : (


    <div
        className="
        bg-slate-900
        border
        border-slate-800
        rounded-2xl
        overflow-hidden
        shadow-xl
        "
    >

        <table
            className="
            w-full
            text-sm
            text-white
            "
        >

            <thead>

                <tr
                    className="
                    bg-slate-800
                    text-slate-300
                    uppercase
                    tracking-wider
                    text-xs
                    "
                >

                    <th
                        className="
                        px-6
                        py-4
                        text-left
                        "
                    >
                        Name
                    </th>

                    <th
                        className="
                        px-6
                        py-4
                        text-left
                        "
                    >
                        Number
                    </th>

                    <th
                        className="
                        px-6
                        py-4
                        text-left
                        "
                    >
                        Broker
                    </th>

                    <th
                        className="
                        px-6
                        py-4
                        text-right
                        "
                    >
                        Actions
                    </th>

                </tr>

            </thead>

            <tbody>

                {accounts.map(
                    account => (

                        <tr
                            key={account.id}
                            className="
                            border-t
                            border-slate-800
                            hover:bg-slate-800/50
                            transition
                            "
                        >

                            <td className="px-6 py-4">

                                <div
                                    className="
                                    font-semibold
                                    "
                                >
                                    {account.account_name}
                                </div>

                                <div
                                    className="
                                    text-xs
                                    text-slate-500
                                    "
                                >
                                    Trading/MT5 Account
                                </div>

                            </td>

                            <td>
                                {
                                    account.account_number
                                }
                            </td>

                            <td>
                                {
                                    account.broker
                                }
                            </td>

                            <td className="px-6 py-4">

                                <div
                                    className="
                                    flex
                                    justify-end
                                    gap-2
                                    "
                                >

                                    <button

                                        onClick={() => {

                                            setEditingAccount(
                                                account
                                            );

                                            setFormData({

                                                account_number:
                                                    account.account_number,

                                                broker:
                                                    account.broker,

                                                account_name:
                                                    account.account_name

                                            });

                                            setShowForm(true);

                                        }}
                                        className="
                                            px-3
                                            py-1.5
                                            rounded-lg
                                            bg-blue-600
                                            hover:bg-blue-700
                                            text-white
                                            text-sm
                                            "

                                    >

                                        Edit

                                    </button>

                                    <button
                                        onClick={() =>
                                            handleDelete(
                                                account.id
                                            )
                                        }
                                        className="
                                            px-3
                                            py-1.5
                                            rounded-lg
                                            bg-red-600
                                            hover:bg-red-700
                                            text-white
                                            text-sm
                                            "
                                    >
                                        Delete
                                    </button>
                                    </div>

                            </td>

                        </tr>

                    )
                )}

            </tbody>

        </table>

    </div>

)}




            {showForm && (

                <div
                    className="
                    fixed
                    inset-0
                    bg-black/50
                    flex
                    items-center
                    justify-center
                    "
                >

                    <form

                        onSubmit={
                            handleSubmit
                        }


                        className="
                        bg-slate-900
                        border
                        border-slate-800
                        p-8
                        rounded-2xl
                        w-full
                        max-w-md
                        shadow-2xl
                        space-y-5
                        "

                    >

                        <h2
                            className="
                            text-white
                            text-xl
                            "
                        >

                            {
                                onboarding

                                ?

                                "Step 1 of 3 • Link MT5 Account"

                                :

                                editingAccount

                                    ?

                                    "Edit Account"

                                    :

                                    "Link Account"

                            }

                        </h2>

                        <input

                            value={
                                formData.account_name
                            }

                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    account_name:
                                        e.target.value
                                })
                            }

                            placeholder="Account Name"

                            className="
                            w-full
                            px-4
                            py-3
                            rounded-xl
                            bg-slate-800
                            border
                            border-slate-700
                            text-white
                            focus:outline-none
                            focus:ring-2
                            focus:ring-blue-500
                            "

                        />

                        <input

                            value={
                                formData.account_number
                            }

                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    account_number:
                                        e.target.value
                                })
                            }

                            placeholder="Account Number"

                            className="
                            w-full
                            px-4
                            py-3
                            rounded-xl
                            bg-slate-800
                            border
                            border-slate-700
                            text-white
                            focus:outline-none
                            focus:ring-2
                            focus:ring-blue-500
                            "

                        />

                        <input

                            value={
                                formData.broker
                            }

                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    broker:
                                        e.target.value
                                })
                            }

                            placeholder="Broker"

                            className="
                            w-full
                            px-4
                            py-3
                            rounded-xl
                            bg-slate-800
                            border
                            border-slate-700
                            text-white
                            focus:outline-none
                            focus:ring-2
                            focus:ring-blue-500
                            "

                        />

                        <div
                            className="
                            flex
                            justify-end
                            gap-2
                            "
                        >

                            <button

                                type="button"

                                onClick={() =>
                                    setShowForm(
                                        false
                                    )
                                }

                                className="
                                px-4
                                py-2
                                rounded-xl
                                bg-slate-700
                                hover:bg-slate-600
                                text-white
                                font-medium
                                transition
                                "

                            >

                                Cancel

                            </button>

                            <button

                                type="submit"

                                className="
                                px-5
                                py-2
                                rounded-xl
                                bg-blue-600
                                hover:bg-blue-700
                                text-white
                                font-medium
                                transition
                                shadow-lg
                                shadow-blue-600/20
                                "

                            >

                                {editingAccount
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
}

export default Accounts;