const ACCOUNT_CHANGED = "account-changed";

export function notifyAccountsChanged() {

    window.dispatchEvent(
        new Event(ACCOUNT_CHANGED)
    );

}

export function subscribeToAccountsChanged(callback) {

    window.addEventListener(
        ACCOUNT_CHANGED,
        callback
    );

    return () => {

        window.removeEventListener(
            ACCOUNT_CHANGED,
            callback
        );

    };

}