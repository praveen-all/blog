import React, { useState } from 'react'
import {
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
  VStack,
  Button,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import {signInWithEmailAndPassword} from 'firebase/auth';
import { ViewIcon } from "@chakra-ui/icons";
import { auth } from '../firebase';
import { ToastError, ToastSuccess } from '../Utility/ErrorHandler';
import { useNavigate } from 'react-router-dom';
// import { UserState } from '../context/UserContext';


export default function Login({ movetoSignUp }) {
  const [show, setShow] = useState(false);
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const navigate=useNavigate();

  const handlerToggle = () => {
    setShow(!show);
  };
   
  const handlerLogin=async(e)=>{
       e.preventDefault();
       try {
           await signInWithEmailAndPassword(auth,Email,Password);
            ToastSuccess('logged in successfully')
            navigate("/");
       } catch (error) {
        if (error.code === "auth/user-not-found"){
           ToastError("There is no user with this email ");
        }else if (error.code === "auth/invalid-email") {
          ToastError("Invalid Email");
        } else if (error.code === "auth/wrong-password") {
          ToastError("Wrong password");
        } else {
          ToastError(" something went  Wrong,Please try again later ");
          console.log(error.message);
        }
       }
  }



  return (
    <VStack>
      <FormControl id="email">
        <FormLabel>Email address</FormLabel>
        <Input
          type="email"
          value={Email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <FormHelperText>We'll never share your email.</FormHelperText>
      </FormControl>

      <FormControl id="password">
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
            type={show ? "text" : "password"}
            onChange={(e) => setPassword(e.target.value)}
            value={Password}
          />
          <InputRightElement width={"4.5rem"}>
            <ViewIcon onClick={handlerToggle} cursor={"pointer"} />
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <Button
        isLoading={false}
        colorScheme="red"
        alignSelf={"center"}
        marginTop={"2rem"}
        type="submit"
        onClick={handlerLogin}
      >
        LogIn
      </Button>
      <FormControl>
        <FormHelperText
          textAlign={"center"}
          cursor={"pointer"}
          onClick={() => {
            movetoSignUp();
          }}
        >
          Don't you have account? click here
        </FormHelperText>
      </FormControl>
      
    </VStack>
  );
}
