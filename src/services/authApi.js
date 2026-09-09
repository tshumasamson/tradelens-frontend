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

    const data =
        await response.json();

    return {
        ok: response.ok,
        status: response.status,
        data: data
    };
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


export async function verifyEmail(uid, token) {

    const response =
        await fetch(
            `${API_BASE}/api/v1/auth/verify-email/${uid}/${token}/`
        );

    return response;
}

export async function requestPasswordReset(email) {

    const response =
        await fetch(
            `${API_BASE}/api/v1/auth/password-reset/`,
            {
                method: "POST",

                headers: {
                    "Content-Type":
                        "application/json"
                },

                body: JSON.stringify({
                    email
                })
            }
        );

    return response.json();
}


export async function resetPassword(
    uid,
    token,
    newPassword
) {

    const response =
        await fetch(
            `${API_BASE}/api/v1/auth/password-reset-confirm/${uid}/${token}/`,
            {
                method: "POST",

                headers: {
                    "Content-Type":
                        "application/json"
                },

                body: JSON.stringify({
                    new_password: newPassword
                })
            }
        );

    return response.json();
}