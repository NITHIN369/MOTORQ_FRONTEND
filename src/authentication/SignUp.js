import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { useState, useContext } from "react";
import axios from "axios"
import { useNavigate } from "react-router-dom";
import contextAPI from "../contextAPI";
function SignUp() {
  const { setUser } = useContext(contextAPI);
  const navigate = useNavigate();
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [confirmshow, setCOnfirmShow] = useState(false);
  const [pic, setPic] = useState("");
  function handleClickConfirm() {
    setCOnfirmShow(confirmshow ? false : true);
  }
  function handleClick() {
    setShow(show ? false : true);
  }
  async function submitHandler() {
    if (password != confirmPassword) {
      toast({
        title: "Invalid Password",
        description: "Password and Confirm Password should match",
        status: "warning",
        duration: 2000,
        isClosable: true,
      });
      return;
    }
    if (!name || !mail || !password) {
      toast({
        title: "Please enter all fields having *",
        status: "warning",
        duration: 2000,
        isClosable: true,
      });
      return;
    } else {
      const { data } = await axios.post("http://localhost:5000/register", {
        name,
        email: mail,
        password,
      });
      toast({
        title: "Successfully Registered",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
      localStorage.setItem("user", JSON.stringify(data));
      setUser(data.user);
      navigate("/user");
    }
  }
  return (
    <VStack spacing="5px">
      <FormControl isRequired>
        <FormLabel>Name</FormLabel>
        <Input
          placeholder="Enter Your Name"
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
      </FormControl>
      <FormControl isRequired>
        <FormLabel>Mail</FormLabel>
        <Input
          type={"email"}
          placeholder="Enter Your Mail"
          onChange={(e) => {
            setMail(e.target.value);
          }}
        />
      </FormControl>
      <FormControl isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
            type={show ? "text" : "password"}
            placeholder="Enter Your Password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <FormControl isRequired>
        <FormLabel>Confirm Passowrd</FormLabel>
        <InputGroup>
          <Input
            type={confirmshow ? "text" : "password"}
            placeholder="Confirm Password"
            onChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClickConfirm}>
              {confirmshow ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <Button
        width="30%"
        colorScheme="blue"
        onClick={submitHandler}
        style={{ marginTop: 15 }}
        isLoading={loading}
      >
        Sign Up
      </Button>
    </VStack>
  );
}

export default SignUp;
