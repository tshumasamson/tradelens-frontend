import { authenticatedFetch } from "./apiClient";
import { API_BASE } from "./config";

const BASE_URL = `${API_BASE}/api/v1/accounts`;

export async function getAccounts() {

    const response =
        await authenticatedFetch(
            `${BASE_URL}/`
        );

    return response.json();
}

export async function createAccount(
    payload
) {

    const response =
        await authenticatedFetch(
            `${BASE_URL}/create/`,
            {
                method: "POST",

                headers: {
                    "Content-Type":
                        "application/json"
                },

                body: JSON.stringify(
                    payload
                )
            }
        );

    return response.json();
}

export async function updateAccount(
    id,
    payload
) {

    const response =
        await authenticatedFetch(
            `${BASE_URL}/${id}/update/`,
            {
                method: "PUT",

                headers: {
                    "Content-Type":
                        "application/json"
                },

                body: JSON.stringify(
                    payload
                )
            }
        );

    return response.json();
}

export async function deleteAccount(
    id
) {

    const response =
        await authenticatedFetch(
            `${BASE_URL}/${id}/delete/`,
            {
                method: "DELETE"
            }
        );

    return response;
}