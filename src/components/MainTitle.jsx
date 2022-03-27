import React from 'react';
import { Button } from '@mui/material';
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";

const MainTitle = ({title}) => {
    return (
      <>
        <div className="bg-dark my-5 py-2 px-2">
          <Button sx={{ color: "white" }} startIcon={<DoubleArrowIcon />}>
           {title}
          </Button>
        </div>
      </>
    );
}
 
export default MainTitle;