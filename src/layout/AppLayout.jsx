import { Outlet } from "react-router-dom";

import Sidebar from "./Sidebar";
import Header from "./Header";
import PageContainer from "./PageContainer";

function AppLayout() {

    return (

        <div
            className="
            flex
            min-h-screen
            bg-slate-950
            "
        >

            <Sidebar />

            <div
                className="
                flex-1
                "
            >

                <Header />

                <PageContainer>

                    <Outlet />

                </PageContainer>

            </div>

        </div>

    );
}

export default AppLayout;