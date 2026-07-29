import {authenticatedFetch} from "./apiClient";
import { API_BASE } from "./config";

export async function getAccounts() {

    const response =
        await authenticatedFetch(
            `${API_BASE}/api/v1/accounts/`
        );

    return response.json();
}

export function getSelectedAccountId() {

    return localStorage.getItem(
        "selectedAccount"
    );
}

export function setSelectedAccount(
    accountId
) {

    localStorage.setItem(
        "selectedAccount",
        accountId
    );
}

export function getInsightsUrl(
    endpoint,
    query = ""
) {

    const accountId =
        getSelectedAccountId();

    if (!accountId) {

        throw new Error(
            "No account selected"
        );
    }

    return (
        `${API_BASE}/api/v1/insights/account/${accountId}/${endpoint}/?${query}`
    );
}