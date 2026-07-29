import { getInsightsUrl } from "./accountApi";
import {authenticatedFetch} from "./apiClient";

export async function getStrategyRanking(params = {}) {
    const query = new URLSearchParams(params);
    const response =
        await authenticatedFetch(
            getInsightsUrl(
                "strategy-ranking",
                query
            )
        );

    return response.json();
}