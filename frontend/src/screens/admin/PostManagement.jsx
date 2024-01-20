import {
  Card,
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
} from "@chakra-ui/react";
import {} from "@chakra-ui/react";
import { FaTrashAlt } from "react-icons/fa";
import {
  useGetPostQuery,
  usePostDeleteMutation,
} from "../../slices/adminApiSlice";

import { useDisclosure } from "@chakra-ui/react";
import { useState } from "react";

const PostManagement = () => {
  const [deletePost, setDeletePost] = useState("");
  const [remove] = usePostDeleteMutation();

  const { data: posts, error, refetch } = useGetPostQuery();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const removePost = async (postId) => {
    try {
      const res = await remove({ postId }).unwrap();
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
          <Card
            key={posts._id}
            w="lg"
            style={{ borderRadius: "20px", boxShadow: "none" }}
          >
            <CardHeader>
              <Flex spacing="4">
                <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
                  {/* <Image
                      style={{
                        borderRadius: "50px",
                        height: "35px",
                        width: "35px",
                        marginRight: "10px",
                      }}
                      
                      name={posts.userData.name}
                      src={`../../../${posts.userData.profileImage}`}
                    /> */}

                  <Box>
                    <Heading size="sm">{posts.userData.name}</Heading>
                  </Box>
                </Flex>

                <Button
                  as={IconButton}
                  variant="ghost"
                  colorScheme="white"
                  aria-label="See menu"
                  icon={<FaTrashAlt />}
                  onClick={() => {
                    setDeletePost(posts._id), onOpen();
                  }}
                />
              </Flex>
            </CardHeader>

            <Image
              style={{ height: "400px", margin: "0 10px" }}
              objectFit="cover"
              borderRadius="10px"
              src={`Posts/${posts.post}`}
              alt=""
            />
            <CardFooter></CardFooter>
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
      {deletePost && (
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
                  removePost(deletePost);
                  {onClose()}
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
export default PostManagement;
