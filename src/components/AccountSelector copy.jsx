// components/AccountSelector.jsx

import {
    useEffect,
    useState
} from "react";

import {
    getAccounts,
    getSelectedAccountId,
    setSelectedAccount
} from "../services/accountApi";

function AccountSelector() {

    const [accounts, setAccounts] =
        useState([]);

    const [selected, setSelected] =
        useState(
            getSelectedAccountId() || ""
        );

    useEffect(() => {

        const loadAccounts =
            async () => {

                const data =
                    await getAccounts();

                if (
                    !Array.isArray(data)
                ) {

                    return;
                }

                setAccounts(data);

                let current =
                    getSelectedAccountId();

                if (!current && data.length > 0) {

                    current = String(data[0].id);

                    setSelectedAccount(current);

                }

                setSelected(current || "");

                const exists =
                    data.some(
                        account =>
                            String(account.id)
                            ===
                            String(current)
                    );

                if (

                    (!current || !exists)

                    &&

                    data.length > 0

                ) {

                    const defaultAccount =
                        data[0].id;

                    setSelected(
                        defaultAccount
                    );

                    setSelectedAccount(
                        defaultAccount
                    );

                    window.location.reload();
                }
            };

        loadAccounts();

    }, []);

    const handleChange = (
        event
    ) => {

        const accountId =
            event.target.value;

        setSelected(
            accountId
        );

        setSelectedAccount(
            accountId
        );

        window.location.reload();
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

                    value={account.id}

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