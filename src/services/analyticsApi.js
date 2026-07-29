import { getInsightsUrl } from "./accountApi";
import {authenticatedFetch} from "./apiClient";


export async function getStrategyAnalytics(params = {}) {
    const query = new URLSearchParams(params);
    const response =
        await authenticatedFetch(
            getInsightsUrl(
                "strategy-summary",
                query
            )
        );
    return response.json();
}