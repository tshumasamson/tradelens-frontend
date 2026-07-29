import {refreshAccessToken,logout} from "./tokenService";

export async function authenticatedFetch(
    url,
    options = {}
) {

    let token =
        localStorage.getItem(
            "access"
        );

    let response =
        await fetch(
            url,
            {
                ...options,

                headers: {

                    ...(options.headers || {}),

                    Authorization:
                        `Bearer ${token}`

                }

            }
        );

    if (
        response.status !== 401
    ) {

        return response;

    }

    try {

        token =
            await refreshAccessToken();

        response =
            await fetch(
                url,
                {
                    ...options,

                    headers: {

                        ...(options.headers || {}),

                        Authorization:
                            `Bearer ${token}`

                    }

                }
            );

        return response;

    }

    catch (error) {

        console.error(
            "Token refresh failed:",
            error
        );

        logout();

        alert(
            "Your session has expired. Please log in again."
        );

        window.location.href =
            "/login";

    }

}