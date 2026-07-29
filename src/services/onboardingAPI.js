import { authenticatedFetch } from "./apiClient";
import { API_BASE } from "./config";

export async function getOnboardingStatus() {

    const response =
        await authenticatedFetch(
            `${API_BASE}/api/v1/onboarding/status/`
        );

    return response.json();

}

export async function completeOnboarding() {

    const response =
        await authenticatedFetch(

            `${API_BASE}/api/v1/onboarding/complete/`,

            {
                method: "POST"
            }

        );

    return response.json();

}