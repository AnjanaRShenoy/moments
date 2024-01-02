import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Flex,
} from "@chakra-ui/react";
import {
  useBlockUserMutation,
  useListUsersQuery,
} from "../../slices/adminApiSlice";
import { useState, useEffect } from "react";
import { Button, CardTitle } from "react-bootstrap";
import Pagination from "../../components/mutualComponents/Pagination";

const AdminUserManagement = () => {
  const { data: users, error, refetch } = useListUsersQuery();

  const [block] = useBlockUserMutation();

  const [totalUsers, setTotalUsers] = useState();
  const [userDetail, setUserDetail] = useState();
  const [startIndex, setStartIndex] = useState();
  const [usersDetails, setUsersDetails] = useState();
  const [endIndex, setEndIndex] = useState();

  const blockUser = async (userId, status) => {
    try {
      const res = await block({ userId, status }).unwrap();
      refetch();
    } catch (err) {
      console.log(err);
    }
  };
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
          {/* <TableCaption>User table</TableCaption>3 */}

          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Email</Th>
              <Th>Phonenumber</Th>
            </Tr>
          </Thead>
          <Tbody>
            {usersDetails
              ? usersDetails.map((users) => (
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
        <Pagination
          setStartIndex={setStartIndex}
          setEndIndex={setEndIndex}
          total={totalUsers}
        />
      </TableContainer>
    </Flex>
  );
};
export default AdminUserManagement;
