import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getOnboardingStatus } from "../services/onboardingAPI";

import Accounts from "./Accounts";
import ApiKeys from "./ApiKeys";

import OnboardingConnector from "../components/onboarding/OnboardingConnector";
import OnboardingCompleted from "../components/onboarding/OnboardingCompleted";

function Onboarding() {

    const navigate = useNavigate();

    const [status, setStatus] = useState(null);

    const [loading, setLoading] = useState(true);

    async function refreshStatus(isMounted = () => true) {

        try {

            const data =
                await getOnboardingStatus();

            if (!isMounted()) return;

            if (data.completed) {

                console.log("Redirecting to dashboard");

                navigate("/", {
                    replace: true
                });

                return;

            }

            setStatus(data);

        }
        catch (error) {

            console.error(
                "Failed to load onboarding status",
                error
            );

        }
        finally {

            if (isMounted()) {

                setLoading(false);

            }

        }

    }

    /*
    -----------------------------------------------------
    Initial load
    -----------------------------------------------------
    */

    useEffect(() => {

        let isMounted = true;

        refreshStatus(() => isMounted);

        return () => {
            isMounted = false;
        };

    }, []);

    /*
    -----------------------------------------------------
    Poll ONLY while waiting for connector
    -----------------------------------------------------
    */

    useEffect(() => {

        if (
            status?.current_step !==
            "connector_online"
        ) {

            return;

        }

        const interval =
            setInterval(

                refreshStatus,

                5000

            );

        return () =>
            clearInterval(interval);

    }, [status]);

    /*
    -----------------------------------------------------
    Loading
    -----------------------------------------------------
    */

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

                Loading onboarding...

            </div>

        );

    }

    /*
    -----------------------------------------------------
    Render current onboarding step
    -----------------------------------------------------
    */

    switch (status?.current_step) {

        case "create_trading_account":

            return (

                <Accounts

                    onboarding={true}

                    status={status}

                    onComplete={refreshStatus}

                />

            );

        case "register_connector":

            return (

                <ApiKeys

                    onboarding={true}

                    status={status}

                    onComplete={refreshStatus}

                />

            );

        case "connector_online":

            return (

                <OnboardingConnector
                    status={status}
                />

            );

        case "completed":

            return (

                <OnboardingCompleted />

            );

        default:

            return (

                <div
                    className="
                    min-h-screen
                    flex
                    items-center
                    justify-center
                    bg-slate-950
                    text-red-400
                    "
                >

                    Unknown onboarding step.

                </div>

            );

    }

}

export default Onboarding;