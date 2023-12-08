import {
  Card,
  Text,
  IconButton,
  Avatar,
  Box,
  Flex,
  CardHeader,
  CardBody,
  CardFooter,
  Heading,
  Image,
  Button,
  Menu,
  MenuButton,
  MenuList,
  Spinner,
  MenuItem,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import {} from "@chakra-ui/react";
import { FaTrashAlt } from "react-icons/fa";
import {
  useGetPostQuery,
  usePostDeleteMutation,
} from "../../slices/adminApiSlice";

import { useDisclosure } from "@chakra-ui/react";

const PostManagement = () => {
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
              </Flex>
            </CardHeader>

            <Image
              style={{ height: "400px", margin: "0 10px" }}
              objectFit="cover"
              borderRadius="10px"
              src={`../../../${posts.post}`}
              alt=""
            />

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
    </div>
  );
};
export default PostManagement;
