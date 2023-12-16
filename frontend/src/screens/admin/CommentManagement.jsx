import React, { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  IconButton,
  Box,
  Flex,
  CardHeader,
  CardFooter,
  Heading,
  Image,
  Button,
  Spinner,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalCloseButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { FaTrashAlt } from "react-icons/fa";
import { useDisclosure } from "@chakra-ui/react";
import axios from "axios";

const CommentManagement = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [posts, setPosts] = useState("");
  const [deleteComment, setDeleteComment] = useState("");

  const fetchData = async () => {
    try {
      const res = await axios.get("/api/admin/getComment");
      setPosts(res.data);
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const removeComment = async (commentId) => {
    try {
 
      
      const res = await axios.delete(`/api/admin/deleteComment?_id=${commentId}`);
     
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
        width: "600px",
      }}
    >
      {posts ? (
        posts.map((posts) => (
          <Card w="lg" style={{ borderRadius: "20px", boxShadow: "none" }}>
            <CardHeader>             
            </CardHeader>

            <Image
              style={{ height: "400px", margin: "0 10px" }}
              objectFit="cover"
              borderRadius="10px"
              src={`../../../${posts.postData.post}`}
              alt=""
            />

            <CardFooter
              justify="space-between"
              flexWrap="wrap"
              sx={{
                "& > button": {
                  minW: "136px",
                },
              }}
            >
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
                    {posts.userData.name}
                  </div>
                  <div
                    style={{
                      marginLeft: "10px",
                      fontSize: "13px",
                      fontWeight: "normal",
                    }}
                  >
                    {posts.comment}
                  </div>
                </Flex>
                <Button
                  as={IconButton}
                  variant="ghost"
                  colorScheme="white"
                  aria-label="See menu"
                  icon={<FaTrashAlt />}
                  onClick={() => {
                    setDeleteComment(posts._id), onOpen();
                  }}
                />
              </Flex>
            </CardFooter>
         
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
      {deleteComment && (
        <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Are you sure you want to delete the post?</ModalHeader>
            <ModalCloseButton />

            <ModalFooter>
              <Button
                colorScheme="blue"
                mr={3}
                onClick={() => {
                  removeComment(deleteComment);
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
    </div>
  );
};

export default CommentManagement;
