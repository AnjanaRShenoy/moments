import { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
// import FormContainer from "../components/FormContainer";
import Loader from "../../components/mutualComponents/Loader";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useRegisterMutation, useOtpMutation } from "../../slices/userApiSlice";
import { setCredentials } from "../../slices/authSlice";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  useColorModeValue,
  useToast,
  Checkbox,
  FormErrorMessage,
  VStack,
  Text,
} from "@chakra-ui/react";
import { Field, Formik, ErrorMessage } from "formik";

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
  const Toast = useToast();

  const [register, { isLoading }] = useRegisterMutation();
  const [Otp, { isRounding }] = useOtpMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const submitHandler = async (values) => {
    //to submit the signup form, validate and send to back end
    debugger;

    const { name, email, phoneNumber, password, confirmPassword } = values;
   
  
      try {
        const res = await register({
          //response brought from backend
          name,
          email,
          phoneNumber,
          password,
        }).unwrap();
        setOtppage(true); //to bring the otp page
      } catch (err) {
        Toast({
          title: err?.data?.message || err.error,
          status: "error",
          isClosable: true,
        });
      }
    
  };
  const resendOtp = async (e) => {
    try {
      const res = await register({
        name,
        email,
        phoneNumber,
        password,
      }).unwrap();
    } catch {
      toast({
        title: err?.data?.message || err.error,
        status: "error",
        isClosable: true,
      });
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
        otp,
      }).unwrap();
      navigate("/login");
    } catch (err) {
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
            <Formik
              initialValues={{
                name: "",
                phoneNumber: "",
                email: "",
                password: "",
                confirmPassword: "",
              }}
              onSubmit={(values) => submitHandler(values)}
            >
              {({ handleSubmit, errors, touched }) => (
                <form onSubmit={handleSubmit}>
                  <VStack spacing={4} align="flex-start">
                    <FormControl isInvalid={!!errors.name && touched.name}>
                      <FormLabel htmlFor="name">Name</FormLabel>
                      <Field
                        as={Input}
                        id="name"
                        name="name"
                        type="name"
                        variant="filled"
                        // onChange={(e) => {
                        //   setName(e.target.value);
                        //   values.name = e.target.value;
                        // }}
                        validate={(value) => {
                          let error;

                          if (value.length === 0) {
                            error = "Name field cannot be empty";
                          }
                          if (
                            !value.match(/(^[a-zA-Z][a-zA-Z\s]{0,20}[a-zA-Z]$)/)
                          ) {
                            error = "Invalid name";
                          }

                          return error;
                        }}
                      />
                      <FormErrorMessage>{errors.name}</FormErrorMessage>
                    </FormControl>

                    <FormControl isInvalid={!!errors.email && touched.email}>
                      <FormLabel htmlFor="email">Email</FormLabel>
                      <Field
                        as={Input}
                        id="email"
                        name="email"
                        type="email"
                        variant="filled"
                        // onChange={(e) => {
                        //   setEmail(e.target.value);
                        //   values.email = e.target.value;
                        // }}
                        validate={(value) => {
                          let error;

                          if (value.length === 0) {
                            error = "email field cannot be empty";
                          }
                          if (
                            !value.match(
                              /^[a-zA-Z0-9.!#$%&’+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)$/
                            )
                          ) {
                            error = "Invalid email address";
                          }
                          return error;
                        }}
                      />
                      <FormErrorMessage>{errors.email}</FormErrorMessage>
                    </FormControl>

                    <FormControl
                      isInvalid={!!errors.phoneNumber && touched.phoneNumber}
                    >
                      <FormLabel htmlFor="phoneNumber">Phone Number</FormLabel>
                      <Field
                        as={Input}
                        id="phoneNumber"
                        name="phoneNumber"
                        type="phoneNumber"
                        variant="filled"
                        // onChange={(e) => {
                        //   setPhoneNumber(e.target.value);
                        //   values.phoneNumber = e.target.value;
                        // }}
                        validate={(value) => {
                          let error;

                          if (value.length !== 10) {
                            error = "Phone Number should be ten digits";
                          }
                          if (value.charAt(0) === "0") {
                            error = "Please enter valid phone number";
                          }
                          return error;
                        }}
                      />
                      <FormErrorMessage>{errors.phoneNumber}</FormErrorMessage>
                    </FormControl>

                    <FormControl
                      isInvalid={!!errors.password && touched.password}
                    >
                      <FormLabel htmlFor="password">Password</FormLabel>
                      <Field
                        as={Input}
                        id="password"
                        name="password"
                        type="password"
                        variant="filled"
                        // onChange={(e) => {
                        //   setPassword(e.target.value);
                        //   values.password = e.target.value;
                        // }}
                        validate={(value) => {
                          let error;

                          if (value.length < 6) {
                            error =
                              "Password must contain at least 6 characters";
                          }

                          return error;
                        }}
                      />
                      <FormErrorMessage>{errors.password}</FormErrorMessage>
                    </FormControl>

                    <FormControl
                      isInvalid={!!errors.password && touched.password}
                    >
                      <FormLabel htmlFor="confirmPassword">
                        Confirm Password
                      </FormLabel>
                      <Field
                        as={Input}
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        variant="filled"
                        // onChange={(e) => {
                        //   setConfirmPassword(e.target.value);
                        //   values.confirmPassword = e.target.value;
                        // }}
                        validate={(value) => {
                          let error;

                          if (value.length < 6) {
                            error =
                              "Password must contain at least 6 characters";
                          }
                          return error;
                        }}
                      />
                      <FormErrorMessage>{errors.password}</FormErrorMessage>
                    </FormControl>

                    <Button
                      type="submit"
                      loadingText="Submitting"
                      size="lg"
                      bg={"blue.400"}
                      color={"white"}
                      _hover={{
                        bg: "blue.500",
                      }}
                      align={"center"}
                      justify={"center"}
                    >
                      Sign Up
                    </Button>
                  </VStack>
                </form>
              )}
            </Formik>
            <div style={{ borderTop: "0.5px solid #000", width: "100%" }}></div>
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
                  <Link
                    onClick={resendOtp}
                    cursor={"cursor"}
                    color={"blue.400"}
                  >
                    Resend Otp
                  </Link>
                </Stack>
              </Stack>
            </Form>
          </Box>
        </Stack>
      )}
      <ToastContainer />
    </Flex>
  );
};

export default RegisterScreen;
