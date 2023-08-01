import React, { useEffect } from "react";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  useDisclosure,
  Avatar,
  Box,
  Text,
} from "@chakra-ui/react";
import { UserState } from "../context/UserContext";
import { signOut } from "firebase/auth";
import { auth, db } from "../firebase";
import { ToastError, ToastSuccess } from "../Utility/ErrorHandler";
import { useNavigate } from "react-router-dom";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useState } from "react";
import TrendingComponent from "./TrendingComponent";
function UserModel({ children }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  const { User, setUser, fetchAgain } = UserState();
  const [UserBlogs, setUserBlogs] = useState([]);
  const navigate = useNavigate();
  const getAllUserBlogsBlogs = async () => {
    try {
      const q = query(
        collection(db, "blogs"),
        where("userId", "==", `${User.uid}`)
      );
      const snapShot = await getDocs(q);
      const list = [];

      snapShot.forEach((doc) => {
        list.push({ id: doc.id, ...doc.data() });
      });

      setUserBlogs(list);

      // setUserBlogs(
      //   UserBlogs.sort((a, b) => {
      //     let ab = new Date(a.timestamp);
      //     let bc = new Date(b.timestamp);
      //     return ab - bc;
      //   })
      // );
    } catch (error) {
      console.log(error);
      ToastError(error.message);
    }
  };

  useEffect(() => {
    User && getAllUserBlogsBlogs();
  }, [fetchAgain]);

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
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader></DrawerHeader>
          <hr />
          <DrawerBody>
            <h2 style={{ textAlign: "center", marginBottom: "10%" }}>
              User Details
            </h2>
            <Box
              width={"100%"}
              display={"flex"}
              alignItems={"center"}
              rowGap={"1rem"}
              justifyContent={"center"}
              flexDirection={"column"}
            >
              <Avatar height={"100px"} width={"100px"}></Avatar>
              <Text>{User.displayName}</Text>
              <Text textAlign={"center"}>Email : {User.email}</Text>
            </Box>
            <Button
              colorScheme="red"
              float={"right"}
              marginBottom={"3rem"}
              onClick={() => {
                signOut(auth);
                setUser("");
                onClose();
                ToastSuccess("logged Out successfully");
                navigate("/");
              }}
            >
              Log Out
            </Button>

            <Box
              width={"100%"}
              display={"flex"}
              alignItems={"center"}
              justifyContent={"center"}
              flexDirection={"column"}
              flexWrap={"wrap"}
              color={"InfoText"}
            >
              <h3>My Blogs</h3>

              {UserBlogs.length !== 0 ? (
                UserBlogs.map((el) => (
                  <TrendingComponent key={el.id} blog={el} onClose={onClose} />
                ))
              ) : (
                <></>
              )}
            </Box>
          </DrawerBody>

          <DrawerFooter></DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default UserModel;
