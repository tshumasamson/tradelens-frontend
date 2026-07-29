export function formatDateTime(
    value
) {

    if (!value) {

        return "-";

    }

    return new Date(
        value
    ).toLocaleString(
        undefined,
        {
            day: "numeric",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit"
        }
    );

}

export function formatTimeAgo(
    value,
    serverTime
) {

    if (
        !value ||
        !serverTime
    ) {

        return "-";

    }

    const now =
        new Date(serverTime);

    const then =
        new Date(value);

    let seconds = Math.floor(
        (now - then) / 1000
    );

    // Prevent negative values if clocks differ slightly
    seconds = Math.max(
        seconds,
        0
    );

    if (seconds < 60) {

        return `${seconds} sec ago`;

    }

    const minutes = Math.floor(
        seconds / 60
    );

    if (minutes < 60) {

        return `${minutes} min ago`;

    }

    const hours = Math.floor(
        minutes / 60
    );

    if (hours < 24) {

        return `${hours} hr ago`;

    }

    const days = Math.floor(
        hours / 24
    );

    return `${days} day(s) ago`;

}