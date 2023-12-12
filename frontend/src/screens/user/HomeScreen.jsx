import React from "react";
import Hero from "../../components/userComponents/Hero.jsx";
import CreateScreen from "./CreateScreen.jsx";
import { Flex } from "@chakra-ui/react";

const HomeScreen = () => {
  return (
    <Flex flexDirection={{ md: "column", base: "column" }}>
      <div style={{textAlign:"center", marginBottom:"10px"}}>
        <CreateScreen />
      </div>
      <Hero />
    </Flex>
  );
};

export default HomeScreen;
