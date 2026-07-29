import { getInsightsUrl } from "./accountApi";
import {authenticatedFetch} from "./apiClient";

export async function getDashboard(
    params = {}
) {

    const query =
        new URLSearchParams(params);

    const response =
        await authenticatedFetch(
            getInsightsUrl(
                "dashboard",
                query
            )
        );

    return response.json();
}