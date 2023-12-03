import {
  Box,
  Image,
  Spinner,
  Input,
  Flex,
  Button,
  Text,
} from "@chakra-ui/react";

import "bootstrap-icons/font/bootstrap-icons.css";

import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import { useListPostQuery } from "../../slices/userApiSlice";
import { useCommentMutation } from "../../slices/userApiSlice";

const Hero = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const { data: posts, error, refetch } = useListPostQuery();
  const [postComment] = useCommentMutation();

  const [data, setData] = useState([]);
  const [comment, setComment] = useState(" ");

  useEffect(() => {
    const fetchData = async () => {
      try {
        await refetch();
        setData(posts);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [refetch, data]);

  const submitComment = async (postId) => {
    try {
      if (comment.trim()) {
        const res = await postComment({ comment, userInfo, postId }).unwrap();
        // setComment("");
      }
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
      }}
    >
      {data ? (
        data.map((posts) => (
          <Box
            key={posts._id}
            maxW="xl"
            borderWidth="2.5px"
            borderRadius="lg"
            overflow="hidden"
            // height="580px"
            width="500px"
          >
            <Box px="6" py="2">
              <Box display="flex" alignItems="center">
                <img
                  src={`../../../${posts.userId.profileImage}`}
                  alt=""
                  style={{
                    borderRadius: "50px",
                    height: "35px",
                    width: "35px",
                    marginRight: "10px",
                  }}
                />
                <Box
                  mt="1"
                  fontWeight="semibold"
                  as="h6"
                  lineHeight="tight"
                  noOfLines={1}
                >
                  {posts.userId.name}
                </Box>
              </Box>
            </Box>
            <Box
              style={{
                backgroundColor: "black",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image
                style={{ height: "380px" }}
                src={`../../../${posts.post}`}
                alt=""
              />
            </Box>
            <Box px="6" py="2">
              <Box display="flex" alignItems="center">
                <i
                  class="bi bi-heart"
                  style={{ fontSize: "1.5rem", marginRight: "20px" }}
                ></i>

                <i class="bi bi-chat" style={{ fontSize: "1.5rem" }}></i>
              </Box>
              <hr style={{ margin: "0.8rem 0" }} />

              <Flex>
                <Input
                  id="comment"
                  bg="white"
                  w="100%"
                  p={4}
                  color="black"
                  borderWidth="1px"
                  placeholder="Enter your comment"
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
            </Box>
          </Box>
        ))
      ) : (
        <div>
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
        </div>
      )}
    </div>
  );
};

export default Hero;
