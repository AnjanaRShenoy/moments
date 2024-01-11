import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
<<<<<<< HEAD
 
=======
  Flex,
>>>>>>> 2d77eba291877a20fe0877d73a93a06c2f0fc125
} from "@chakra-ui/react";
import {
  useBlockUserMutation,
  useListUsersQuery,
} from "../../slices/adminApiSlice";
import { useState, useEffect } from "react";
import { Button, CardTitle } from "react-bootstrap";
<<<<<<< HEAD

const AdminUserManagement = () => {
 
=======
import Pagination from "../../components/mutualComponents/Pagination";

const AdminUserManagement = () => {
>>>>>>> 2d77eba291877a20fe0877d73a93a06c2f0fc125
  const { data: users, error, refetch } = useListUsersQuery();

  const [block] = useBlockUserMutation();

<<<<<<< HEAD
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
=======
  const [totalUsers, setTotalUsers] = useState();
  const [userDetail, setUserDetail] = useState();
  const [startIndex, setStartIndex] = useState();
  const [usersDetails, setUsersDetails] = useState();
  const [endIndex, setEndIndex] = useState();

  const blockUser = async (userId, status) => {
    try {
      const res = await block({ userId, status }).unwrap();
      refetch();
>>>>>>> 2d77eba291877a20fe0877d73a93a06c2f0fc125
    } catch (err) {
      console.log(err);
    }
  };
<<<<<<< HEAD
  
  return (
    <>
      <CardTitle align={"center"} justify={"center"}>
        <h2>Users</h2>
      </CardTitle>
      <br />
      <TableContainer>
        <Table variant="striped" colorScheme="teal">
=======
  useEffect(() => {
    if (users) {
      setTotalUsers(users.length);
      setUsersDetails(users.slice(startIndex, endIndex));
    }
  }, [startIndex, endIndex, users, setUsersDetails]);

  return (
    <Flex flexDirection={"column"}>
      <CardTitle align={"center"} justify={"center"} style={{ color: "white" }}>
        <h2>Users</h2>
      </CardTitle>
      <br />
      <TableContainer style={{ backgroundColor: "white" }}>
        <Table >
>>>>>>> 2d77eba291877a20fe0877d73a93a06c2f0fc125
          {/* <TableCaption>User table</TableCaption>3 */}

          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Email</Th>
              <Th>Phonenumber</Th>
            </Tr>
          </Thead>
          <Tbody>
<<<<<<< HEAD
            {users
              ? users.map((users) => (
=======
            {usersDetails
              ? usersDetails.map((users) => (
>>>>>>> 2d77eba291877a20fe0877d73a93a06c2f0fc125
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
<<<<<<< HEAD
      </TableContainer>
    </>
=======
        <Pagination
          setStartIndex={setStartIndex}
          setEndIndex={setEndIndex}
          total={totalUsers}
        />
      </TableContainer>
    </Flex>
>>>>>>> 2d77eba291877a20fe0877d73a93a06c2f0fc125
  );
};
export default AdminUserManagement;
