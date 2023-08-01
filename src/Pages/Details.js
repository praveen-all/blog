import { Avatar, Box, Text } from "@chakra-ui/react";
import { deleteDoc, doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { db } from "../firebase";
import Spinner from "../components/Spinner";
import { UserState } from "../context/UserContext";
import { ToastError } from "../Utility/ErrorHandler";

function Details() {
  const [blog, Setblog] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { User,fetchAgain,setFetchAgain } = UserState();
  const getanBlog = async () => {
    setLoading(true);
    const docref = doc(db, "blogs", id);
    const data = await getDoc(docref);
    Setblog(data.data());
    setLoading(false);
  };
  useEffect(() => {
    getanBlog();
  }, [id]);


  const handlerDelete = async () => {
    if (window.confirm("Are you sure wanted to delete this doc?")) {
      try {
        setLoading(true);
        await deleteDoc(doc(db, "blogs", id));
        setLoading(false);
        setFetchAgain(!fetchAgain);
        navigate("/");
      } catch (error) {
        ToastError(error.message);
        setLoading(false);
      }
    }
  };
  const handlerEdit = () => {
    navigate(`/update/${id}`);
  };

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <>
          {blog ? (
            <Box
              className="container my-3"
              display={"flex"}
              alignItems={"center"}
              justifyContent={"center"}
              rowGap={"10px"}
              marginTop={"20px"}
              flexDirection={"column"}
            >
              {/* <Avatar
      src=''
      /> */}

              <img
                src={blog.image.imageUrl}
                style={{ width: "80vw", borderRadius: "30px" }}
              />
              <h2 style={{ textAlign: "center" }}>{blog.Title} </h2>
              <Box>
                <Text>
                  <b>Tags: {blog.Tag}</b>
                  {"  "}
                  <button className="btn btn-outline-info btn-sm mx-3">
                    {blog.Category}
                  </button>
                </Text>
                <Text
                  textAlign={"center"}
                  display={"flex"}
                  alignItems={"center"}
                  justifyContent={"center"}
                >
                  <Avatar /> <b className="mx-2">{blog.author}</b> ,{" "}
                  {blog.timestamp.toDate().toDateString()}
                </Text>
              </Box>
              <Box width={{ md: "80%", base: "90%" }}>
                <Text fontSize={{ md: "1.3rem", base: "1rem" }}>
                  {blog.Description}
                </Text>
              </Box>
              {User.uid === blog.userId ? (
                <Box
                  width={"100px"}
                  height={"40px"}
                  border={"1px solid black"}
                  borderRadius={"20px"}
                  position={"fixed"}
                  display={"flex"}
                  alignItems={"center"}
                  justifyContent={"space-around"}
                  bottom={"3%"}
                  backgroundColor={"white"}
                  paddingLeft={"10px"}
                >
                  <i
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      handlerDelete();
                    }}
                    class="fa-solid fa-trash-can text-shodow"
                  ></i>

                  <i
                    style={{ cursor: "pointer" }}
                    onClick={() =>{ handlerEdit()}}
                    class="fa-solid fa-pen-to-square mx-3 text-shodow"
                  ></i>
                </Box>
              ) : (
                <></>
              )}
            </Box>
          ) : (
            <></>
          )}
        </>
      )}
    </>
  );
}

export default Details;
