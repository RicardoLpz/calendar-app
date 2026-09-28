import { Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Toolbar,
    Typography,
    Box
} from "@mui/material";

import { Dashboard as DashboardIcon,
    Event as EventIcon,
    CalendarMonth as CalendarIcon,
    Category as CategoryIcon
} from "@mui/icons-material";

import { NavLink } from "react-router-dom";

const drawerWidth = 240;

const menuItems = [
    {
        text: "Inicio",
        path: "/",
        icon: <DashboardIcon />
    },
    {
        text: "Citas",
        path: "/citas",
        icon: <EventIcon />
    },
    {
        text: "Calendario",
        path: "/calendario",
        icon: <CalendarIcon />
    },
    {
        text: "Tipos de citas",
        path: "/tipos-citas",
        icon: <CategoryIcon />
    }
];

export const Sidebar = () => {
    return (
        <Drawer
            variant="permanent"
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                "& .MuiDrawer-paper": {
                    width: drawerWidth,
                    boxSizing: "border-box"
                }
            }}
        >
            <Toolbar>
                <Typography
                    variant="h6"
                    noWrap
                    component="div"
                    fontWeight="bold"
                >
                    Citas app
                </Typography>
            </Toolbar>

            <Box sx={{ overflow: "auto" }}>
                <List>
                    {menuItems.map((item) => (
                        <ListItem
                            key={item.path}
                            disablePadding
                        >
                            <ListItemButton
                                component={NavLink}
                                to={item.path}
                                sx={{
                                    "&.active": {
                                        backgroundColor: "primary.main",
                                        color: "white",
                                        "& .MuiListItemIcon-root": {
                                            color: "white"
                                        },
                                        "&:hover": {
                                            backgroundColor: "primary.dark"
                                        }
                                    }
                                }}
                            >
                                <ListItemIcon>
                                    {item.icon}
                                </ListItemIcon>

                                <ListItemText
                                    primary={item.text}
                                />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Box>
        </Drawer>
    );
}
