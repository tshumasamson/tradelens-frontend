import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";

import Register from "./pages/Register";
import Login from "./pages/Login";
import VerifyEmail from "./pages/VerifyEmail";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Dashboard from "./pages/Dashboard";
import Trades from "./pages/Trades";
import Analytics from "./pages/Analytics";
import StrategyComparison from "./pages/StrategyComparison";
import Accounts from "./pages/Accounts";
import Settings from "./pages/Settings";
import ApiKeys from "./pages/ApiKeys";
import Connectors from "./pages/Connectors";
import ConnectorDetail from "./pages/ConnectorDetail";
import Onboarding from "./pages/Onboarding";
import InstallationGuide from "./pages/InstallationGuide";

import AppLayout from "./layout/AppLayout";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {

    return (

        <BrowserRouter>

            <Routes>

                <Route
                    path="/login"
                    element={<Login />}
                />
                <Route
                    path="/register"
                    element={<Register />}
                />
                <Route
                    path="/verify-email/:uid/:token"
                    element={<VerifyEmail />}
                />
                <Route
                    path="/forgot-password"
                    element={<ForgotPassword />}
                />
                <Route
                    path="/reset-password/:uid/:token"
                    element={<ResetPassword />}
                />
                <Route
                    path="/help/installation"
                    element={<InstallationGuide />}
                />

                <Route
                    element={
                        <ProtectedRoute>
                            <AppLayout />
                        </ProtectedRoute>
                    }
                >

                    <Route
                        path="/"
                        element={<Dashboard />}
                    />

                    <Route
                        path="/trades"
                        element={<Trades />}
                    />

                    <Route
                        path="/analytics"
                        element={<Analytics />}
                    />

                    <Route
                        path="/strategy-comparison"
                        element={<StrategyComparison />}
                    />
                    <Route
                        path="/accounts"
                        element={<Accounts />}
                    />
                    <Route
                        path="/api-keys"
                        element={<ApiKeys />}
                    />
                    <Route
                        path="/connectors"
                        element={<Connectors />}
                    /> 
                    <Route
                        path="/connectors/:id"
                        element={<ConnectorDetail />}
                    />
                    <Route
                        path="/onboarding"
                        element={<Onboarding />}
                    />                     
                    <Route
                        path="/settings"
                        element={<Settings />}
                    /> 
                </Route>           
            </Routes>

        </BrowserRouter>

    );
}

export default App;