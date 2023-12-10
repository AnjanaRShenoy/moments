import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalCloseButton,
  Button,
} from "@chakra-ui/react";
import { Image } from "react-bootstrap";
import { useDisclosure } from "@chakra-ui/react";
import { Flex } from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import { usePostMutation } from "../../slices/userApiSlice";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const CreateScreen = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [image, setImage] = useState();

  const { userInfo } = useSelector((state) => state.auth); //fetching userInfo from store

  const navigate = useNavigate();

  const [post, { isLoading }] = usePostMutation();
  const fileInput = useRef(null);

  const handleFileChange = async (event) => {
    const selectedFile = event.target.files[0];
    setImage(selectedFile);
  };

  const postImage = async () => {
    //to post the image

    try {
      const formData = new FormData();

      formData.append("filed", image);
      formData.append("userInfo", JSON.stringify(userInfo));

      const res = await post(formData).unwrap();
      toast.success("Successfully uploaded the post");
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  const fileUpload = async () => {
    try {
      fileInput.current.click();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Button style={{ color: "cyan.400" }} onClick={onOpen}>
        Create new Post
      </Button>

      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            style={{ align: "center", justify: "center" }}
            _hover={{ bgColor: "cyan" }}
          >
            Create new post
          </ModalHeader>
          <Image
            src={
              image
                ? URL.createObjectURL(image)
                : "https://www.techsmith.com/blog/wp-content/uploads/2022/03/resize-image.png"
            }
            alt=""
          />
          <ModalCloseButton />
          <Flex height="10vh" align="end" justify="center">
            {image ? (
              <>
                <input
                  type="file"
                  name="filed"
                  ref={fileInput}
                  style={{ display: "none" }}
                  onChange={(e) => {
                    postImage(e);
                  }}
                />
                <Button
                  colorScheme="blue"
                  style={{ width: "180px" }}
                  onClick={postImage}
                >
                  Next
                </Button>
              </>
            ) : (
              <>
                <input
                  type="file"
                  name="filed"
                  ref={fileInput}
                  style={{ display: "none" }}
                  onChange={(e) => {
                    handleFileChange(e);
                  }}
                />
                <Button
                  colorScheme="blue"
                  style={{ width: "180px" }}
                  onClick={fileUpload}
                >
                  Select from device
                </Button>
              </>
            )}
          </Flex>
          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreateScreen;
