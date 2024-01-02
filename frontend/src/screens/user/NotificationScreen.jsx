import React, { useEffect, useState } from "react";
import { Flex, Box, Avatar, Text, Badge, Checkbox } from "@chakra-ui/react";
import axios from "axios";
import { useSelector } from "react-redux";
import io from "socket.io-client";
import { useDeleteNotificationMutation } from "../../slices/userApiSlice";
import { toast } from "react-toastify";
const ENDPOINT = "http://localhost:5000";
var socket, selectedChatCompare;

const NotificationScreen = () => {
  const [notification, setNotification] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const { userInfo } = useSelector((state) => state.auth);
  const fetchData = async () => {
    try {
      const res = await axios.get(
        `/api/users/getNotification?_id=${userInfo._id}`
      );

      setNotification(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on("get notification", (get) => {
        console.log(get);
      });
    }
  }, []);

  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);

    if (e.target.checked) {
      deleteNotification();
    }
  };

  const deleteNotification = async () => {
    try {
      const res = await axios.post(
        `/api/users/deleteNotification?_id=${userInfo._id}`
      );
      fetchData();
      toast.success("Deleted all");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Flex borderColor="white" width="700px" direction="column" gap="20px">
        <Checkbox
          defaultChecked={false}
          checked={isChecked}
          onChange={handleCheckboxChange}
          style={{ color: "white" }}
        >
          Mark as read
        </Checkbox>
        {notification && notification.length > 0 ? (
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
          <div style={{ color: "white", fontSize: "25px" }}>
            No notifications to show
          </div>
        )}
      </Flex>
    </div>
  );
};

export default NotificationScreen;
