// services/tokenService.js
import { API_BASE } from "./config";
export function logout() {

    localStorage.removeItem(
        "access"
    );

    localStorage.removeItem(
        "refresh"
    );

    localStorage.removeItem(
        "selectedAccount"
    );
}

export async function refreshAccessToken() {

    const refresh =
        localStorage.getItem(
            "refresh"
        );

    if (!refresh) {

        throw new Error(
            "No refresh token"
        );

    }

    const response =
        await fetch(
            `${API_BASE}/api/v1/auth/refresh/`,
            {
                method: "POST",

                headers: {
                    "Content-Type":
                        "application/json"
                },

                body: JSON.stringify({

                    refresh

                })
            }
        );

    if (!response.ok) {

        throw new Error(
            "Refresh failed"
        );

    }

    const data =
        await response.json();

    localStorage.setItem(
        "access",
        data.access
    );

    return data.access;
}