import { getInsightsUrl } from "./accountApi";
import {authenticatedFetch} from "./apiClient";

export async function getSymbolRanking(params = {}) {
    const query =  new URLSearchParams(params);
    const response =
        await authenticatedFetch(
            getInsightsUrl(
                "symbol-ranking",
                query
            )
        );

    return response.json();

}