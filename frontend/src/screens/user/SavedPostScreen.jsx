import { Card, Image } from "@chakra-ui/react";

import "bootstrap-icons/font/bootstrap-icons.css";
import { useGetSavedPostQuery } from "../../slices/userApiSlice";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";




const SavedPostScreen = () => {
const { userInfo } = useSelector((state) => state.auth);
const { data: savedPost, error, refetch }= useGetSavedPostQuery({_id:userInfo._id})
const [data, setData] = useState([]);
useEffect(() => {
debugger
    const fetchData = async () => {
      try {
        await refetch();
        setData(savedPost);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [refetch, data]);
  return (
    
    <div>
        
        <h4>Saved Posts</h4>
        <div style={{display:"flex",gap:"10px", flexWrap:"wrap", maxWidth:"900px", margin:"0 auto"}}>
        {data?(data.map((savedPost)=>(
      <Card w="280px" >
    
        <Image
        height="280px"
          objectFit="cover"
          src={`../../../public/${savedPost.postId.post}`}
          alt="Chakra UI"
        />
      </Card>))):(<></>)}
      </div>
    </div>
  );
};

export default SavedPostScreen;
