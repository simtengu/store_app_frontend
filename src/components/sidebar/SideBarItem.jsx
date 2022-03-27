import { Avatar, Divider, Paper, Stack, Typography } from '@mui/material';
import {  BookmarkBorder } from "@mui/icons-material";
import React from 'react';
const SideBarItem = (props) => {
   const {children,title} = props;
    return (
      <>
        <Paper>
          <div
            style={{
              background: "#4b4b4b",
              padding: 0,
              marginTop:10
            }}
          >
            <Stack
              direction="row"
        
              alignItems="center"
              spacing={2}
            >
              <Avatar sx={{ bgcolor: "black", p: 3 }} variant="rounded">
                <BookmarkBorder />
              </Avatar>
              <Typography style={{ color: "#fff" }}>{title}</Typography>
            </Stack>
          </div>
          {children}
        </Paper>
      </>
    );
}
 
export default SideBarItem;