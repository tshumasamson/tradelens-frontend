import { getSelectedAccountId} from "./accountApi";
import {authenticatedFetch} from "./apiClient";
import { API_BASE } from "./config";

export async function getJournal(positionId) {
    const accountId =
        getSelectedAccountId();
    const response =
        await authenticatedFetch(
            `${API_BASE}/api/v1/positions/account/${accountId}/${positionId}/journal/`
        );
    return response.json();
}


export async function updateJournal(positionId,formData) {
    const accountId =
        getSelectedAccountId();
    const response =
        await authenticatedFetch(
            `${API_BASE}/api/v1/positions/account/${accountId}/${positionId}/journal/`,
            {
                method: "PATCH",
                body: formData
            }
        );
    return response.json();
}