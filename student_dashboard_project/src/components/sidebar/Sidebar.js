import React, { useState } from "react";
import { SidebarData } from "./SidebarData";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Link, useNavigate } from "react-router-dom";
import { Avatar, Divider, Grid, Paper, Typography } from "@mui/material";
import User from "../../images/user.jpg";
import Footer from "../Footer/Footer";
// import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
// import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const Sidebar = () => {
  const navigate = useNavigate();
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleListItemClick = (item, index) => {
    setSelectedIndex(index);
    console.log(item);
    if (item.name === "LOGOUT") {
      navigate("/login");
      localStorage.clear();
    }
  };
  const access = JSON.parse(localStorage.getItem("data"));

  return (
    <>
      <Box className="sidebar__container">
        <Box class="sidebar__container_top">
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              padding: "1rem",
            }}
          >
            {" "}
            <img
              className="sidebar__container_logo"
              src={access?.defaultProfile || User}
            />
          </Box>
          <Typography
            className="sidebar__container_headerText"
            // style={{
            //   display: sidebarOpen ? "block" : "none",
            //   textAlign: "center",
            //   margin: "1rem 0",
            //   color: "white",
            // }}
          >
            STUDENT
          </Typography>
        </Box>
        <Divider sx={{ background: "white" }} />

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <List>
            {SidebarData.map((item, index) => (
              <>
                <Box
                  className="sidebar__container_listItem"
                  key={index}
                  selected={selectedIndex === index}
                  onClick={() => handleListItemClick(item, index)}
                  component={Link}
                  to={item.path}
                  // style={{
                  //   background: selectedIndex === index ? "#151d2b" : "",
                  // }}
                >
                  <ListItemIcon
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      color: "white",
                      padding: "0.5rem",
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <p
                    className="sidebar__container_listItem_text"
                    // sx={{
                    //   display: sidebarOpen ? "block" : "none",
                    //   fontFamily: "Poppins",
                    //   fontWeight: "bold",
                    //   color: "white",
                    // }}
                  >
                    {item.name}
                  </p>
                </Box>
              </>
            ))}
          </List>
        </Box>
      </Box>
    </>
  );
};

export default Sidebar;
