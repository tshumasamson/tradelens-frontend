import { getInsightsUrl } from "./accountApi";
import {authenticatedFetch} from "./apiClient";

export async function getSymbols() {
    const response = 
        await authenticatedFetch(
            getInsightsUrl(
                "symbols"
            )
        );
    return response.json();
}


export async function getStrategies() {
    const response = 
        await authenticatedFetch(
            getInsightsUrl(
                "strategies"
            )
        );
    return response.json();
}