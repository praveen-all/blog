import React, { useEffect, useState } from "react";
import { UserState } from "../context/UserContext";
import { Box } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import defaultImge from './../Images/default.png'
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase";
import { ToastError } from "../Utility/ErrorHandler";
export default function MostTrendingCompo({ blog }) {
  const { User ,setFetchAgain,fetchAgain} = UserState();
  const [isTrue, setisTrue] = useState(false);
  const [Loading, setLoading] = useState(false);
useEffect(() => {
  setisTrue(User.uid === blog.userId);
}, [])


const handlerDelete=async(id)=>{
if(window.confirm("Are you sure wanted to delete this doc?")){
  try {
    setLoading(true);
    await deleteDoc(doc(db,'blogs',id));
    setFetchAgain(!fetchAgain);
    setLoading(false);
  } catch (error) {
    ToastError(error.message);
    setLoading(false);
  }
}
}




  return (
    <>
      {Loading ? (
        <spinner />
      ) : (
        <>
          <Box className="card mb-3" width={{ md: "48%", base: "95%" }}>
            <div
              style={{
                maxHeight: "400px",
                overflow: "hidden",
                display: "inline",
              }}
            >
              <img
                className="card-img-top"
                src={`${
                  !blog.image.imageUrl ? defaultImge : blog.image.imageUrl
                }`}
                alt="..."
              />
            </div>
            <button type="button" class="btn btn-secondary">
              {blog.Category}
            </button>
            <div className="card-body">
              <h5 className="card-title">{blog.Title}</h5>
              <p className="card-text">
                {blog.Description.substring(0, 30)}...
              </p>
              <p className="card-text">
                <small className="text-muted">
                  {blog.timestamp.toDate().toDateString()},{" "}
                  <b>
                    {blog.author}
                    <Link
                      to={`/detail/${blog.id}`}
                      style={{ float: "right" }}
                      className="btn btn-info btn-sm"
                    >
                      reade More
                    </Link>
                  </b>
                </small>
              </p>
              {isTrue ? (
                <>
                  <i
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      handlerDelete(blog.id);
                    }}
                    class="fa-solid fa-trash-can text-shodow"
                  ></i>
                  <Link to={`update/${blog.id}`}>
                    <i
                      style={{ cursor: "pointer" }}
                     
                      class="fa-solid fa-pen-to-square mx-3 text-shodow"
                    ></i>
                  </Link>
                </>
              ) : (
                <></>
              )}
            </div>
          </Box>
        </>
      )}
    </>
  );
}
