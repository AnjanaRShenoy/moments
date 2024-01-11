import React from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalOverlay,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { appId, serverSecret } from "../../constants/config";
import { useDisclosure } from "@chakra-ui/react";

const Room = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { roomId } = useParams();
  const meeting = (element) => {
    const token = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appId,
      serverSecret,
      roomId,
      Date.now().toString(),
      Date.now().toString()
    );

    const zc = ZegoUIKitPrebuilt.create(token);
    zc.joinRoom({
      container: element,
      scenario: {
        mode: ZegoUIKitPrebuilt.OneONoneCall,
      },
      showScreenSharingButton: false,
      sharedLinks: [
        {
          name: "Copy Link",
          url: window.location.href,
        },
      ],
    });
  };
  return (
    <>
      <Button onClick={onOpen} key={"full"} m={4}>
        video call
      </Button>

      <Modal onClose={onClose} size={"full"} isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent>
          

          <ModalBody>
            <div ref={meeting} style={{height:"96vh"}}>
              {/* <h1> Room:{roomId} </h1> */}
            </div>
          </ModalBody>
          
        </ModalContent>
      </Modal>
    </>
  );
};

export default Room;

