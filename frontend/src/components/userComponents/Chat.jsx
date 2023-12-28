import React, { useState } from "react";
import { Stack, Input, Flex } from "@chakra-ui/react";
import { MDBInput, MDBInputGroup, MDBIcon, MDBBtn } from "mdb-react-ui-kit";
import { useSearchMutation } from "../../slices/userApiSlice";

const Chat = () => {

  const [searchRegex] = useSearchMutation();
  const [search, setSearch] = useState("");
  const searchName = async () => {
    const res = await searchRegex({ search }).unwrap();
    console.log(res, "search");
  };

  return (
    <div style={{ color: "white" }}>
      <MDBInputGroup style={{ backgroundColor: "white" }}>
        <MDBInput label="Search" onChange={(e) => setSearch(e.target.value)} />
        <MDBBtn style={{ backgroundColor: "black" }}>
          <MDBIcon onClick={() => searchName()} icon="search"></MDBIcon>
        </MDBBtn>
      </MDBInputGroup>
    </div>
  );
};

export default Chat;
