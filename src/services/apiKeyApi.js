import {authenticatedFetch} from "./apiClient";
import { API_BASE } from "./config";

export async function getApiKeys() {

    const response =
        await authenticatedFetch(
            `${API_BASE}/api/v1/api-keys/`
        );

    return response.json();
}

export async function createApiKey(
    name
) {

    const response =
        await authenticatedFetch(
            `${API_BASE}/api/v1/api-keys/`,
            {
                method: "POST",

                headers: {
                    "Content-Type":
                        "application/json"
                },

                body: JSON.stringify({
                    name
                })
            }
        );

    return response.json();
}

export async function revokeApiKey(
    id
) {

    const response =
        await authenticatedFetch(
            `${API_BASE}/api/v1/api-keys/${id}/revoke/`,
            {
                method: "POST"
            }
        );

    return response.json();
}