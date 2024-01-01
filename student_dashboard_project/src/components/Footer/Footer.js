import { Box, Paper, Typography } from "@mui/material";
import React from "react";

const Footer = () => {
  return (
    <Paper elevation={2} style={{ marginLeft: "0.5rem" }}>
      <Box className="footer__page">
        <Typography variant="h5">
          {" "}
          &copy; Student Project. All Rights Reserved.
        </Typography>
      </Box>
    </Paper>
  );
};

export default Footer;
