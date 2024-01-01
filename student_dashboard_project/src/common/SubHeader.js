import { Box, Button, Typography } from "@mui/material";
import React from "react";

const SubHeader = ({ name, path }) => {
  return (
    <Box className="subheader__page">
      <Typography variant="h6">{name}</Typography>
    </Box>
  );
};

export default SubHeader;
