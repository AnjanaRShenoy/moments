import React from "react";
import Hero from "../../components/userComponents/Hero.jsx";
import CreateScreen from "./CreateScreen.jsx";
import { Flex } from "@chakra-ui/react";
import Chat from "../../components/userComponents/Chat.jsx";

const HomeScreen = () => {
  return (
<<<<<<< HEAD
    
    <div >
      <Hero/>
    </div>
   
  )
}
=======
    <Flex style={{ width: "100%", justifyContent: "space-between" }}>
      <div style={{ width: "250px" }}></div>
      <Flex flexDirection={{ md: "column", base: "column" }}>
        <div style={{ textAlign: "center", marginBottom: "10px" }}>
          <CreateScreen />
        </div>
        <Hero />
      </Flex>
      <div style={{ width: "350px" }}>
        <Chat />
      </div>
    </Flex>
  );
};
>>>>>>> 2d77eba291877a20fe0877d73a93a06c2f0fc125

export default HomeScreen;
