import { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
// import FormContainer from "../components/FormContainer";
import Loader from "../../components/Loader";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  useRegisterMutation,
  useOtpMutation,
} from "../../slices/userAdminApiSlice";
import { setCredentials } from "../../slices/authSlice";
import { toast } from "react-toastify";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
const RegisterScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [otppage, setOtppage] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [register, { isLoading }] = useRegisterMutation();
  const [Otp, { isRounding }] = useOtpMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const submitHandler = async (e) => {    //to submit the signup form, validate and send to back end
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
    } else if (
      !name.trim() ||
      !email.trim() ||
      !phoneNumber.trim() ||
      !password.trim() ||
      !confirmPassword.trim()
    ) {
      toast.error("Empty fields, please enter a value");
    } else {
      try {
        const res = await register({           //response brought from backend
          name,
          email,
          phoneNumber,
          password,
        }).unwrap();
      
        dispatch(setCredentials({ ...res })); //to send the response to the store for local storage
        setOtppage(true);                     //to bring the otp page
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  const submitOtpHandler = async (e) => {
    e.preventDefault();
    try {      
      
        const res = await Otp({ 
          name,
          phoneNumber,
          password,
          email,
          otp
        }).unwrap();
        
        dispatch(setCredentials({ ...res }));
        navigate("/");
      } 
     catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  }; 

  const googleHandler = async (decoded) => {
    const email = decoded.email;
    const name = decoded.name;
    try {
      const res = await register({ name, email, gmail: true }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate("/login");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      style={{
        backgroundImage:
          'linear-gradient(rgba(255, 255, 255, 0.80), rgba(255, 255, 255, 0.4)), url("https://c4.wallpaperflare.com/wallpaper/646/235/690/icons-social-media-social-media-wallpaper-preview.jpg")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {!otppage ? (
        <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
          <Stack align={"center"}>
            <Heading fontSize={"4xl"} textAlign={"center"}>
              Sign Up
            </Heading>
          </Stack>
          <Box
            rounded={"lg"}
            bg={useColorModeValue("white", "gray.700")}
            boxShadow={"lg"}
            p={8}
          >
            <Form onSubmit={submitHandler}>
              <Stack spacing={4}>
                <FormControl id="email">
                  <FormLabel>Name</FormLabel>
                  <Input
                    type="name"
                    placeholder="Enter name"
                    onChange={(e) => setName(e.target.value)}
                  />
                </FormControl>
                <FormControl id="phoneNumber">
                  <FormLabel>Phone Number</FormLabel>
                  <Input
                    type="phoneNumber"
                    placeholder="Enter phone number"
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </FormControl>
                <FormControl id="email">
                  <FormLabel>Email address</FormLabel>
                  <Input
                    type="email"
                    placeholder="Enter email"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </FormControl>
                <FormControl id="password">
                  <FormLabel>Password</FormLabel>
                  <InputGroup>
                    <Input
                      type={password ? "text" : "password"}
                      placeholder="Enter password"
                      onChange={(e) => setPassword(e.target.value)}
                    />

                    <Button
                      variant={"ghost"}
                      onClick={() => setPassword((Password) => !Password)}
                    >
                      {password ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputGroup>
                </FormControl>
                <FormControl id="password">
                  <FormLabel>Confirm password</FormLabel>
                  <InputGroup>
                    <Input
                      type={password ? "text" : "password"}
                      placeholder="Enter password"
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />

                    <Button
                      variant={"ghost"}
                      onClick={() =>
                        setConfirmPassword((Password) => !Password)
                      }
                    >
                      {password ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputGroup>
                </FormControl>
                <Stack spacing={10} pt={2}>
                  {isLoading && <Loader />}
                  <Button
                    type="submit"
                    loadingText="Submitting"
                    size="lg"
                    bg={"blue.400"}
                    color={"white"}
                    _hover={{
                      bg: "blue.500",
                    }}
                  >
                    Sign Up
                  </Button>
                </Stack>
                <div
                  style={{ borderTop: "0.5px solid #000", width: "100%" }}
                ></div>
                <h6 style={{ textAlign: "center" }}>Or Signup with</h6>
                <GoogleOAuthProvider clientId="491369151018-90df2bi9i480ivns1lmojepi9p2r9vg1.apps.googleusercontent.com">
                  <GoogleLogin
                    onSuccess={(credentialResponse) => {
                      const decoded = jwtDecode(credentialResponse.credential);
                      googleHandler(decoded);
                    }}
                    onError={() => {
                      console.log("Login Failed");
                    }}
                  />
                </GoogleOAuthProvider>

                <Stack pt={6}>
                  <Text align={"center"}>
                    Already have an account?
                    <Link to="/login" cursor={"pointer"} color={"blue.400"}>
                      Login
                    </Link>
                  </Text>
                </Stack>
              </Stack>
            </Form>
          </Box>
        </Stack>
      ) : (
        <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
          <Stack align={"center"}>
            <Heading fontSize={"4xl"} textAlign={"center"}>
              OTP
            </Heading>
          </Stack>
          <Box
            rounded={"lg"}
            bg={useColorModeValue("white", "gray.700")}
            boxShadow={"lg"}
            p={8}
          >
            <Form onSubmit={submitOtpHandler}>
              <Stack spacing={4}>
                <FormControl id="otp">
                  <FormLabel>OTP</FormLabel>
                  <Input
                    type="OTP"
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                  />
                </FormControl>

                <Stack spacing={10} pt={2}>
                  {isLoading && <Loader />}
                  <Button
                    type="submit"
                    loadingText="Submitting"
                    size="lg"
                    bg={"blue.400"}
                    color={"white"}
                    _hover={{
                      bg: "blue.500",
                    }}
                  >
                    Submit
                  </Button>
                </Stack>
              </Stack>
            </Form>
          </Box>
        </Stack>
      )}
    </Flex>
  );
};

export default RegisterScreen;
