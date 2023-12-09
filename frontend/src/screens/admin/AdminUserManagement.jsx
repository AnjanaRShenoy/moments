import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
 
} from "@chakra-ui/react";
import {
  useBlockUserMutation,
  useListUsersQuery,
} from "../../slices/adminApiSlice";
import { useState, useEffect } from "react";
import { Button, CardTitle } from "react-bootstrap";

const AdminUserManagement = () => {
 
  const { data: users, error, refetch } = useListUsersQuery();

  const [block] = useBlockUserMutation();

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       await refetch();
  //       setData(users);
  //       console.log(data);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };
  //   fetchData();
  // }, [refetch, data]);

  const blockUser = async (userId, status) => {
    try {
      const res = await block({userId, status}).unwrap();
      refetch()
    } catch (err) {
      console.log(err);
    }
  };
  
  return (
    <>
      <CardTitle align={"center"} justify={"center"}>
        <h2>Users</h2>
      </CardTitle>
      <br />
      <TableContainer>
        <Table variant="striped" colorScheme="teal">
          {/* <TableCaption>User table</TableCaption>3 */}

          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Email</Th>
              <Th>Phonenumber</Th>
            </Tr>
          </Thead>
          <Tbody>
            {users
              ? users.map((users) => (
                  <Tr>
                    <Td>{users.name}</Td>
                    <Td>{users.email}</Td>
                    <Td>{users.phoneNumber}</Td>

                    <Td>
                      {users.isBlocked ? (
                        <Button onClick={() => blockUser(users._id, "unblock")}>
                          Unblock
                        </Button>
                      ) : (
                        <Button onClick={() => blockUser(users._id, "block")}>
                          Block
                        </Button>
                      )}
                    </Td>
                  </Tr>
                ))
              : null}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
};
export default AdminUserManagement;
