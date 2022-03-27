import React from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from "@mui/material";
import HeadingOne from "../HeadingOne";
const AdminInbox = () => {
  return (
    <>
      <Box sx={{ p: 1 }}>
        <HeadingOne title="Inbox Messages" />
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell align="left">Name</TableCell>
                <TableCell align="left">Email</TableCell>
                <TableCell align="left">Phone</TableCell>
                <TableCell align="left">Message</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                }}
              >
                <TableCell>1</TableCell>
                <TableCell align="left">Robert</TableCell>
                <TableCell align="left">lewandoski@gmail.com</TableCell>
                <TableCell align="left">0748929937</TableCell>
                <TableCell align="left">
                  This is my message one how you should improve this app
                </TableCell>
              </TableRow>
              <TableRow
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                }}
              >
                <TableCell>2</TableCell>
                <TableCell align="left">Eden</TableCell>
                <TableCell align="left">eden@yahoo.com</TableCell>
                <TableCell align="left">0748929937</TableCell>
                <TableCell align="left">
                  This is the message from mr eden hazard
                </TableCell>
              </TableRow>

              <TableRow
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                }}
              >
                <TableCell>3</TableCell>
                <TableCell align="left">Neymar</TableCell>
                <TableCell align="left">dasliva@gmail.com</TableCell>
                <TableCell align="left">0748929937</TableCell>
                <TableCell align="left">
                  This is the message from the portuguesse man
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
};

export default AdminInbox;
