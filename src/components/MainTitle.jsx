import React from 'react';
import { Box, Button } from '@mui/material';
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";

const MainTitle = ({title}) => {
    return (
      <>
        <Box sx={{ bgcolor: "#2e3134", my: 5, px: 2,py:1 }}>
          <Button sx={{ color: "white" }} startIcon={<DoubleArrowIcon />}>
            {title}
          </Button>
        </Box>
      </>
    );
}
 
export default MainTitle;