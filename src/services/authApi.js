import {logout} from "./tokenService";
import {authenticatedFetch} from "./apiClient";
import { API_BASE } from "./config";

export async function login(
    username,
    password
) {

    const response = await fetch(
        `${API_BASE}/api/v1/auth/login/`,
        {
            method: "POST",

            headers: {
                "Content-Type":
                    "application/json"
            },

            body: JSON.stringify({
                username,
                password
            })
        }
    );

    return response.json();
}

export async function getCurrentUser() {

    const response =
        await authenticatedFetch(
            `${API_BASE}/api/v1/auth/me/`
        );

    return response.json();
}



export async function register(
    payload
) {

    const response =
        await fetch(
            `${API_BASE}/api/v1/auth/register/`,
            {
                method: "POST",

                headers: {
                    "Content-Type":
                        "application/json"
                },

                body: JSON.stringify(
                    payload
                )
            }
        );

    const data =
        await response.json();

    console.log(
        "Register Response:",
        data
    );

    return data;
}