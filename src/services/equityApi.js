import { getInsightsUrl } from "./accountApi";
import {authenticatedFetch} from "./apiClient";

export async function getEquityCurve(
    params = {}
) {

    const query =
        new URLSearchParams(params);

    const response =
        await authenticatedFetch(
            getInsightsUrl(
                "account-value",
                query
            )
        );

    return response.json();
}