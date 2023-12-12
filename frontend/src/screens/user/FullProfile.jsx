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
import { useSelector } from "react-redux";

import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { Link } from "react-router-dom";
import axios from "axios";

const FullProfile = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const _id = userInfo._id;
  const [user, setUser] = useState();
  const [post, setPost] = useState();

  const fetchData = async () => {
    try {
      const response = await axios.get(`/api/users/getFullProfile?_id=${_id}`);
      console.log(response, "prp");
      setUser(response.data.user[0]);
      setPost(response.data.post);
    } catch (err) {
      console.error(err);
    }
  };
  console.log(post, user, "leeelelelelelel");

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="gradient-custom-2">
      <MDBContainer className="py-5 h-100">
        <MDBRow className="justify-content-center align-items-center h-100">
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
                    <MDBBtn
                      outline
                      color="dark"
                      style={{ height: "36px", overflow: "visible" }}
                    >
                      <Link to="/profile">Edit profile</Link>
                    </MDBBtn>
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
                      <MDBCardText className="mb-1 h5">253</MDBCardText>
                      <MDBCardText className="small text-muted mb-0">
                        Photos
                      </MDBCardText>
                    </div>
                    <div className="px-3">
                      <MDBCardText className="mb-1 h5">1026</MDBCardText>
                      <MDBCardText className="small text-muted mb-0">
                        Followers
                      </MDBCardText>
                    </div>
                    <div>
                      <MDBCardText className="mb-1 h5">478</MDBCardText>
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

                  <MDBRow
                    style={{
                      margin: "0 auto",
                    }}
                  >
                    {post ? (
                      post.map((post) => (
                        <MDBCol
                          className="mb-2"
                          style={{ minHeight: "150px", minWidth: "150px" }}
                        >
                          <MDBCardImage
                            src={`../../../${post.post}`}
                            alt="image 1"
                            className="w-100 rounded-3"
                            style={{
                              objectFit: "cover",
                              minHeight: "180px",
                              minWidth: "180px",
                              maxHeight: "180px",
                              maxWidth: "180px",
                            }}
                          />
                        </MDBCol>
                      ))
                    ) : (
                      <div>No Posts</div>
                    )}
                  </MDBRow>
                </MDBCardBody>
              </MDBCard>
            ) : (
              <div>User not found</div>
            )}
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
};
export default FullProfile;
