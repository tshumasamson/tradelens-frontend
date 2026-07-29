import {
    useEffect,
    useState
} from "react";

import {
    getAccounts,
    getSelectedAccountId,
    setSelectedAccount
} from "../services/accountApi";

import {
    subscribeToAccountsChanged
} from "../services/accountEvents";

function AccountSelector() {

    const [accounts, setAccounts] = useState([]);

    const [selected, setSelected] =
        useState("");

    const loadAccounts = async () => {

        const data =
            await getAccounts();

        if (!Array.isArray(data)) {

            return;

        }

        setAccounts(data);

        let current =
            getSelectedAccountId();

        const exists =
            data.some(
                account =>
                    String(account.id) ===
                    String(current)
            );

        if ((!current || !exists) && data.length > 0) {

            current =
                String(data[0].id);

            setSelectedAccount(current);

        }

        setSelected(current || "");

    };

    useEffect(() => {

        loadAccounts();

        return subscribeToAccountsChanged(
            loadAccounts
        );

    }, []);

    const handleChange = (
        event
    ) => {

        const accountId =
            event.target.value;

        setSelected(accountId);

        setSelectedAccount(accountId);

        notifyAccountsChanged();

    };

    return (

        <select
            value={selected}
            onChange={handleChange}
            className="
            bg-slate-800
            text-white
            px-4
            py-2
            rounded
            "
        >

            {accounts.map(account => (

                <option
                    key={account.id}
                    value={String(account.id)}
                >

                    {account.account_name}
                    {" "}
                    (
                    {account.account_number}
                    )

                </option>

            ))}

        </select>

    );

}

export default AccountSelector;