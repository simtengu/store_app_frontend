import React, { useEffect, useState } from "react";
import axios from "../../api/secureApi";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Skeleton,
} from "@mui/material";
import HeadingOne from "../HeadingOne";
const Users = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const rs = await axios.get("/users");
        const all_users = rs.data.users;
        console.log(all_users)
        setUsers(all_users);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.log(error.message);
      }
    };

    fetchUsers();
  }, []);
  if (isLoading) {
    return (
      <Box sx={{ width: "100%" }}>
        <Skeleton
          variant="rectangular"
          sx={{ width: "100%", height: 50, my: 1 }}
        />
        <Skeleton
          variant="rectangular"
          sx={{ width: "100%", height: 50, my: 1 }}
          animation="wave"
        />
        <Skeleton
          variant="rectangular"
          sx={{ width: "100%", height: 50, my: 1 }}
        />
        <Skeleton
          variant="rectangular"
          sx={{ width: "100%", height: 50, my: 1 }}
          animation="wave"
        />

        <Skeleton
          variant="rectangular"
          sx={{ width: "100%", height: 50, my: 1 }}
        />
        <Skeleton
          variant="rectangular"
          sx={{ width: "100%", height: 50, my: 1 }}
          animation="wave"
        />
        <Skeleton
          variant="rectangular"
          sx={{ width: "100%", height: 50, my: 1 }}
        />
        <Skeleton
          variant="rectangular"
          sx={{ width: "100%", height: 50, my: 1 }}
          animation="wave"
        />
      </Box>
    );
  }

  return (
    <>
      <Box sx={{ p: 1 }}>
        <HeadingOne title="Users" />
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell align="left">First Name</TableCell>
                <TableCell align="left">Last Name</TableCell>
                <TableCell align="left">Email</TableCell>
                <TableCell align="left">Phone</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users && users.map((user,index) => {
                return (
                  <TableRow
                  key={user._id}
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                    }}
                  >
                    <TableCell>{index + 1}</TableCell>
                    <TableCell align="left">{user.firstName}</TableCell>
                    <TableCell align="left">{user.lastName}</TableCell>
                    <TableCell align="left">{user.email}</TableCell>
                    <TableCell align="left">{user.phone}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
};

export default Users;
