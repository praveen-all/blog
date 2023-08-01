import {
  Avatar,
  Box,
  Container,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import React, { useRef } from "react";
import SingUp from "../components/SingUp";
import Login from "../components/Login";
import googleImage from "./../Images/googleImage.jpg";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { ToastError, ToastSuccess } from "../Utility/ErrorHandler";

const provider = new GoogleAuthProvider();
function Auth() {
  const signUpRef = useRef();
  const navigate = useNavigate();

  const movetoSignUp = () => {
    signUpRef.current.click();
    console.log("hi");
  };
  const goodleSignUp = async () => {
    try {
      await signInWithPopup(auth, provider);

      ToastSuccess("logged in successfully");
      navigate("/");
    } catch (error) {
      if (error.code === "auth/user-not-found") {
        ToastError("There no user with email ");
      } else if (error.code === "auth/invalid-email") {
        ToastError("Invalid Email");
      } else {
        ToastError(" something went  Wrong,Please try again later ");
        console.log(error.message);
      }
    }
  };
  return (
    <Container marginTop={"20px"}>
      <Tabs variant="soft-rounded" colorScheme="blue">
        <TabList>
          <Tab width={"50%"}>Login</Tab>
          <Tab width={"50%"} ref={signUpRef}>
            Sign Up
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Login movetoSignUp={movetoSignUp} />
          </TabPanel>
          <TabPanel>
            <SingUp />
          </TabPanel>
        </TabPanels>
      </Tabs>
      <p style={{ textAlign: "center" }}>or</p>
      <Box display={"flex"} justifyContent={"center"}>
        <Text
          cursor={"pointer"}
          border={"1px solid black"}
          textAlign={"center"}
          display={"inline"}
          padding={"10px"}
          borderRadius={"10px"}
          alignSelf={"center"}
          onClick={goodleSignUp}
        >
          {" "}
          SignIn with{" "}
          <Avatar
            borderRadius={"100%"}
            width={"30px"}
            height={"30px"}
            src={googleImage}
          ></Avatar>
        </Text>
      </Box>
    </Container>
  );
}

export default Auth;
