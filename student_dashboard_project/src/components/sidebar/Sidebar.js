import React from "react";
import { SidebarData } from "./SidebarData";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Link, useNavigate } from "react-router-dom";
import { Avatar, Divider, Typography } from "@mui/material";
import User from "../../images/user.jpg";

const Sidebar = () => {
  const navigate = useNavigate();
  const [selectedIndex, setSelectedIndex] = React.useState(1);

  const handleListItemClick = (item, index) => {
    setSelectedIndex(index);
    if (item.name === "LOGOUT") {
      navigate("/login");
      localStorage.clear();
    }
  };
  const access = JSON.parse(localStorage.getItem("data"));

  return (
    <>
      <Box className="sidebar__container">
        <Box class="sidebar__logo">
          <Avatar
            src={access.defaultProfile}
            sx={{ width: 100, height: 100, margin: "1rem" }}
          />
          <Typography variant="h6">STUDENT</Typography>
        </Box>
        <Box>
          <Divider></Divider>
          <List component="nav" aria-label="main mailbox folders">
            {SidebarData.map((item, index) => (
              <ListItemButton
                key={index}
                selected={selectedIndex === index}
                onClick={(event) => handleListItemClick(item, index)}
                component={Link}
                to={item.path}
                style={{ height: "100%" }}
              >
                <ListItemIcon style={{ color: "black" }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.name}
                  style={{ fontWeight: "bold" }}
                />
              </ListItemButton>
            ))}
          </List>
        </Box>
      </Box>
    </>
  );
};

export default Sidebar;
