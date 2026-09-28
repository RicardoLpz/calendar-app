import { Box, Toolbar } from "@mui/material";
import { Outlet } from "react-router-dom";

import { Topbar } from "./Topbar";
import { Sidebar } from "./Sidebar";

const drawerWidth = 240;

export const Layout = () => {
    return (
        <Box sx={{ display: "flex" }}>
            <Topbar />
            <Sidebar />
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 3,
                    width: {
                        sm: `calc(100% - ${drawerWidth}px)`
                    }
                }}
            >
                <Toolbar />
                <Outlet />
            </Box>
        </Box>
    );
}
