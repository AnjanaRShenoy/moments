import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useColorModeValue,
  Center,
<<<<<<< HEAD
  Spinner
=======
  Spinner,
>>>>>>> 2d77eba291877a20fe0877d73a93a06c2f0fc125
} from "@chakra-ui/react";
import { SmallCloseIcon } from "@chakra-ui/icons";
import {
  useProfileQuery,
<<<<<<< HEAD
  useUpdateUserMutation,
} from "../../slices/userApiSlice";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
=======
  useUpdateProfileImageMutation,
  useUpdateUserMutation,
} from "../../slices/userApiSlice";
import { useSelector } from "react-redux";
import { useState, useEffect, useRef } from "react";
>>>>>>> 2d77eba291877a20fe0877d73a93a06c2f0fc125
import { Form } from "react-bootstrap";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../slices/authSlice";

export default function UserProfileEdit() {
  const { userInfo } = useSelector((state) => state.auth);
<<<<<<< HEAD
  const dispatch= useDispatch()

  const [name, setName] = useState("");

  const [phoneNumber, setphoneNumber] = useState("");
  const [bio, setBio] = useState("");
=======
  const dispatch = useDispatch();
  const fileInput = useRef(null);
>>>>>>> 2d77eba291877a20fe0877d73a93a06c2f0fc125

  

<<<<<<< HEAD
=======
  const [name, setName] = useState("");
  const [phoneNumber, setphoneNumber] = useState("");
  const [bio, setBio] = useState("");
  const [image, setImage] = useState("");

>>>>>>> 2d77eba291877a20fe0877d73a93a06c2f0fc125
  const [profileUpdate] = useUpdateUserMutation();

  const { data: user, error, refetch } = useProfileQuery({ _id: userInfo._id });

  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setphoneNumber(user.phoneNumber || "");
<<<<<<< HEAD

      setBio(user.bio || "");
    }
  }, [user]);

  const updateProfile = async (e) => {

    e.preventDefault();
    try {
     
=======
      setBio(user.bio || "");
    }
  }, [user]);

  const handleFileChange = async (event) => {
    const selectedFile = event.target.files[0];
    setImage(selectedFile);
  };

  const changePhoto = async () => {
    try {
      if (fileInput.current) {
        fileInput.current.click();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const updateProfile = async (e) => {
    e.preventDefault();
    try {
>>>>>>> 2d77eba291877a20fe0877d73a93a06c2f0fc125
      if (!name.trim() || !phoneNumber.trim()) {
        toast.error("Please enter all fields");
      } else {
        try {
<<<<<<< HEAD
          const res = await profileUpdate({
            _id: userInfo._id,
            name,
            phoneNumber,
            bio,
          }).unwrap();
=======
          const formData = new FormData();

          formData.append("filed", image);
          formData.append("_id", userInfo._id);
          formData.append("phoneNumber", phoneNumber);
          formData.append("name", name);
          formData.append("bio", bio);

          const res = await profileUpdate(formData).unwrap();
>>>>>>> 2d77eba291877a20fe0877d73a93a06c2f0fc125
          dispatch(setCredentials(res));
          toast.success("Profile updated successfully");
        } catch (err) {
          toast.error(err?.data?.message || err.error);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
<<<<<<< HEAD
    <Flex align={"center"} justify={"center"}>
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
        {user ? (
          <>
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
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </FormControl>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input
                placeholder="enter your email address"
                _placeholder={{ color: "gray.500" }}
                type="email"
                value={user.email}
              />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Phone number</FormLabel>
              <Input
                placeholder="Enter your phonenumber"
                _placeholder={{ color: "gray.500" }}
                type="phonenumber"
                value={phoneNumber}
                onChange={(e) => setphoneNumber(e.target.value)}
              />
            </FormControl>
            <FormControl id="password">
              <FormLabel>About you</FormLabel>
              <Input
                placeholder="Tell about yourself..."
                _placeholder={{ color: "gray.500" }}
                type="text"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
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
                type="submit"
                onClick={(e) => updateProfile(e)}
              >
                Submit
              </Button>
            </Stack>
          </>
        ) : (
          <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
        )}
      </Stack>
    </Flex>
=======
    <div>
      <Flex align={"center"} justify={"center"}>
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
          {user ? (
            <>
              <Heading lineHeight={1.1} fontSize={{ base: "2xl", sm: "3xl" }}>
                User Profile Edit
              </Heading>

              <FormControl id="userName">
                <FormLabel>Profile Photo</FormLabel>
                <Stack direction={["column", "row"]} spacing={6}>
                  <Center>
                    <img
                      src={
                        image
                          ? URL.createObjectURL(image)
                          : `../../../${user.profileImage}`
                      }
                      style={{
                        size: "sm",
                        rounded: "full",
                        top: "-10px",
                        colorScheme: "red",
                        height: "60px",
                        width: "75px",
                      }}
                    />
                  </Center>
                  <Center w="full">
                    <input
                      type="file"
                      name="filed"
                      ref={fileInput}
                      style={{ display: "none" }}
                      onChange={handleFileChange}
                    />
                    <Button w="full" onClick={changePhoto}>
                      Edit Profile photo
                    </Button>
                  </Center>
                </Stack>
              </FormControl>
              <FormControl id="userName">
                <FormLabel>User name</FormLabel>
                <Input
                  placeholder="enter your name"
                  _placeholder={{ color: "gray.500" }}
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </FormControl>
              <FormControl id="email">
                <FormLabel>Email address</FormLabel>
                <Input
                  placeholder="enter your email address"
                  _placeholder={{ color: "gray.500" }}
                  type="email"
                  value={user.email}
                  isDisabled
                />
              </FormControl>
              <FormControl id="password">
                <FormLabel>Phone number</FormLabel>
                <Input
                  placeholder="Enter your phonenumber"
                  _placeholder={{ color: "gray.500" }}
                  type="phonenumber"
                  value={phoneNumber}
                  onChange={(e) => setphoneNumber(e.target.value)}
                />
              </FormControl>
              <FormControl id="password">
                <FormLabel>About you</FormLabel>
                <Input
                  placeholder="Tell about yourself..."
                  _placeholder={{ color: "gray.500" }}
                  type="text"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
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
                  type="submit"
                  onClick={(e) => updateProfile(e)}
                >
                  Submit
                </Button>
              </Stack>
            </>
          ) : (
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="blue.500"
              size="xl"
            />
          )}
        </Stack>
      </Flex>
      
    </div>
>>>>>>> 2d77eba291877a20fe0877d73a93a06c2f0fc125
  );
}
