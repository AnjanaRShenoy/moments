import React, { useEffect, useState } from "react";
import { Flex, Box, Avatar, Text, Badge, Button } from "@chakra-ui/react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useFollowMutation } from "../../slices/userApiSlice";
import { useSocket } from "../../context/Context";

const RequestScreen = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [request, setRequest] = useState("");

  const fetchData = async () => {
    try {
      const res = await axios.get(`/api/users/getRequest?_id=${userInfo._id}`);
     
      setRequest(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  const socket= useSocket()
  useEffect(() => {
    if (socket) {
      socket.emit("join notification", userInfo._id);
      socket.on("get request", () => {        
        fetchData();
      });
    }
    fetchData();
  }, [socket]);

  useEffect(() => {
    fetchData();
  }, []);

  const [follow] = useFollowMutation();
  const followUser = async (userId,response) => {
    try {
 
      const res = await follow({ userInfo, userId, response }).unwrap();
      fetchData();
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>

      <Flex borderColor="white" width="700px" direction="column" gap="20px">
        {request && request.length>0 ? (
          request.map((request) => (
            <div key={request._id}>
              <Flex
                backgroundColor="white"
                borderRadius="10px"
                paddingLeft="10px"
                paddingTop="10px"
                height="70px"
              >
                <img
                  style={{
                    borderRadius: "50px",
                    height: "50px",
                    width: "50px",
                  }}
                  src={`../../../${request.sender.profileImage}`}
                />
                <Box ml="3">
                  <Flex alignItems="baseline">
                    <Text fontWeight="bold">{request.sender.name}</Text>

                    <Button
                      colorScheme="teal"
                      variant="outline"
                      size="sm"
                      onClick={async() => {
                        
                        followUser(request.sender._id,"accept");
                      }}
                    >
                      Accept
                    </Button>

                    <Button
                      colorScheme="teal"
                      variant="outline"
                      size="sm"
                      onClick={() => {
                       
                        followUser(request.sender._id,"decline");
                      }}
                    >
                      Decline
                    </Button>
                  </Flex>
                </Box>
              </Flex>
            </div>
          ))
        ) : (
          <div style={{ color: "white", fontSize: "25px" }}>
            No requests to show
          </div>
        )}
      </Flex>
    
    </div>
  );
};

export default RequestScreen;
