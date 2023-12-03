import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useColorModeValue,
  Avatar,
  AvatarBadge,
  IconButton,
  Center,
} from "@chakra-ui/react";
import { SmallCloseIcon } from "@chakra-ui/icons";
import { useProfileQuery } from "../../slices/userApiSlice";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";

export default function UserProfileEdit() {
  const { userInfo } = useSelector((state) => state.auth);

  const [data, setData] = useState([]);

  const { data: user, error, refetch } = useProfileQuery();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `/api/user/profile?email=${userInfo.email}&username=${userInfo.username}`,
          {
            method: "GET",
          }
        );
        if (!response.ok) {
          console.error("Error fetching user profile:", response.statusText);
        } else {
          const userData = await response.json();
          setData(userData);
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [refetch, data]);

  return (
    <Flex minH={"100vh"} align={"center"} justify={"center"}>
      <Stack
        spacing={4}
        w={"full"}
        maxW={"md"}
        bg={useColorModeValue("white", "gray.700")}
        rounded={"xl"}
        boxShadow={"lg"}
        p={6}
        my={12}
      >
        <Heading lineHeight={1.1} fontSize={{ base: "2xl", sm: "3xl" }}>
          User Profile Edit
        </Heading>
        <FormControl id="userName">
          <FormLabel>Profile Photo</FormLabel>
          <Stack direction={["column", "row"]} spacing={6}>
            <Center>
              <Avatar size="xl" src="https://bit.ly/sage-adebayo">
                <AvatarBadge
                  as={IconButton}
                  size="sm"
                  rounded="full"
                  top="-10px"
                  colorScheme="red"
                  aria-label="remove Image"
                  icon={<SmallCloseIcon />}
                />
              </Avatar>
            </Center>
            <Center w="full">
              <Button w="full">Edit Profile photo</Button>
            </Center>
          </Stack>
        </FormControl>
        <FormControl id="userName">
          <FormLabel>User name</FormLabel>
          <Input
            placeholder="enter your name"
            _placeholder={{ color: "gray.500" }}
            type="text"
            value={userInfo.name}
          />
        </FormControl>
        <FormControl id="email">
          <FormLabel>Email address</FormLabel>
          <Input
            placeholder="enter your email address"
            _placeholder={{ color: "gray.500" }}
            type="email"
            value={userInfo.email}
          />
        </FormControl>
        <FormControl id="password">
          <FormLabel>Phone number</FormLabel>
          <Input
            placeholder="Enter your phonenumber"
            _placeholder={{ color: "gray.500" }}
            type="phonenumber"
          />
        </FormControl>
        <FormControl id="password">
          <FormLabel>About you</FormLabel>
          <Input
            placeholder="Tell about yourself..."
            _placeholder={{ color: "gray.500" }}
            type="password"
          />
        </FormControl>

        <Stack spacing={6} direction={["column", "row"]}>
          <Button
            bg={"red.400"}
            color={"white"}
            w="full"
            _hover={{
              bg: "red.500",
            }}
          >
            Cancel
          </Button>
          <Button
            bg={"blue.400"}
            color={"white"}
            w="full"
            _hover={{
              bg: "blue.500",
            }}
          >
            Submit
          </Button>
        </Stack>
      </Stack>
    </Flex>
  );
}
