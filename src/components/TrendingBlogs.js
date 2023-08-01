import { Box, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, useDisclosure } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import sportsImage from "./../Images/sports.jpg";
import TrendingComponent from "./TrendingComponent";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase";
import { ToastError } from "../Utility/ErrorHandler";
import { sorting } from "../Utility";
import { UserState } from "../context/UserContext";

function TrendingBlogs({ children }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  const scrollRef = React.useRef();
  const [trending, settrending] = useState([]);
  const {fetchAgain}=UserState();

  const getAllTrendingBlogs = async () => {
    try {
      const q = query(
        collection(db, "blogs"),
        where("IsTrending", "==", "Yes")
      );
      const snapShot = await getDocs(q);
      const list = [];

      snapShot.forEach((doc) => {
        list.push({ id: doc.id, ...doc.data() });
      });
      settrending(list);

      if (list.length > 10) {
        settrending(list.slice(10));
      }
      // settrending(
      //   trending.sort((a, b) => {
      //     let ab = new Date(a.timestamp);
      //     let bc = new Date(b.timestamp);
      //     return ab - bc;
      //   })
      // );
    } catch (error) {
      console.log(error);
      ToastError(error.message);
    }
  }

  useEffect(() => {
    getAllTrendingBlogs();
  }, [fetchAgain]);

  useEffect(() => {
    if (
      !sessionStorage.getItem("once") ||
      sessionStorage.getItem("once") !== "true"
    ) {
      btnRef.current.click();
      window.setTimeout(() => {
        sessionStorage.setItem("once", "true");
        // scrollRef?scrollRef.current.scrollTo=300:
        onClose();
      }, 3000);
    }
  }, []);

  return (
    <>
      {children ? (
        <span
          ref={btnRef}
          onClick={(e) => {
            e.preventDefault();
            onOpen();
          }}
        >
          {children}
        </span>
      ) : (
        <></>
      )}
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>most Trended blogs</DrawerHeader>
          <hr />
          <DrawerBody ref={scrollRef}>
            {trending.length !== 0 ?
             (
                trending.map((el) => <TrendingComponent key={el.id} blog={el} />)):<></>}
          </DrawerBody>

          <DrawerFooter></DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default TrendingBlogs;
