import { Box, Button, Typography } from "@mui/material";
import React, { useState } from "react";

const SubHeader = ({ name, btnText, btnHandler, showButton }) => {
  return (
    <Box className="subheader__page">
      <p className="subheader__page_text">{name}</p>
      {showButton === true && (
        <Button
          size="small"
          variant="contained"
          style={{
            background: "#232d3f",
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
