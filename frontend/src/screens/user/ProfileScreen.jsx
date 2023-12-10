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
  Spinner,
} from "@chakra-ui/react";
import { SmallCloseIcon } from "@chakra-ui/icons";
import {
  useProfileQuery,
  useUpdateProfileImageMutation,
  useUpdateUserMutation,
} from "../../slices/userApiSlice";
import { useSelector } from "react-redux";
import { useState, useEffect, useRef } from "react";
import { Form } from "react-bootstrap";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../slices/authSlice";

export default function UserProfileEdit() {
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const fileInput = useRef(null);

  const [profileImageUpdate] = useUpdateProfileImageMutation();

  const [name, setName] = useState("");
  const [phoneNumber, setphoneNumber] = useState("");
  const [bio, setBio] = useState("");
  const [image, setImage] = useState("");
  const [data, setData] = useState([]);

  const [profileUpdate] = useUpdateProfileImageMutation();

  const { data: user, error, refetch } = useProfileQuery({ _id: userInfo._id });

  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setphoneNumber(user.phoneNumber || "");
      setBio(user.bio || "");
    }
  }, [user]);

  const handleFileChange = async (event) => {
    const selectedFile = event.target.files[0];
    setImage(selectedFile);
  };

  const changePhoto = async (userId) => {
 
    try {
      const formData = new FormData();    

      formData.append("filed", image);
      formData.append("userInfo",JSON.stringify(userInfo))

      const res= await profileUpdate(formData).unwrap()

      toast.success("successfully changed the pro-pic")
    } catch (err) {
      console.log(err);
    }
  };

  const updateProfile = async (e) => {
    e.preventDefault();
    try {
      if (!name.trim() || !phoneNumber.trim()) {
        toast.error("Please enter all fields");
      } else {
        try {
          const res = await profileUpdate({
            _id: userInfo._id,
            name,
            phoneNumber,
            bio,
          }).unwrap();
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
                    src={`../../../${user.profileImage}`}
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
                    onChange={(e) => {
                      handleFileChange(e);
                    }}
                  />
                  <Button
                    w="full"
                    ref={fileInput}
                    onClick={() => changePhoto(user._id)}
                  >
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
  );
}
