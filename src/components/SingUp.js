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
import { ViewIcon } from '@chakra-ui/icons';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword,updateProfile } from 'firebase/auth';
import { ToastError, ToastSuccess, ToastWarning } from '../Utility/ErrorHandler';
import { useNavigate } from 'react-router-dom';


function SingUp() {
  const [show, setShow] = useState(false);
  const [Name, setName] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");
  const navigate=useNavigate();

  const handlerSignUp = async (e) => {
    e.preventDefault();
     if(!Password || !Email ||!Name || !ConfirmPassword){
            return ToastWarning("Please provide all info");
     }

     if(Password !==ConfirmPassword){
         return ToastWarning('Password mis matching')
     }
    try {
      await createUserWithEmailAndPassword(auth, Email, Password);
      await updateProfile(auth.currentUser,{displayName:Name});
      ToastSuccess("Your Account Created successfull");
      navigate('/');
      
    } catch (error) {
        if (error.code === "auth/email-already-in-use"){
           ToastError("This email is already Exist");
        }else if (error.code === "auth/invalid-email"){
            ToastError("Invalid Email");
        }else{
             ToastError(" something went  Wrong,Please try again later ")
             console.log(error.message);
        }
    }
  };

  const handlerToggle = () => {
    setShow(!show);
  };

  return (
    <VStack>
      <FormControl id="name">
        <FormLabel>Name</FormLabel>
        <Input
          type="text"
          value={Name}
          onChange={(e) => setName(e.target.value)}
        />
      </FormControl>
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
      <FormControl id="Confirmpassword">
        <FormLabel>Confirm Password</FormLabel>

        <InputGroup>
          <Input
            type={show ? "text" : "password"}
            value={ConfirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
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
        onClick={handlerSignUp}
      >
        Sign Up
      </Button>
    </VStack>
  );
}

export default SingUp