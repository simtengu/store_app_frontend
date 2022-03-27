import { Typography,Box } from '@mui/material';
import React from 'react';
const HeadingOne = ({title}) => {
    return (
      <>
        <Box mb={3}>
          <Typography variant="h6" sx={{ fontWeight: "bolder" }}>
          {title}
          </Typography>
          <div className="underline"></div>
        </Box>
      </>
    );
}
 
export default HeadingOne;