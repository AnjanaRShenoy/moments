import React, { useEffect, useState } from "react";
import { Flex, Box, Avatar, Text, Badge } from "@chakra-ui/react";
import axios from "axios";
import { useSelector } from "react-redux";

const NotificationScreen = () => {
  const [notification, setNotification] = useState("");
  const { userInfo } = useSelector((state) => state.auth);
  const fetchData = async () => {
    try {
      const res = await axios.get(
        `/api/users/getNotification?_id=${userInfo._id}`
      );
      console.log(res.data);
      setNotification(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <Flex borderColor="white" width="700px"  direction="column" gap="20px">
        {notification ? (
          notification.map((notification) => (
            <div key={notification._id}>
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
                  src={`../../../${notification.sender.profileImage}`}
                />
                <Box ml="3">
                  <Flex alignItems="baseline">
                    <Text fontWeight="bold">{notification.sender.name}</Text>

                    <Text fontSize="sm">{notification.content}</Text>
                  </Flex>
                </Box>
              </Flex>
            </div>
          ))
        ) : (
          <>NULL</>
        )}
      </Flex>
    </div>
  );
};

export default NotificationScreen;
