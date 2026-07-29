import { getInsightsUrl } from "./accountApi";
import {authenticatedFetch} from "./apiClient";

export async function getDayAnalytics(params = {}) {

    const query = new URLSearchParams( params );
    const response =
        await authenticatedFetch(
            getInsightsUrl(
                "day-of-week",
                query
            )
        );
    return response.json();
}