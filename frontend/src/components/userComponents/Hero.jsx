import {
  Box,
  Image,
  Spinner,
  Input,
  Flex,
  Button,
  Text,
  Icon,
  Card,
  CardHeader,
  CardBody,
  Avatar,
  Heading,
  IconButton,
  CardFooter,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Badge
} from "@chakra-ui/react";

import "bootstrap-icons/font/bootstrap-icons.css";
import { FaRegBookmark } from "react-icons/fa";
import { IoIosHeartEmpty } from "react-icons/io";
import { TbDotsCircleHorizontal } from "react-icons/tb";
import { HiDotsVertical } from "react-icons/hi";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import {
  useLikePostMutation,
  useListPostQuery,
  useReportPostMutation,
  useSavePostMutation,
  useCommentMutation,
} from "../../slices/userApiSlice";
import { toast } from "react-toastify";

const Hero = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const { data: posts, error, refetch } = useListPostQuery();
  const [postComment] = useCommentMutation();
  const [savePosts] = useSavePostMutation();
  const [like] = useLikePostMutation();
  const [report] = useReportPostMutation();
  const [data, setData] = useState([]);
  const [comment, setComment] = useState(" ");
  const [save, setSave] = useState(" ");

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       await refetch();
  //       setData(posts);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };
  //   fetchData();
  // }, [refetch, data]);

  const submitComment = async (postId) => {
    try {
      if (comment.trim()) {
        const res = await postComment({ comment, userInfo, postId }).unwrap();
        setComment(" ");
        refetch();
      }
    } catch (err) {
      console.log(err);
    }
  };

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
      refetch();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    setSave(() => savePost);
  }, [savePost]);

  const reportHandler = async (postId) => {
    try {debugger
     
      const res = await report({ userInfo, postId }).unwrap();
      refetch();
      toast.success("Reported successfully");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "20px",
        // width: "600px",
      }}
    >
      {posts ? (
        posts.map((posts) => (
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

                  <Box>
                    <Heading size="sm">{posts.userId.name}</Heading>
                  </Box>
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
            />

            <CardBody>
              {posts.bio && <Text>{posts.bio}</Text>}
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

                <i class="bi bi-chat" style={{ fontSize: "1.5rem" }}></i>
                <i
                  class="bi bi-bookmark"
                  style={{ fontSize: "1.5rem" }}
                  onClick={() => {
                    savePost(posts._id);
                  }}
                ></i>
              </Box>
            </CardBody>

            {/* <CardFooter
              justify="space-between"
              flexWrap="wrap"
              sx={{
                "& > button": {
                  minW: "136px",
                },
              }}
            ></CardFooter> */}
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
                onChange={(e) => setComment(e.target.value)}
              />
              <Button
                type="submit"
                colorScheme="blue"
                ml={2}
                onClick={() => {
                  submitComment(posts._id);
                }}
              >
                Post
              </Button>
            </Flex>
            <Text style={{ marginTop: "10px", marginBottom: "3px" }}>
              {comment.text}
            </Text>
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
      
    </div>
  );
};

export default Hero;
