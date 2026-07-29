import { getInsightsUrl } from "./accountApi";
import {authenticatedFetch} from "./apiClient";

export async function getSessionAnalytics(params = {}) {
    const query =new URLSearchParams(params);
    const response =
        await authenticatedFetch(
            getInsightsUrl(
                "sessions",
                query
            )
        );
    return response.json();
}