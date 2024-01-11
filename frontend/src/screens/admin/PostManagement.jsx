import {
  Card,
<<<<<<< HEAD
  Text,
  IconButton,
  Avatar,
  Box,
  Flex,
  CardHeader,
  CardBody,
=======
  IconButton,
  Box,
  Flex,
  CardHeader,
>>>>>>> 2d77eba291877a20fe0877d73a93a06c2f0fc125
  CardFooter,
  Heading,
  Image,
  Button,
<<<<<<< HEAD
  Menu,
  MenuButton,
  MenuList,
  Spinner,
  MenuItem,
  Input,
=======
  Spinner,
>>>>>>> 2d77eba291877a20fe0877d73a93a06c2f0fc125
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
<<<<<<< HEAD
  ModalBody,
=======
>>>>>>> 2d77eba291877a20fe0877d73a93a06c2f0fc125
  ModalCloseButton,
} from "@chakra-ui/react";
import {} from "@chakra-ui/react";
import { FaTrashAlt } from "react-icons/fa";
import {
  useGetPostQuery,
  usePostDeleteMutation,
} from "../../slices/adminApiSlice";

import { useDisclosure } from "@chakra-ui/react";
<<<<<<< HEAD

const PostManagement = () => {
  const [remove] = usePostDeleteMutation();
=======
import { useState } from "react";

const PostManagement = () => {
  const [deletePost, setDeletePost] = useState("");
  const [remove] = usePostDeleteMutation();

>>>>>>> 2d77eba291877a20fe0877d73a93a06c2f0fc125
  const { data: posts, error, refetch } = useGetPostQuery();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const removePost = async (postId) => {
    try {
<<<<<<< HEAD
       
=======
>>>>>>> 2d77eba291877a20fe0877d73a93a06c2f0fc125
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
<<<<<<< HEAD
          
                  <Image
                    style={{
                      borderRadius: "50px",
                      height: "35px",
                      width: "35px",
                      marginRight: "10px",
                    }}
                    
                    name={posts.userData.name}
                    src={`../../../${posts.userData.profileImage}`}
                  />
=======
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
>>>>>>> 2d77eba291877a20fe0877d73a93a06c2f0fc125

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
<<<<<<< HEAD
                  onClick={onOpen}
                />

                <Modal
                  closeOnOverlayClick={false}
                  isOpen={isOpen}
                  onClose={onClose}
                >
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
                        onClick={() => removePost(posts._id)}                        
                      >
                        Yes
                      </Button>
                      <Button onClick={onClose}>No</Button>
                    </ModalFooter>
                  </ModalContent>
                </Modal>
=======
                  onClick={() => {
                    setDeletePost(posts._id), onOpen();
                  }}
                />
>>>>>>> 2d77eba291877a20fe0877d73a93a06c2f0fc125
              </Flex>
            </CardHeader>

            <Image
              style={{ height: "400px", margin: "0 10px" }}
              objectFit="cover"
              borderRadius="10px"
              src={`../../../${posts.post}`}
              alt=""
            />
<<<<<<< HEAD

            {/* <CardBody>
              {posts.bio && <Text>{posts.bio}</Text>}
              <Box
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-around",
                }}
              >
                {posts.like.find((user) => user.userId === userInfo._id) ? (
                  <i
                    class="bi bi-emoji-heart-eyes-fill"
                    style={{ fontSize: "1.5rem"}}
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
            </CardBody> */}

            {/* <CardFooter
              justify="space-between"
              flexWrap="wrap"
              sx={{
                "& > button": {
                  minW: "136px",
                },
              }}
            ></CardFooter> */}
=======
>>>>>>> 2d77eba291877a20fe0877d73a93a06c2f0fc125
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
<<<<<<< HEAD
=======
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
>>>>>>> 2d77eba291877a20fe0877d73a93a06c2f0fc125
    </div>
  );
};
export default PostManagement;
