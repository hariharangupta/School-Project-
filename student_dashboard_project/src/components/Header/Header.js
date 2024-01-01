import { Box, Paper, Typography } from "@mui/material";
import React from "react";

const Header = () => {
  return (
    <Paper elevation={2} style={{ marginLeft: "0.5rem" }}>
      <Box className="header__page">
        <Typography variant="h5">STUDENT NAME</Typography>
      </Box>
    </Paper>
  );
};

export default Header;
