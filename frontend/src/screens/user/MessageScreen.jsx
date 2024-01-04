import React, { useEffect, useState } from "react";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBIcon,
  MDBTypography,
  MDBInputGroup,
} from "mdb-react-ui-kit";
import { Link, Box, Heading, Image, Flex } from "@chakra-ui/react";
import { formatDistance } from "date-fns";
import { Scrollbars } from "react-custom-scrollbars";
import { useSelector } from "react-redux";
import {
  useGetMessageMutation,
  useSendMessageMutation,
} from "../../slices/userApiSlice";
import { useNavigate, useParams } from "react-router-dom";
import { useSocket } from "../../context/Context";

function MessageScreen() {
  const { userInfo } = useSelector((state) => state.auth);
  const { profileId } = useParams();
  const socket = useSocket();
  const [user, setUser] = useState("");
  const [message, setMessage] = useState("");
  const [usermessage, setUserMessage] = useState("");
  const [otherMessagers, setOtherMessagers] = useState("");

  const [getMessage] = useGetMessageMutation();
  const fetchData = async () => {
    try {
      const response = await getMessage({ profileId, userInfo }).unwrap();
      console.log(response);
      setUser(response.user);
      setUserMessage(response.message);
      setOtherMessagers(response.uniqueSenders);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const [sendMess] = useSendMessageMutation();
  const sendMessage = async (userId) => {
    if (message.trim()) {
      const res = await sendMess({ message, userInfo, userId }).unwrap();
      setMessage("");
      fetchData();
    }
  };
  const navigate = useNavigate();
  const getMessages = async (profileId) => {
    try {
      navigate(`/messages/${profileId}`);
      socket.emit("join chat", profileId);
      fetchData();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (socket) {
      socket.on("get message", () => {
        fetchData();
      });
    }
  }, [profileId]);

  return (
    <MDBContainer
      fluid
      className="py-5"
      style={{ backgroundColor: "black", width: "1000px" }}
    >
      <MDBRow>
        <MDBCol md="12"> 
          <MDBCard id="chat3" style={{ borderRadius: "15px" }}>
            <MDBCardBody>
              <MDBRow>
                <MDBCol md="6" lg="5" xl="4" className="mb-4 mb-md-0">
                  <div className="p-3">
                    <Scrollbars
                      suppressScrollX
                      style={{ position: "relative", height: "400px" }}
                    >
                      <MDBTypography listUnStyled className="mb-0">
                        {otherMessagers
                          ? otherMessagers
                              .filter((message) => message._id !== userInfo._id)
                              .map((messages) => (
                                <li className="p-2 border-bottom">
                                  <a
                                    href="#!"
                                    className="d-flex justify-content-between"
                                  >
                                    <div className="d-flex flex-row">
                                      <div>
                                        <img
                                          src={`../../../${messages.profileImage}`}
                                          alt="avatar"
                                          className="d-flex align-self-center me-3"
                                          style={{
                                            width: "60px",
                                            height: "60px",
                                            borderRadius: "30px",
                                          }}
                                        />
                                      </div>
                                      <div className="pt-1">
                                        <p
                                          className="fw-bold mb-0"
                                          onClick={() => {
                                            getMessages(messages._id);
                                          }}
                                        >
                                          {messages.name}
                                        </p>
                                      </div>
                                    </div>
                                    <div className="pt-1">
                                      <span className="badge bg-danger rounded-pill float-end"></span>
                                    </div>
                                  </a>
                                </li>
                              ))
                          : "No messages"}
                      </MDBTypography>
                    </Scrollbars>
                  </div>
                </MDBCol>
                <MDBCol md="6" lg="7" xl="8">
                  <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
                    <Image
                      style={{
                        borderRadius: "50px",
                        height: "45px",
                        width: "45px",
                        marginRight: "10px",
                      }}
                      name={user?.name}
                      src={`../../../${user?.profileImage}`}
                    />

                    <Link
                      _hover={{ textDecoration: "none", color: "black" }}
                      // onClick={() => {
                      //   userProfile(.user._id);
                      // }}
                    >
                      <Box>
                        <Heading size="sm">{user?.name}</Heading>
                      </Box>
                    </Link>
                  </Flex>
                  <hr />
                  {usermessage ? (
                    <Scrollbars
                      suppressScrollX
                      style={{ position: "relative", height: "400px" }}
                      className="pt-3 pe-3"
                    >
                      {usermessage.map((message) => (
                        <div
                          key={message.id}
                          className={
                            message.receiverId === userInfo._id
                              ? "d-flex flex-row justify-content-start"
                              : "d-flex flex-row justify-content-end"
                          }
                        >
                          {message.receiverId === userInfo._id ? (
                            <>
                              <img
                                src={`../../../${user.profileImage}`}
                                alt="avatar 1"
                                style={{
                                  width: "45px",
                                  height: "45px",
                                  borderRadius: "30px",
                                }}
                              />
                              <div>
                                <p
                                  className="small p-2 ms-3 mb-1 rounded-3"
                                  style={{ backgroundColor: "#f5f6f7" }}
                                >
                                  {message.message}
                                </p>
                                <p className="small ms-3 mb-3 rounded-3 text-muted float-end">
                                  {formatDistance(
                                    message.createdAt,
                                    new Date(),
                                    { addSuffix: true }
                                  )}
                                </p>
                              </div>
                            </>
                          ) : (
                            <>
                              <div>
                                <React.Fragment key={message.id}>
                                  <p className="small p-2 me-3 mb-1 text-white rounded-3 bg-primary">
                                    {message.message}
                                  </p>
                                  <p className="small me-3 mb-3 rounded-3 text-muted">
                                    {formatDistance(
                                      message.createdAt,
                                      new Date(),
                                      { addSuffix: true }
                                    )}
                                  </p>
                                </React.Fragment>
                              </div>

                              <img
                                src={`../../../${message.senderId.profileImage}`}
                                alt="avatar 1"
                                style={{
                                  width: "45px",
                                  height: "45px",
                                  borderRadius: "30px",
                                }}
                              />
                            </>
                          )}
                        </div>
                      ))}
                    </Scrollbars>
                  ) : (
                    <>Start a Chat</>
                  )}

                  <div className="text-muted d-flex justify-content-start align-items-center pe-3 pt-3 mt-2">
                    <img
                      src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava6-bg.webp"
                      alt="avatar 3"
                      style={{ width: "40px", height: "100%" }}
                    />
                    <input
                      type="text"
                      className="form-control form-control-lg"
                      id="exampleFormControlInput2"
                      placeholder="Type message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                    />
                    <a className="ms-3" href="#!">
                      <MDBIcon
                        fas
                        icon="paper-plane"
                        onClick={() => {
                          sendMessage(user._id);
                        }}
                      />
                    </a>
                    <a className="ms-1 text-muted" href="#!">
                      <MDBIcon fas icon="paperclip" />
                    </a>
                  </div>
                </MDBCol>
              </MDBRow>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}
export default MessageScreen;
