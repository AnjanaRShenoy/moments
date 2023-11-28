import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import { Flex } from "@chakra-ui/react";

const CreateScreen = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button onClick={onOpen}>Create new Post</Button>

      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader style={{align:"center", justify:"center"}}>Create new post</ModalHeader>
          <img src="https://www.techsmith.com/blog/wp-content/uploads/2022/03/resize-image.png" alt="" />
          <ModalCloseButton />
          <Flex height="10vh" align="end" justify="center">
          <Button colorScheme='blue' style={{width:"180px"}} >Select from device</Button>
          </Flex>
          <ModalFooter>
            
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreateScreen;
