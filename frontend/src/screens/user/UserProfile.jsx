import React, { useEffect, useState } from "react";
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBBtn,
  MDBTypography,
} from "mdb-react-ui-kit";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const UserProfile = () => {
  const [user, setUser] = useState("");
  const [post, setPost] = useState("");
  const [followers, setFollowers] = useState("");
  const [followings, setFollowings] = useState("");
  const [postCount, setPostCount] = useState("");

  const { profileId } = useParams();

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `/api/users/userProfile?_id=${profileId}`
      );

      setUser(response.data.user[0]);
      setPost(response.data.post);
      setFollowers(response.data.followers);
      setFollowings(response.data.followings);
      setPostCount(response.data.postCount);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  // const userProfile = async (profileId) => {
  //     try {
  //       const response = await axios.get(`/api/users/userProfile?profileId=${profileId}`);
  //     } catch (err) {
  //       console.error(err);
  //     }
  //   };
  return (
    <div className="gradient-custom-2">
      <MDBContainer className="py-5 h-100">
        <MDBRow
          className="justify-content-center align-items-center h-100"
          style={{ minWidth: "1200px" }}
        >
          <MDBCol lg="9" xl="7">
            {user ? (
              <MDBCard>
                <div
                  className="rounded-top text-white d-flex flex-row"
                  style={{ backgroundColor: "#000", height: "200px" }}
                >
                  <div
                    className="ms-4 mt-5 d-flex flex-column"
                    style={{ width: "150px" }}
                  >
                    <MDBCardImage
                      src={`../../../${user?.profileImage}`}
                      alt="Generic placeholder image"
                      className="mt-4 mb-2 img-thumbnail"
                      fluid
                      style={{ width: "150px", zIndex: "1" }}
                    />
                  </div>
                  <div className="ms-3" style={{ marginTop: "130px" }}>
                    <MDBTypography tag="h5">{user.name}</MDBTypography>
                  </div>
                </div>

                <div
                  className="p-4 text-black"
                  style={{ backgroundColor: "#f8f9fa" }}
                >
                  <div className="d-flex justify-content-end text-center py-1">
                    <div>
                      <MDBCardText className="mb-1 h5">{postCount}</MDBCardText>
                      <MDBCardText className="small text-muted mb-0">
                        Photos
                      </MDBCardText>
                    </div>
                    <div className="px-3">
                      <MDBCardText className="mb-1 h5">{followers}</MDBCardText>
                      <MDBCardText className="small text-muted mb-0">
                        Followers
                      </MDBCardText>
                    </div>
                    <div>
                      <MDBCardText className="mb-1 h5">
                        {followings}
                      </MDBCardText>
                      <MDBCardText className="small text-muted mb-0">
                        Following
                      </MDBCardText>
                    </div>
                  </div>
                </div>
                <MDBCardBody className="text-black p-4">
                  <div className="mb-5">
                    <p className="lead fw-normal mb-1">About</p>
                    <div className="p-4" style={{ backgroundColor: "#f8f9fa" }}>
                      <MDBCardText className="font-italic mb-1">
                        {user.bio}
                      </MDBCardText>
                    </div>
                  </div>
                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <MDBCardText className="lead fw-normal mb-0">
                      Posts
                    </MDBCardText>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      flexWrap: "wrap",
                      gap: "15px",
                    }}
                  >
                    {post.length > 0 ? (
                      post.map((post) => (
                        <MDBCardImage
                          src={`../../../${post.post}`}
                          alt="image 1"
                          // className="w-100 rounded-3"
                          onClick={() => toggleOpen(post._id)}
                          style={{
                            objectFit: "cover",
                            minHeight: "180px",
                            minWidth: "180px",
                            maxHeight: "180px",
                            maxWidth: "180px",
                          }}
                        />
                      ))
                    ) : (
                      <div>No Posts</div>
                    )}
                    <div style={{ width: "180px" }}></div>
                    <div style={{ width: "180px" }}></div>
                    <div style={{ width: "180px" }}></div>
                    <div style={{ width: "180px" }}></div>
                  </div>
                </MDBCardBody>
              </MDBCard>
            ) : (
              <div>User not found</div>
            )}{" "}
            */
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
};

export default UserProfile;
