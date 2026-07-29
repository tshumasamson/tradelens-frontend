import ApiKeyManagement from "../components/apikeys/ApiKeyManagement";
import OnboardingApiKey from "../components/apikeys/OnboardingApiKey";

function ApiKeys({

    onboarding = false,

    onComplete = null

}) {

    if (onboarding) {

        return (

            <OnboardingApiKey

                onComplete={onComplete}

            />

        );

    }

    return <ApiKeyManagement />;

}

export default ApiKeys;