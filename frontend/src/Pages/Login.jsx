import {
  Box,
  Button,
  Input,
  FormLabel,
  FormControl,
  Stack,
  Heading,
  Radio,
  RadioGroup,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { login } from "../Redux/AuthReducer/action";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const { isAuth } = useSelector((store) => ({
    isAuth: store.authReducer.isAuth,
  }));
  const toast = useToast();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginRole, setLoginRole] = useState("jobseekers");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = {
      email,
      password,
    };

    dispatch(login(user, loginRole)).then(() => {
      toast({
        position: "top",
        title: "Login Successful.",
        description: `You have Successfully Logged In`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      if (loginRole === "hiringmanager") {
        navigate("/jobpost");
      } else {
        navigate("/job");
      }
    });
    setEmail("");
    setPassword("");
  };

  return (
    <Box
      p={8}
      marginTop={8}
      marginBottom={8}
      maxWidth={{ base: "90%", md: "400px" }}
      borderWidth={1}
      borderRadius={8}
      boxShadow="lg"
      bgColor='#ede2e2'
      mx="auto" 
      mt={{ base: "20px", md: "0" }}
    >
      <Heading as="h2" p={2} size="xl" bgColor='blue.200' textAlign="center" mb={6}>
        Login
      </Heading>
      <form onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <RadioGroup defaultValue={loginRole} onChange={setLoginRole}>
            <FormLabel>Please Select Role</FormLabel>
            <Stack spacing={5} direction="row">
              <Radio bgColor='white' colorScheme="blue" value="jobseekers">
                Job Seeker
              </Radio>
              <Radio bgColor='white' colorScheme="green" value="hiringmanager">
                Hiring Manager
              </Radio>
            </Stack>
          </RadioGroup>
          <FormControl>
            <FormLabel>Email address</FormLabel>
            <Input
            bgColor={'white'}
            p={5}
              type="email"
              name="email"
              value={email}
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </FormControl>
          <FormControl>
            <FormLabel>Password</FormLabel>
            <Input
              bgColor={'white'}
              p={5}
              type="password"
              value={password}
              name="password"
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </FormControl>
          <Button
            type="submit"
            colorScheme="teal"
            size="lg"
            fontSize="md"
            isLoading={isAuth} 
          >
            Login
          </Button>
          <Text mt={2}>
            Not a registered User?
            <Link
              to={"/signup"}
              style={{ color: "blue", marginLeft: "2px" }}
            >
              Sign Up
            </Link>
          </Text>
        </Stack>
      </form>
    </Box>
  );
};

export default Login;
