import DashboardIcon from "@mui/icons-material/Dashboard";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import FolderSpecialIcon from "@mui/icons-material/FolderSpecial";
import LogoutIcon from "@mui/icons-material/Logout";
export const SidebarData = [
  { name: "DASHBOARD", icon: <DashboardIcon />, path: "/", id: 1 },
  { name: "ACCOUNT", icon: <AccountBoxIcon />, path: "/account", id: 2 },
  { name: "SYLLABUS", icon: <FolderSpecialIcon />, path: "/syllabus", id: 3 },
  { name: "LOGOUT", icon: <LogoutIcon />, path: "/login", id: 4 },
];
