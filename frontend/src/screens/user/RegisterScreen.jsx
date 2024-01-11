import { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
// import FormContainer from "../components/FormContainer";
import Loader from "../../components/mutualComponents/Loader";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
<<<<<<< HEAD
import { useRegisterMutation, useOtpMutation } from "../../slices/userApiSlice";
=======
import {
  useRegisterMutation,
  useOtpMutation,
  useResendOtpMutation,
} from "../../slices/userApiSlice";
>>>>>>> 2d77eba291877a20fe0877d73a93a06c2f0fc125
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
<<<<<<< HEAD
useToast
=======
  useToast,
  Checkbox,
  FormErrorMessage,
  VStack,
  Text,
>>>>>>> 2d77eba291877a20fe0877d73a93a06c2f0fc125
} from "@chakra-ui/react";
import { Field, Formik, ErrorMessage } from "formik";

import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
const RegisterScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [otppage, setOtppage] = useState(false);
  const t = 10;
  const [resendTimer, setResendTimer] = useState(t);
  const [otpname, setOtpname] = useState("");
  const [otpemail, setOtpemail] = useState("");
  const [otppass, setOtppass] = useState("");
  const [otpno, setOtpno] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const Toast = useToast();

  const [register, { isLoading }] = useRegisterMutation();
  const [Otp, { isRounding }] = useOtpMutation();
  const [resend] = useResendOtpMutation();

  const { userInfo } = useSelector((state) => state.auth);

<<<<<<< HEAD
  const submitHandler = async (e) => {
    //to submit the signup form, validate and send to back end
    e.preventDefault();

    if (password !== confirmPassword) {
      Toast({
        title: "Passwords do not match",
        status: "error",
        isClosable: true,
      });
    } else if (
      !name.trim() ||
      !email.trim() ||
      !phoneNumber.trim() ||
      !password.trim() ||
      !confirmPassword.trim()
    ) {
      Toast({
        title: "Empty fields, please enter value",
        status: "error",
        isClosable: true,
      });
    } else {
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
=======
  const submitHandler = async (values) => {
                                        //to submit the signup form, validate and send to back end
    setResendTimer(t);

    const { name, email, phoneNumber, password, confirmPassword } = values;
    setOtpname(name),
      setOtpemail(email),
      setOtpno(phoneNumber),
      setOtppass(password);
    try {
      const res = await register({
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
    setResendTimer(t);

    try {
      const res = await resend({
        otpname,
        otpemail,
        otpno,
        otppass,
      }).unwrap();
    } catch {
      toast({
        title: err?.data?.message || err.error,
        status: "error",
        isClosable: true,
      });
>>>>>>> 2d77eba291877a20fe0877d73a93a06c2f0fc125
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

  useEffect(() => {
    const timerInterval = setInterval(() => {
      if (resendTimer > 0) {
        setResendTimer((prevTimer) => prevTimer - 1);
      }
    }, 1000);

    return () => {
      clearInterval(timerInterval);
    };
  }, [resendTimer]);

  const submitOtpHandler = async (e) => {

    e.preventDefault();
<<<<<<< HEAD
    try {
      const res = await Otp({
        name,
        phoneNumber,
        password,
        email,
        otp,
=======
    
    try {
      const res = await Otp({
        otpname,
        otpemail,
        otpno,
        otppass,
        otp

>>>>>>> 2d77eba291877a20fe0877d73a93a06c2f0fc125
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
<<<<<<< HEAD
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
                      onkeyup="validatePassword"
                    />
=======
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
>>>>>>> 2d77eba291877a20fe0877d73a93a06c2f0fc125

                    <Button
                      type="submit"
                      loadingText="Submitting"
                      size="lg"
                      bg={"blue.400"}
                      color={"white"}
                      _hover={{
                        bg: "blue.500",
                      }}
                      width={"250px"}
                      align={"center"}
                      justify={"center"}
                    >
                      Sign Up
                    </Button>
                  </VStack>
                </form>
              )}
            </Formik>
            <br />
            <br />

            <div style={{ borderTop: "0.5px solid #000", width: "100%" }}></div>
            <br />
            <br />

            <h6 style={{ textAlign: "center" }}>Or Signup with</h6>
            <br />
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
            <Form >
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
                    onClick={submitOtpHandler }
                    as={resendTimer ? "div" : "a"}
                  >
                    Submit
                  </Button>
<<<<<<< HEAD
                  <Link
                    onClick={resendOtp}
                    cursor={"cursor"}
                    color={"blue.400"}
                  >
                    Resend Otp
                  </Link>
=======

                  <div> { resendTimer > 0 ? `Resend OTP in ${resendTimer}`:( null)}
                  {resendTimer <= 0 && (
                    <Link
                      onClick={resendOtp}
                      cursor={"pointer"}
                      color={"blue.400"}
                  
                    >
                      Resend Otp
                    </Link>
                  )}
                  </div>
>>>>>>> 2d77eba291877a20fe0877d73a93a06c2f0fc125
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
