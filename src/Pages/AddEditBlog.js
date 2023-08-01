import {
  Box,
  Button,
  CircularProgress,
  CircularProgressLabel,
  FormControl,
  Input,
  Radio,
  RadioGroup,
  Select,
  Stack,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { db, storage } from "../firebase";
import {
  getDownloadURL,
  ref,

  uploadBytesResumable,
} from "firebase/storage";
import { v4 } from "uuid";
import {
  ToastError,
  ToastInfo,
  ToastSuccess,
  ToastWarning,
} from "../Utility/ErrorHandler";
import { addDoc, collection, doc, getDoc, serverTimestamp, updateDoc } from "firebase/firestore";
import { UserState } from "../context/UserContext";
import { useNavigate, useParams } from "react-router-dom";
export default function AddEditBlog() {
  const [IsTrending, setIsTrending] = useState("no");
  const [Title, setTitle] = useState();
  const [Tag, setTag] = useState();
  const [Description, setDescription] = useState();
  const [Category, setCategory] = useState();
  // const [File, setFile] = useState();
  const [Progress, setProgress] = useState(null);
  const [Form, setForm] = useState();
  const navigate = useNavigate();

  const { User,fetchAgain,setFetchAgain } = UserState();
  // update all -------------------------------->
  const { id } = useParams();

  const getBlogByid=async()=>{
    const docref=doc(db,'blogs',id);
    const data=await getDoc(docref);
    if(data.exists()){
      const result=data.data();
      setIsTrending(result.IsTrending);
      setTag(result.Tag);
      setTitle(result.Title);
      setDescription(result.Description);
      setForm(result.image);
      setCategory(result.Category);

    }
  }

  useEffect(() => {
    id&& getBlogByid();
    if(!id){
      setTitle('');
      setTag('');
      setDescription(' ');
      setTag('');
      setIsTrending(' ');
    }
  }, [id])

  const handleUpdateblog=async()=>{
    try {
      const formObj = {
        Tag,
        Title,
        Description,
        image: Form,
        Category,
        IsTrending,
      };
      await updateDoc(doc(db, "blogs",id), {
        ...formObj,
        timestamp: serverTimestamp(),
        author: User.displayName,
        userId: User.uid,
      });
      ToastSuccess("Your blod Updated successfully");
      setFetchAgain(!fetchAgain);
      navigate("/");

    } catch (error) {
      ToastError(error.message);
    }
  }
  

  // ------------------------------------------->

  
  const onChangeFIleUploadHandler = (File) => {
    if (File === null) return;
   
    if (File === undefined) return ToastWarning("plese select proper image!");

    const blogRef = ref(storage, `Blog/${File.name + v4()}`);
    // uploadBytes(blogRef,File).then((hey)=>{
    //   // alert('Image uploaded');
    //   console.log(hey)
    // })
    const uploadTask = uploadBytesResumable(blogRef, File);
    ToastInfo("image uploading started");
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        setProgress(10.21);
        const progres = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progres);
        switch (snapshot.state) {
          case "paused":
            ToastError("upload paused");
            break;
          case "running":
            // ToastInfo("Running");
            console.log("running");
            break;
          default:
            break;
        }
      },
      (ere) => {
        ToastError(ere.message);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
          ToastSuccess("Image upload successfull");
          setProgress(null);
          setForm((prev) => ({ ...prev, imageUrl: downloadUrl }));
        });
      }
    );
  };

  const handleAddBlog = async () => {
    if (!Tag || !Title || !Description || !Form || !Category || !IsTrending) {
     
      return ToastWarning("please Provide all the info");
    }
    const formObj = {
      Tag,
      Title,
      Description,
      image: Form,
      Category,
      IsTrending,
    };
    try {
       await addDoc(collection(db, "blogs"), {
        ...formObj,
        timestamp: serverTimestamp(),
        author: User.displayName,
        userId: User.uid,
      });
      ToastSuccess("Your blod added successfully");
      setFetchAgain(!fetchAgain);
      navigate("/");
    
    } catch (error) {
      ToastError(error.message);
    }
  };

  return (
    <Box
      marginTop={"30px"}
      className="container"
      width={{ base: "85%", md: "60%" }}
    >
      <h2 style={{ textAlign: "center" }}>
        {id ? "Update the Blog" : "Create blog"}
      </h2>
      <VStack marginTop={"30px"} spacing={"20px"}>
        <FormControl id="Title">
          <Input
            type="text"
            placeholder="Title"
            value={Title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </FormControl>
        <FormControl id="Tag">
          <Input
            type="text"
            placeholder="Tag"
            value={Tag}
            onChange={(e) => setTag(e.target.value)}
          />
        </FormControl>
        <FormControl
          id="isTrending"
          display={"flex"}
          alignItems={"center"}
          justifyContent={"space-around"}
        >
          Is Trending Blog ?
          <RadioGroup onChange={setIsTrending} value={IsTrending}>
            <Stack direction="row">
              <Radio value="Yes">Yes</Radio>
              <Radio value="No">No</Radio>
            </Stack>
          </RadioGroup>
        </FormControl>
        <FormControl>
          <Select
            placeholder="Please select category"
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="Fashion">Fashion</option>
            <option value="Technology">Technology</option>
            <option value="Food">Food</option>
            <option value="Politics">Politics</option>
            <option value="Sports">Sports</option>
            <option value="Business">Business</option>
          </Select>
        </FormControl>
        <FormControl>
          <Textarea
            placeholder="Description"
            size={"md"}
            rows={6}
            value={Description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </FormControl>
        {Progress ? (
          <CircularProgress
            size="120px"
            value={Math.round(Progress)}
            color="green.400"
            position={"fixed"}
          >
            <CircularProgressLabel>
              {Math.round(Progress)}%
            </CircularProgressLabel>
          </CircularProgress>
        ) : (
          <></>
        )}
        <FormControl>
          <Input
            type="file"
            className="form-control"
            // accept="image/*"
            onChange={(e) => {
              // setFile();
              onChangeFIleUploadHandler(
                e.target.files[e.target.files.length - 1]
              );
            }}
          />
        </FormControl>
        <FormControl textAlign={"center"}>
          {id ? (
            <Button
              colorScheme="orange"
              type="submit"
              disabled={Progress !== null}
              onClick={handleUpdateblog}
            >Update</Button>
          ) : (
            <Button
              colorScheme="orange"
              type="submit"
              disabled={Progress !== null}
              onClick={handleAddBlog}
            >
              Submit
            </Button>
          )}
        </FormControl>
      </VStack>
    </Box>
  );
}
