import {getSelectedAccountId} from "./accountApi";
import {authenticatedFetch} from "./apiClient";
import { API_BASE } from "./config";

export async function getTrades(
    params = {}
) {

    const accountId =
        getSelectedAccountId();

    const query =
        new URLSearchParams(params);

    const response =
        await authenticatedFetch(
            `${API_BASE}/api/v1/positions/account/${accountId}/?${query}`
        );

    return response.json();

}