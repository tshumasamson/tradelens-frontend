import { authenticatedFetch } from "./apiClient";
import { API_BASE } from "./config";

const BASE_URL = `${API_BASE}/api/v1/connectors`;


export async function getConnectorDashboard() {

    const response =
        await authenticatedFetch(
            `${BASE_URL}/dashboard/`
        );

    return response.json();
}


export async function getConnectors() {

    const response =
        await authenticatedFetch(
            `${BASE_URL}/`
        );

    return response.json();
}

export async function getConnector(
    connectorId
) {

    const response =
        await authenticatedFetch(
            `${BASE_URL}/${connectorId}/`
        );

    return response.json();
}

export async function getConnectorCommands(

    connectorId,

    page = 1

) {

    const response =
        await authenticatedFetch(

            `${BASE_URL}/${connectorId}/commands/?page=${page}`

        );

    return response.json();

}

export async function sendCommand(
    connectorId,
    command,
    payload = {}
) {

    const response =
        await authenticatedFetch(
            `${BASE_URL}/${connectorId}/commands/`,
            {
                method: "POST",
                headers: {
                    "Content-Type":
                        "application/json"
                },
                body: JSON.stringify({
                    command,
                    payload
                })
            }
        );

    return response.json();
}

export async function disableConnector(
    connectorId
) {

    const response =
        await authenticatedFetch(
            `${BASE_URL}/${connectorId}/disable/`,
            {
                method: "POST"
            }
        );

    return response.json();
}

export async function enableConnector(
    connectorId
) {

    const response =
        await authenticatedFetch(
            `${BASE_URL}/${connectorId}/enable/`,
            {
                method: "POST"
            }
        );

    return response.json();
}