import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalCloseButton,
  Button,
  Stack,
  Input,
  Textarea,
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
  const [caption, setCaption] = useState();

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
    console.log("entered");
    try {
      onClose()
      const formData = new FormData();
      if (caption) {
        formData.append("caption", caption);
    }
      formData.append("filed", image);
      formData.append("userInfo", JSON.stringify(userInfo));
      console.log(formData, "form");
      const res = await post(formData).unwrap();
      
      toast.success("Successfully uploaded the post");
      navigate("/fullProfile");
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
            style={{ width: "500px", height: "350px", objectFit: "cover" }}
            alt=""
          />
          <ModalCloseButton />
          <Flex align="end" justify="center">
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
                <Flex
                  direction="column"
                  alignItems="center"
                  gap="12px"
                  marginTop="10px"
                >
                  <Textarea
                    placeholder="Write something"
                    value={caption}
                    onChange={(e) => setCaption(e.target.value)}
                    style={{ width: "425px" }}
                  />

                  <Button
                    colorScheme="blue"
                    style={{ width: "180px" }}
                    onClick={postImage }
                  >
                    Next
                  </Button>
                </Flex>
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

                <div>
                  <Button
                    colorScheme="blue"
                    style={{ width: "180px" }}
                    onClick={fileUpload}
                  >
                    Select from device
                  </Button>
                </div>
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
