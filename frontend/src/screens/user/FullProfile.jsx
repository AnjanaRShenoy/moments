import React, { useEffect, useState } from "react";
import {
  Box,
  Image,
  Spinner,
  Input,
  Flex,
  Button,
  Text,
  Card,
  CardHeader,
  CardBody,
  Heading,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalFooter,
} from "@chakra-ui/react";
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBTypography,
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
} from "mdb-react-ui-kit";
import { FaTrashAlt } from "react-icons/fa";
import { useSelector } from "react-redux";
import { HiDotsVertical } from "react-icons/hi";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  useCommentMutation,
  useDeleteCommentMutation,
  useDeletePostMutation,
  useReportCommentMutation,
} from "../../slices/userApiSlice";
import { toast } from "react-toastify";
import { useDisclosure } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const FullProfile = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const _id = userInfo._id;
  const [user, setUser] = useState();
  const [post, setPost] = useState();
  const [followers, setFollowers] = useState("");
  const [followings, setFollowings] = useState("");
  const [postCount, setPostCount] = useState();
  const [selectedPost, setSelectedPost] = useState("");
  const [centredModal, setCentredModal] = useState(false);
  const [deletePost, setDeletePost] = useState("");
  const [comment, setComment] = useState(" ");
  const [commentData, setCommentData] = useState("");
  const [postComment] = useCommentMutation();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const fetchData = async () => {
    try {
      const response = await axios.get(`/api/users/getFullProfile?_id=${_id}`);

      setUser(response.data.user[0]);
      setPost(response.data.post);
      setFollowers(response.data.followers);
      setFollowings(response.data.followings);
      setPostCount(response.data.postCount);
      setCommentData(response.data.comments);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const toggleOpen = (postId) => {
    setSelectedPost(postId);
    setCentredModal(!centredModal);
  };

  const submitComment = async (postId) => {
    try {
      debugger;
      if (comment.trim()) {
        const res = await postComment({ comment, userInfo, postId }).unwrap();
        setComment("");
        fetchData();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const [deleteComment] = useDeleteCommentMutation();
  const commentDeleteHandler = async (commentId) => {
    debugger;
    try {
      const res = await deleteComment({ commentId }).unwrap();
      fetchData();
    } catch (err) {
      console.log(err);
    }
  };

  const [reportComment] = useReportCommentMutation();
  const commentReportHandler = async (commentId) => {
    try {
      debugger;
      const res = await reportComment({ commentId, userInfo }).unwrap();
      fetchData();
      toast.success("Reported successfully");
    } catch (err) {
      console.log(err);
    }
  };
  const [removePos] = useDeletePostMutation();
  const removePost = async (postId) => {
    try {
      const res = await removePos({ postId }).unwrap();
      fetchData();
      toast.success("Removed the post successfully")
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="gradient-custom-2">
      <MDBContainer className="py-5 h-100">
        <MDBRow
          className="justify-content-center align-items-center h-100"
          style={{ minWidth: "1200px" }}
        >
          <MDBCol lg="9" xl="7">
            {user ? (
              <MDBCard>
                <div
                  className="rounded-top text-white d-flex flex-row"
                  style={{ backgroundColor: "#000", height: "200px" }}
                >
                  <div
                    className="ms-4 mt-5 d-flex flex-column"
                    style={{ width: "150px" }}
                  >
                    <MDBCardImage
                      src={`../../../${user?.profileImage}`}
                      alt="Generic placeholder image"
                      className="mt-4 mb-2 img-thumbnail"
                      fluid
                      style={{ width: "150px", zIndex: "1" }}
                    />
                    <MDBBtn
                      outline
                      color="dark"
                      style={{ height: "36px", overflow: "visible" }}
                    >
                      <Link to="/profile">Edit profile</Link>
                    </MDBBtn>
                  </div>
                  <div className="ms-3" style={{ marginTop: "130px" }}>
                    <MDBTypography tag="h5">{user.name}</MDBTypography>
                  </div>
                </div>

                <div
                  className="p-4 text-black"
                  style={{ backgroundColor: "#f8f9fa" }}
                >
                  <div className="d-flex justify-content-end text-center py-1">
                    <div>
                      <MDBCardText className="mb-1 h5">{postCount}</MDBCardText>
                      <MDBCardText className="small text-muted mb-0">
                        Photos
                      </MDBCardText>
                    </div>
                    <div className="px-3">
                      <MDBCardText className="mb-1 h5">{followers}</MDBCardText>
                      <MDBCardText className="small text-muted mb-0">
                        Followers
                      </MDBCardText>
                    </div>
                    <div>
                      <MDBCardText className="mb-1 h5">
                        {followings}
                      </MDBCardText>
                      <MDBCardText className="small text-muted mb-0">
                        Following
                      </MDBCardText>
                    </div>
                  </div>
                </div>
                <MDBCardBody className="text-black p-4">
                  <div className="mb-5">
                    <p className="lead fw-normal mb-1">About</p>
                    <div className="p-4" style={{ backgroundColor: "#f8f9fa" }}>
                      <MDBCardText className="font-italic mb-1">
                        {user.bio}
                      </MDBCardText>
                    </div>
                  </div>
                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <MDBCardText className="lead fw-normal mb-0">
                      Posts
                    </MDBCardText>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      flexWrap: "wrap",
                      gap: "15px",
                    }}
                  >
                    {post.length > 0 ? (
                      post.map((post) => (
                        <MDBCardImage
                          src={`../../../${post.post}`}
                          alt="image 1"
                          // className="w-100 rounded-3"
                          onClick={() => toggleOpen(post._id)}
                          style={{
                            objectFit: "cover",
                            minHeight: "180px",
                            minWidth: "180px",
                            maxHeight: "180px",
                            maxWidth: "180px",
                          }}
                        />
                      ))
                    ) : (
                      <div>No Posts</div>
                    )}
                    <div style={{ width: "180px" }}></div>
                    <div style={{ width: "180px" }}></div>
                    <div style={{ width: "180px" }}></div>
                    <div style={{ width: "180px" }}></div>
                  </div>
                </MDBCardBody>
              </MDBCard>
            ) : (
              <div>User not found</div>
            )}
          </MDBCol>
        </MDBRow>
      </MDBContainer>
      <MDBModal tabIndex="-1" open={centredModal} setOpen={setCentredModal}>
        {selectedPost ? (
          post
            .filter((p) => selectedPost === p._id)
            .map((filteredPost) => (
              <div key={filteredPost._id}>
                <MDBModalDialog centered>
                  <MDBModalContent>
                    <MDBModalHeader>
                      <MDBModalTitle size="sm">
                        {filteredPost.userId.name}
                      </MDBModalTitle>
                      <Button
                        as={IconButton}
                        variant="ghost"
                        colorScheme="white"
                        aria-label="See menu"
                        icon={<FaTrashAlt />}
                        onClick={() => {
                          setDeletePost(filteredPost._id), onOpen();
                        }}
                      />
                      <MDBBtn
                        className="btn-close"
                        color="none"
                        onClick={toggleOpen}
                      ></MDBBtn>
                    </MDBModalHeader>
                    <MDBModalBody>
                      <Flex>
                        <Image
                          style={{
                            height: "400px",
                            width: "100%",
                            margin: "0",
                          }}
                          objectFit="cover"
                          borderRadius="10px"
                          src={`../../../${filteredPost.post}`}
                        />
                      </Flex>
                    </MDBModalBody>
                    <MDBModalFooter style={{ flexDirection: "column" }}>
                      <Flex>
                        <Input
                          id="comment"
                          bg="white"
                          w={96}
                          p={4}
                          color="black"
                          borderWidth="1px"
                          placeholder="Enter your comment"
                          value={comment}
                          marginLeft="15px"
                          onChange={(e) => setComment(e.target.value)}
                        />
                        <Button
                          type="submit"
                          colorScheme="blue"
                          ml={2}
                          onClick={() => {
                            submitComment(filteredPost._id);
                          }}
                        >
                          Post
                        </Button>
                      </Flex>
                      <Flex>
                        {commentData &&
                        commentData.filter(
                          (commen) => commen.postId === filteredPost._id
                        ).length > 0 ? (
                          <div style={{ marginBottom: "15px" }}>
                            {commentData
                              .filter(
                                (commen) => commen.postId === filteredPost._id
                              )

                              .map((commen) => (
                                <div key={commen._id}>
                                  <Flex
                                    w={96}
                                    style={{
                                      alignItems: "center",
                                      justifyContent: "space-between",
                                    }}
                                  >
                                    <Flex style={{ alignItems: "baseline" }}>
                                      <div
                                        style={{
                                          marginLeft: "20px",
                                          fontSize: "15px",
                                          fontWeight: "bold",
                                        }}
                                      >
                                        {commen.userId.name}
                                      </div>
                                      <div
                                        style={{
                                          marginLeft: "10px",
                                          fontSize: "13px",
                                          fontWeight: "normal",
                                        }}
                                      >
                                        {commen.comment}
                                      </div>
                                    </Flex>
                                    <Menu>
                                      <MenuButton
                                        as={IconButton}
                                        variant="ghost"
                                        colorScheme="gray"
                                        aria-label="See menu"
                                        icon={<HiDotsVertical />}
                                      />
                                      {commen.userId._id === userInfo._id ? (
                                        <MenuList>
                                          <MenuItem
                                            onClick={() =>
                                              commentDeleteHandler(commen._id)
                                            }
                                          >
                                            Delete
                                          </MenuItem>
                                        </MenuList>
                                      ) : (
                                        <MenuList>
                                          <MenuItem
                                            onClick={() =>
                                              commentReportHandler(commen._id)
                                            }
                                          >
                                            Report
                                          </MenuItem>
                                        </MenuList>
                                      )}
                                    </Menu>
                                  </Flex>
                                </div>
                              ))}
                          </div>
                        ) : null}
                      </Flex>
                    </MDBModalFooter>
                  </MDBModalContent>
                </MDBModalDialog>
              </div>
            ))
        ) : (
          <div>null</div>
        )}
        {deletePost && (
          <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>
                Are you sure you want to delete the post?
              </ModalHeader>
              <ModalCloseButton />

              <ModalFooter>
                <Button
                  colorScheme="blue"
                  mr={3}
                  onClick={() => {
                    removePost(deletePost);
                    onClose();
                  }}
                >
                  Yes
                </Button>
                <Button onClick={onClose}>No</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        )}
      </MDBModal>
    </div>
  );
};
export default FullProfile;
