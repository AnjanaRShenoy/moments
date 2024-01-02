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
  Link,
} from "@chakra-ui/react";
import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
} from "mdb-react-ui-kit";

import "bootstrap-icons/font/bootstrap-icons.css";
import { HiDotsVertical } from "react-icons/hi";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  useLikePostMutation,
  useListPostQuery,
  useReportPostMutation,
  useSavePostMutation,
  useCommentMutation,
  useFollowMutation,
  useReportCommentMutation,
  useEditCommentMutation,
  useDeleteCommentMutation,
  useRequestMutation,
  useUnfollowMutation,
  useChatMutation,
} from "../../slices/userApiSlice";
import { toast } from "react-toastify";
import io from "socket.io-client";

import { useNavigate } from "react-router-dom";
const ENDPOINT = "http://localhost:5000";
var socket, selectedChatCompare;

const Hero = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const {
    data: posts,
    error,
    refetch,
  } = useListPostQuery({ _id: userInfo._id });

  const [postComment] = useCommentMutation();
  const [savePosts] = useSavePostMutation();
  const [like] = useLikePostMutation();
  const [report] = useReportPostMutation();

  const [reportComment] = useReportCommentMutation();
  const [data, setData] = useState([]);
  const [comment, setComment] = useState(" ");
  const [requested, setRequested] = useState(" ");
  const [save, setSave] = useState(" ");
  const [post, setPost] = useState("");
  const [commentData, setCommentData] = useState("");
  const [user, setUser] = useState("");
  const [following, setFollowing] = useState("");
  const [otherPosts, setOtherPosts] = useState("");
  const [selectedPost, setSelectedPost] = useState("");
  const [scrollableModal, setScrollableModal] = useState(false);
  const [userid, setuserid] = useState("");

  useEffect(() => {
    if (posts) {
      setPost(posts.posts);
    }
  }, [posts]);

  useEffect(() => {
    socket = io(ENDPOINT);
  }, []);

  useEffect(() => {
    if (posts) {
      setRequested(posts.request);
      console.log(posts.request);
    }
  }, [posts]);

  useEffect(() => {
    if (posts) {
      setOtherPosts(posts.otherPosts);
    }
  }, [posts]);

  useEffect(() => {
    if (posts) {
      setCommentData(posts.comments);
    }
  }, [posts]);

  useEffect(() => {
    if (posts) {
      setUser(posts.userData);
    }
  }, [posts]);

  useEffect(() => {
    if (posts) {
      setFollowing(posts.follow);
    }
  }, [posts]);

  useEffect(() => {
    refetch();
  }, [refetch, data]);



  const submitComment = async (postId,userid) => {
    try {
      debugger
      if (comment.trim()) {
        const res = await postComment({ comment, userInfo, postId, userid }).unwrap();
       
        setComment("");
        refetch();
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    socket = io(ENDPOINT);
  }, []);

  useEffect(() => {    
    if (socket) {
      socket.on("get notification", (get) => {
        console.log(get);
      });
    }
  }, []);

  const savePost = async (postId) => {
    try {
      const res = await savePosts({ userInfo, postId }).unwrap();
      refetch();
    } catch (err) {
      console.log(err);
    }
  };

  const likePost = async (postId) => {
    try {
      const res = await like({ userInfo, postId }).unwrap();
      socket.emit("join chat", postId);
      refetch();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    setSave(() => savePost);
  }, [savePost]);

  const reportHandler = async (postId) => {
    try {
      debugger;

      const res = await report({ userInfo, postId }).unwrap();
      refetch();
      toast.success("Reported successfully");
    } catch (err) {
      console.log(err);
    }
  };

  // const [editComment] = useEditCommentMutation();
  // const commentEditHandler = async (commentId) => {
  //   try {
  //     const res = await editComment({ commentId }).unwrap();
  //     refetch();
  //     console.log(res, "rescomment");
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };
  const commentReportHandler = async (commentId) => {
    try {
      const res = await reportComment({ commentId, userInfo }).unwrap();

      refetch();
      toast.success("Reported successfully");
    } catch (err) {
      console.log(err);
    }
  };

  const [deleteComment] = useDeleteCommentMutation();
  const commentDeleteHandler = async (commentId) => {
    debugger;
    try {
      const res = await deleteComment({ commentId }).unwrap();

      refetch();
    } catch (err) {
      console.log(err);
    }
  };

  const [request] = useRequestMutation();
  const requestUser = async (userI) => {
    try {
      debugger;
      const userId = userI._id;
      const res = await request({ userInfo, userId }).unwrap();
      refetch();
    } catch (err) {
      console.log(err);
    }
  };

  const [unfollow] = useUnfollowMutation();
  const unfollowUser = async (userI) => {
    try {
      debugger;
      const userId = userI._id;

      const res = await unfollow({ userInfo, userId }).unwrap();
      refetch();
    } catch (err) {
      console.log(err);
    }
  };

  const navigate = useNavigate();

  const userProfile = async (profileId) => {
    try {
      navigate(`/userProfile/${profileId}`);
    } catch (err) {
      console.log(err);
    }
  };
  // const [chat]=useChatMutation()
  //   const sendMessage = async (userId) => {
  //     try {
  //       const res = await chat({ userId }).unwrap();
  //       res.navigate("/message")

  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };

  const sendMessage = async (profileId) => {
    try {
      debugger;
      navigate(`/messages/${profileId}`);
    } catch (err) {
      console.log(err);
    }
  };
  const [centredModal, setCentredModal] = useState(false);

  const toggleOpen = (postId) => {
    setSelectedPost(postId);
    setCentredModal(!centredModal);
    console.log(postId);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "20px",
      }}
    >
      {post ? (
        post.map((posts) => (
          <Card
            key={posts._id}
            w="lg"
            style={{ borderRadius: "20px", boxShadow: "none" }}
          >
            <CardHeader>
              <Flex spacing="4">
                <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
                  <Image
                    style={{
                      borderRadius: "50px",
                      height: "35px",
                      width: "35px",
                      marginRight: "10px",
                    }}
                    name={posts.userId.name}
                    src={`../../../${posts.userId.profileImage}`}
                  />

                  <Link
                    _hover={{ textDecoration: "none", color: "black" }}
                    onClick={() => {
                      userProfile(posts.userId._id);
                    }}
                  >
                    <Box>
                      <Heading size="sm">{posts.userId.name}</Heading>
                    </Box>
                  </Link>

                  {requested &&
                  requested.some(
                    (request) => request.receiver === posts.userId._id
                  ) ? (
                    <Button
                      colorScheme="teal"
                      variant="outline"
                      style={{ height: "25px" }}
                      onClick={() => requestUser(posts.userId)}
                    >
                      Requested
                    </Button>
                  ) : following &&
                    following.following.find(
                      (follow) => follow === posts.userId._id
                    ) ? (
                    <Button
                      colorScheme="teal"
                      variant="outline"
                      style={{ height: "25px" }}
                      onClick={() => unfollowUser(posts.userId)}
                    >
                      Following
                    </Button>
                  ) : (
                    <Button
                      colorScheme="teal"
                      variant="outline"
                      style={{ height: "25px" }}
                      onClick={() => requestUser(posts.userId)}
                    >
                      Follow
                    </Button>
                  )}
                </Flex>
                <Menu placement="bottom-end">
                  <MenuButton
                    as={IconButton}
                    variant="ghost"
                    colorScheme="gray"
                    aria-label="See menu"
                    icon={<HiDotsVertical />}
                  />

                  <MenuList>
                    <MenuItem onClick={() => reportHandler(posts._id)}>
                      Report
                    </MenuItem>
                  </MenuList>
                </Menu>
              </Flex>
            </CardHeader>
            <Image
              style={{ height: "400px", margin: "0 10px" }}
              objectFit="cover"
              borderRadius="10px"
              src={`../../../${posts.post}`}
              alt=""
              onClick={() => toggleOpen(posts._id)}
            />
            <CardBody>
              <Text>{posts.caption}</Text>
              <Box
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-around",
                }}
              >
                {posts.like &&
                posts.like.find((user) => user.userId === userInfo._id) ? (
                  <i
                    class="bi bi-emoji-heart-eyes-fill"
                    style={{ fontSize: "1.5rem" }}
                    onClick={() => {
                      likePost(posts._id);
                    }}
                  ></i>
                ) : (
                  <i
                    class="bi bi-heart"
                    style={{ fontSize: "1.5rem" }}
                    onClick={() => {
                      likePost(posts._id);
                    }}
                  ></i>
                )}

                <i
                  class="bi bi-send"
                  style={{ fontSize: "1.5rem" }}
                  onClick={() => {
                    sendMessage(posts.userId._id);
                  }}
                ></i>

                {user.savedPost &&
                user.savedPost.find((save) => save === posts._id) ? (
                  <i
                    class="bi bi-bookmark-check-fill"
                    style={{ fontSize: "1.5rem" }}
                    onClick={() => {
                      savePost(posts._id);
                    }}
                  ></i>
                ) : (
                  <i
                    class="bi bi-bookmark"
                    style={{ fontSize: "1.5rem" }}
                    onClick={() => {
                      savePost(posts._id);
                    }}
                  ></i>
                )}
              </Box>
            </CardBody>

            <Flex>
              <Input
                id="comment"
                bg="white"
                w="100%"
                p={4}
                color="black"
                borderWidth="1px"
                placeholder="Enter your comment"
                width="80%"
                marginLeft="15px"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
              <Button
                type="submit"
                colorScheme="blue"
                ml={2}
                onClick={() => {
                  submitComment(posts._id,posts.userId._id);
                }}
              >
                Post
              </Button>
            </Flex>
            <Text style={{ marginTop: "10px", marginBottom: "15px" }}>
              {comment.text}
            </Text>

            {commentData &&
            commentData.filter((commen) => commen.postId === posts._id).length >
              0 ? (
              <div style={{ marginBottom: "15px" }}>
                {commentData
                  .filter((commen) => commen.postId === posts._id)
                  .slice(-2)
                  .map((commen) => (
                    <div key={commen._id}>
                      <Flex
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
                              {/* <MenuItem
                                onClick={() => commentEditHandler(commen._id)}
                              >
                                Edit
                              </MenuItem> */}
                              <MenuItem
                                onClick={() => commentDeleteHandler(commen._id)}
                              >
                                Delete
                              </MenuItem>
                            </MenuList>
                          ) : (
                            <MenuList>
                              <MenuItem
                                onClick={() => commentReportHandler(commen._id)}
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
          </Card>
        ))
      ) : (
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
      )}
      {/* show Post modal */}
      <div style={{ color: "white" }}>-----Other Posts-----</div>
      {otherPosts ? (
        otherPosts.map((posts) => (
          <Card
            key={posts._id}
            w="lg"
            style={{ borderRadius: "20px", boxShadow: "none" }}
          >
            <CardHeader>
              <Flex spacing="4">
                <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
                  <Image
                    style={{
                      borderRadius: "50px",
                      height: "35px",
                      width: "35px",
                      marginRight: "10px",
                    }}
                    name={posts.userId.name}
                    src={`../../../${posts.userId.profileImage}`}
                  />

                  <Link
                    _hover={{ textDecoration: "none", color: "black" }}
                    onClick={() => {
                      userProfile(posts.userId._id);
                    }}
                  >
                    <Box>
                      <Heading size="sm">{posts.userId.name}</Heading>
                    </Box>
                  </Link>

                  {requested && requested === posts.userId._id ? (
                    <Button
                      colorScheme="teal"
                      variant="outline"
                      style={{ height: "25px" }}
                      onClick={() => requestUser(posts.userId)}
                    >
                      Requested
                    </Button>
                  ) : following &&
                    following.following.find(
                      (follow) => follow === posts.userId._id
                    ) ? (
                    <Button
                      colorScheme="teal"
                      variant="outline"
                      style={{ height: "25px" }}
                      onClick={() => unfollowUser(posts.userId)}
                    >
                      Following
                    </Button>
                  ) : (
                    <Button
                      colorScheme="teal"
                      variant="outline"
                      style={{ height: "25px" }}
                      onClick={() => requestUser(posts.userId)}
                    >
                      Follow
                    </Button>
                  )}
                </Flex>
                <Menu placement="bottom-end">
                  <MenuButton
                    as={IconButton}
                    variant="ghost"
                    colorScheme="gray"
                    aria-label="See menu"
                    icon={<HiDotsVertical />}
                  />

                  <MenuList>
                    <MenuItem onClick={() => reportHandler(posts._id)}>
                      Report
                    </MenuItem>
                  </MenuList>
                </Menu>
              </Flex>
            </CardHeader>
            <Image
              style={{ height: "400px", margin: "0 10px" }}
              objectFit="cover"
              borderRadius="10px"
              src={`../../../${posts.post}`}
              alt=""
              onClick={() => toggleOpen(posts._id)}
            />
            <CardBody>
              <Text>{posts.caption}</Text>
              <Box
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-around",
                }}
              >
                {posts.like &&
                posts.like.find((user) => user.userId === userInfo._id) ? (
                  <i
                    class="bi bi-emoji-heart-eyes-fill"
                    style={{ fontSize: "1.5rem" }}
                    onClick={() => {
                      likePost(posts._id);
                    }}
                  ></i>
                ) : (
                  <i
                    class="bi bi-heart"
                    style={{ fontSize: "1.5rem" }}
                    onClick={() => {
                      likePost(posts._id);
                    }}
                  ></i>
                )}

                <i
                  class="bi bi-send"
                  style={{ fontSize: "1.5rem" }}
                  onClick={() => {
                    sendMessage(posts.userId._id);
                  }}
                ></i>

                {user.savedPost &&
                user.savedPost.find((save) => save === posts._id) ? (
                  <i
                    class="bi bi-bookmark-check-fill"
                    style={{ fontSize: "1.5rem" }}
                    onClick={() => {
                      savePost(posts._id);
                    }}
                  ></i>
                ) : (
                  <i
                    class="bi bi-bookmark"
                    style={{ fontSize: "1.5rem" }}
                    onClick={() => {
                      savePost(posts._id);
                    }}
                  ></i>
                )}
              </Box>
            </CardBody>

            <Flex>
              <Input
                id="comment"
                bg="white"
                w="100%"
                p={4}
                color="black"
                borderWidth="1px"
                placeholder="Enter your comment"
                width="80%"
                marginLeft="15px"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
              <Button
                type="submit"
                colorScheme="blue"
                ml={2}
                onClick={() => {
                  submitComment(posts._id,posts.userId._id);
                }}
              >
                Post
              </Button>
            </Flex>
            <Text style={{ marginTop: "10px", marginBottom: "15px" }}>
              {comment.text}
            </Text>

            {commentData &&
            commentData.filter((commen) => commen.postId === posts._id).length >
              0 ? (
              <div style={{ marginBottom: "15px" }}>
                {commentData
                  .filter((commen) => commen.postId === posts._id)
                  .slice(-2)
                  .map((commen) => (
                    <div key={commen._id}>
                      <Flex
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
                              {/* <MenuItem
                                onClick={() => commentEditHandler(commen._id)}
                              >
                                Edit
                              </MenuItem> */}
                              <MenuItem
                                onClick={() => commentDeleteHandler(commen._id)}
                              >
                                Delete
                              </MenuItem>
                            </MenuList>
                          ) : (
                            <MenuList>
                              <MenuItem
                                onClick={() => commentReportHandler(commen._id)}
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
          </Card>
        ))
      ) : (
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
      )}
      <MDBModal open={centredModal} setOpen={setCentredModal} tabIndex="-1">
        {selectedPost ? (
          post
            .filter((p) => selectedPost === p._id)
            .map((filteredPost) => (
              <MDBModalDialog scrollable>
                <MDBModalContent>
                  <MDBModalHeader>
                    <MDBModalTitle>{filteredPost.userId.name}</MDBModalTitle>
                    <MDBBtn
                      className="btn-close"
                      color="none"
                      onClick={toggleOpen}
                    ></MDBBtn>
                  </MDBModalHeader>
                  <MDBModalBody>
                    <Image
                      style={{ height: "400px", width: "100%", margin: "0" }}
                      objectFit="cover"
                      borderRadius="10px"
                      src={`../../../${filteredPost.post}`}
                    />
                    <Flex marginTop="15px" marginBottom="15px">
                      <Input
                        id="comment"
                        bg="white"
                        w="100%"
                        p={4}
                        color="black"
                        borderWidth="1px"
                        placeholder="Enter your comment"
                        width="80%"
                        marginLeft="15px"
                        value={comment}
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
                                          commentEditHandler(commen._id)
                                        }
                                      >
                                        Edit
                                      </MenuItem>
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
                  </MDBModalBody>
                </MDBModalContent>
              </MDBModalDialog>
            ))
        ) : (
          <div>null</div>
        )}
      </MDBModal>
    </div>
  );
};

export default Hero;
