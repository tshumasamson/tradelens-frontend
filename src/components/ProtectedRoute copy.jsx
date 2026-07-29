import {
    Navigate,
    useLocation
} from "react-router-dom";

import {
    useEffect,
    useState
} from "react";

import {
    getOnboardingStatus
} from "../services/onboardingAPI";

function ProtectedRoute({ children }) {

    const location = useLocation();

    const token =
        localStorage.getItem("access");

    const [loading, setLoading] =
        useState(true);

    const [completed, setCompleted] =
        useState(false);

    if (!token) {

        return (
            <Navigate
                to="/login"
                replace
            />
        );

    }

    useEffect(() => {

        let mounted = true;

        async function checkOnboarding() {

            try {

                const status =
                    await getOnboardingStatus();

                if (!mounted) {

                    return;

                }

                setCompleted(
                    status.completed
                );

            }
            catch (error) {

                console.error(error);

            }
            finally {

                if (mounted) {

                    setLoading(false);

                }

            }

        }

        checkOnboarding();

        return () => {

            mounted = false;

        };

    }, []);

    if (loading) {

        return (

            <div
                className="
                min-h-screen
                flex
                items-center
                justify-center
                bg-slate-950
                text-white
                "
            >

                Loading...

            </div>

        );

    }

    /*
    ---------------------------------------------------
    Force onboarding
    ---------------------------------------------------
    */

    if (

        !completed &&

        location.pathname !== "/onboarding"

    ) {

        return (

            <Navigate
                to="/onboarding"
                replace
            />

        );

    }

    /*
    ---------------------------------------------------
    Prevent returning to onboarding
    ---------------------------------------------------
    */

    if (

        completed &&

        location.pathname === "/onboarding"

    ) {

        return (

            <Navigate
                to="/"
                replace
            />

        );

    }

    return children;

}

export default ProtectedRoute;