import { Box, Button, Typography } from "@mui/material";
import React, { useState } from "react";

const SubHeader = ({ name, btnText, btnHandler, showButton }) => {
  return (
    <Box className="subheader__page">
      <p className="subheader__page_text">{name}</p>
      {showButton === true && (
        <Button
          variant="contained"
          style={{
            background: "#232d3f",
            margin: "0 1rem",
          }}
          onClick={btnHandler}
        >
          {btnText}
        </Button>
      )}
    </Box>
  );
};

export default SubHeader;
