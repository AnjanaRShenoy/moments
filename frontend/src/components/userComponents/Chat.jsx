import React, { useCallback, useEffect, useState } from "react";
import { Flex } from "@chakra-ui/react";
import {
  useSearchMutation,
  useSuggestionsQuery,
} from "../../slices/userApiSlice";

import { MDBInput, MDBInputGroup, MDBIcon, MDBBtn } from "mdb-react-ui-kit";
import {
  Card,
  Stack,
  Image,
  CardBody,
  Heading,
  Text,
  CardFooter,
  Button,
  Select,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import axios from "axios";

const Chat = () => {
  const { userInfo } = useSelector((state) => state.auth);

  const {
    data: friends,
    error,
    refetch,
  } = useSuggestionsQuery({ _id: userInfo._id });

  useEffect(() => {
    refetch();
  }, [refetch]);

  const user = async () => {
    try {
      console.log("entered");
    } catch (err) {
      console.log(err);
    }
  };

  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState("");

  let cancelToken;
  const source = axios.CancelToken.source();

  const searchName = async () => {
    if (search.trim() !== "") {
      const res = await axios.get(`/api/users/search?search=${search}`, {
        cancelToken: source.token,
      });     

      setSearchResult(res.data);
    } else {
      // If the search query is empty, reset the search result
      setSearchResult([]);
    }
  };

  const debounce = (func, delay) => {
    let timeoutId;
    return function (...args) {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };

  const debouncedSearch = debounce((searchQuery) => {
     setSearch(searchQuery);
  }, 500);

  useEffect(() => {
    searchName();
  }, [search]);

  
  return (
    <>
      <div style={{ color: "white", marginBottom: "20px" }}>
        <MDBInputGroup style={{ backgroundColor: "white" }}>
          <MDBInput
            label="Search"
            onChange={(e) => {
              source.cancel("cancelled by user");
              debouncedSearch(e.target.value);
            }}
            
          />
          <MDBBtn style={{ backgroundColor: "black" }}>
            <MDBIcon icon="search"></MDBIcon>
          </MDBBtn>
        </MDBInputGroup>
        {searchResult?.length > 0 &&
          searchResult
            .filter((result) => result._id !== "655df736b84029bfab32f6e6")
            .map((result) => (
              <div
                style={{
                  cursor: "pointer",
                  backgroundColor: "#d0cfcf",
                  color: "black",
                  width: "290px",
                  padding: "6px",
                  borderBottom: "1.5px solid black",
                  borderRadius: "4px",
                }}
                onClick={() => user(result._id)}
              >
                <Flex direction="row">
                  <img
                    style={{
                      width: "30px",
                      height: "30px",
                      borderRadius: "30px",
                      marginRight: "3px",
                    }}
                    src={`../../../${result.profileImage}`}
                  />
                  {result.name}
                </Flex>
                <br />
              </div>
            ))}
      </div>
      <p style={{ color: "white" }}>People you may know</p>
      {friends ? (
        friends
          .filter((friends) => friends._id !== userInfo._id)
          .map((friends) => (
            <Card
              direction={{ base: "column", sm: "row" }}
              overflow="hidden"
              variant="outline"
              style={{
                backgroundColor: "black",
                width: "290px",
                marginBottom: "10px",
              }}
            >
              <Image
                objectFit="cover"
                maxW={{ base: "130px", sm: "80px" }}
                src={`../../../${friends.profileImage}`}
                alt="Caffe Latte"
              />

              <Stack>
                <CardFooter>
                  <Flex direction="column">
                    <div style={{ color: "white" }}>{friends.name}</div>
                    <Flex direction="row">
                      <Button
                        variant="solid"
                        colorScheme="blue"
                        style={{ marginRight: "4px" }}
                        size="sm"
                      >
                        Follow
                      </Button>
                      <Button variant="solid" colorScheme="blue" size="sm">
                        Cancel
                      </Button>
                    </Flex>
                  </Flex>
                </CardFooter>
              </Stack>
            </Card>
          ))
      ) : (
        <div style={{ color: "white", fontSize: "25px" }}>No suggestions</div>
      )}
    </>
  );
};

export default Chat;
