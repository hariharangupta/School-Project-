import { Box, Paper, Typography } from "@mui/material";
import React from "react";

const Footer = () => {
  return (
    <Paper elevation={2}>
      <Box className="footer__page">
        <p className="footer__page_text">
          {" "}
          copyright &copy; 2023 All Rights Reserved.
        </p>
      </Box>
    </Paper>
  );
};

export default Footer;
