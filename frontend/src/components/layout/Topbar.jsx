import {
    AppBar,
    Toolbar,
    Typography,
    Box,
    InputBase,
    Avatar
} from "@mui/material";

import {
    Search as SearchIcon,
} from "@mui/icons-material";

export const Topbar = () => {
    return (
        <AppBar
            position="fixed"
            sx={{
                zIndex: (theme) => theme.zIndex.drawer + 1
            }}
        >
            <Toolbar>
                <Typography
                    variant="h6"
                    noWrap
                    component="div"
                    sx={{
                        display: {
                            xs: "none",
                            sm: "block"
                        }
                    }}
                >
                    App de Citas
                </Typography>
                <Box
                    sx={{
                        flexGrow: 1,
                        display: "flex",
                        alignItems: "center",
                        marginLeft: 3,
                        maxWidth: 500,
                        backgroundColor: "rgba(255,255,255,0.15)",
                        borderRadius: 1,
                        px: 1
                    }}
                >
                    <SearchIcon />
                    <InputBase
                        placeholder="Buscar..."
                        sx={{
                            ml: 1,
                            flex: 1,
                            color: "inherit",
                            "& input::placeholder": {
                                color: "inherit",
                                opacity: 0.8
                            }
                        }}
                    />
                </Box>
            </Toolbar>
        </AppBar>
    );
}