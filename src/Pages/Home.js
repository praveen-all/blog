import { Box, Button } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import MostTrending from "../components/MostTrending";
import TrendingBlogs from "../components/TrendingBlogs";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import { ToastError } from "../Utility/ErrorHandler";
import Spinner from "../components/Spinner";
import { UserState } from "../context/UserContext";
export default function Home() {
  const [Blogs, setBlogs] = useState();
  const [Loading, setLoading] = useState(false);
  const [SearchBlogs, setSearchBlogs] = useState();
  const { Search } = UserState();


  useEffect(() => {
    setLoading(true);
    const unsub = onSnapshot(
      collection(db, "blogs"),
      (snapshot) => {
        let list = [];
        snapshot.docs.forEach((docu) => {
          list.push({ id: docu.id, ...docu.data() });
        });
        setBlogs(list);
        setSearchBlogs(list);
        setLoading(false);
      },
      (error) => {
        ToastError("There was the error in fetching blogs");
        console.log(error);
        setLoading(false);
      }
    );

    return () => {
      unsub();
    };
  }, []);

  const searchAllBlogs = async () => {

    setSearchBlogs(
      Blogs.filter((el) => el.Title.toLowerCase().includes(Search))
    );
  };

  useEffect(() => {
    Search && searchAllBlogs();
    if (Search === "") {
      setSearchBlogs(Blogs);
    }
  }, [Search]);

  return (
    <>
      {Loading ? (
        <Spinner />
      ) : (
        <>
          <TrendingBlogs>
            <Button
              marginTop={"10px"}
              className="stickyLeft"
              // colorScheme="red"
              position={"fixed"}
              marginLeft={"-6"}
              zIndex={"8383"}
              fontSize={"1.5rem"}
              textAlign={"center"}
            >
              {<ChevronRightIcon />}
            </Button>
          </TrendingBlogs>
          <Box
            className="container"
            marginTop={"50px"}
            display={"flex"}
            flexWrap={"wrap"}
            justifyContent={"space-between"}
          >
            {SearchBlogs && SearchBlogs.length !== 0 ? (
              <MostTrending Blogs={SearchBlogs} />
            ) : (
              <Box
                style={{
                  width: "100%",
                }}
              >
                <h2 style={{ textAlign: "center" }}>No blogs</h2>{" "}
              </Box>
            )}
          </Box>
        </>
      )}
    </>
  );
}
