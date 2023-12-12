import { Card, Image } from "@chakra-ui/react";

import "bootstrap-icons/font/bootstrap-icons.css";
import { useGetSavedPostQuery } from "../../slices/userApiSlice";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import hi from "../../../public/hi";
const SavedPostScreen = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const {
    data: postDetails,
    error,
    refetch,
  } = useGetSavedPostQuery({ _id: userInfo._id });
  const [data, setData] = useState([]);
  debugger;
  // useEffect(() => {

  //     const fetchData = async () => {
  //       try {
  //         await refetch();
  //         setData(savedPost);
  //       } catch (err) {
  //         console.log(err);
  //       }
  //     };
  //     fetchData();
  //   }, [refetch, data]);
  return (
    <div>
      <h4 style={{color:"white"}}>Saved Posts</h4>
      <div
        style={{
          display: "flex",
          gap: "10px",
          flexWrap: "wrap",
          maxWidth: "900px",
          margin: "0 auto",
        }}
      >
        {postDetails ? (
          postDetails.map((savedPost) => (
            <Card w="280px">
              <Image
                height="280px"
                objectFit="cover"
                src={`../../../../${savedPost.post}`}
                alt="Chakra UI"
              />
            </Card>
          ))
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default SavedPostScreen;
