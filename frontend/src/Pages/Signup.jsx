import {
  FormControl,
  Button,
  FormLabel,
  Input,
  Select,
  Textarea,
  Heading,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Box,
  useToast,
  Text
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";

import axios from "axios";
import { useState } from "react";

const Signup = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const [hiringManager, sethiringManager] = useState({
    name: "",
    email: "",
    password: "",
    company_name: "",
    company_address: "",
  });

  const [jobSeeker, setJobSeeker] = useState({
    username: "",
    email: "",
    password: "",
    experience: "",
    bio: "",
    skills: "",
    status: true,
    availability: "",
    address: "",
  });

  const handleHiringManagerSubmit = (e) => {
    e.preventDefault();
    axios
      .post("https://apexrecruit-api-flask-app.onrender.com/hiringmanager/signup", hiringManager)
      .then((res) => {
        toast({
          position: "top",
          title: "Account created.",
          description: `${res.data.msg}`,
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      })
      .catch((err) => {
        console.log(err);
        toast({
          position: "top",
          title: "Error",
          description: `Something Went Wrong. Please Try Again`,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      });
  };

  const handleJobSeekerSubmit = (e) => {
    e.preventDefault();
    axios
      .post("https://apexrecruit-api-flask-app.onrender.com/jobseekers/signup", jobSeeker)
      .then((res) => {
        console.log(res);
        toast({
          position: "top",
          title: "Account created.",
          description: `${res.data.msg}`,
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        navigate("/login");
      })
      .catch((err) => {
        console.log(err);
        toast({
          position: "top",
          title: "Something went Wrong.",
          description: `${err.message}`,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      });
  };

  const handleHiringManagerChange = (e) => {
    const { name, value } = e.target;
    sethiringManager((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleJobSeekerChange = (e) => {
    const { name, value } = e.target;
    setJobSeeker((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <Box
      width={{ base: "100%", md: "600px" }}
      mx="auto"
      mt={{ base: "20px", md: "0" }}
      p={6}
      borderRadius="md"
      backgroundColor="white"
      boxShadow="lg"
    >
      <Tabs aria-selected isFitted variant="enclosed">
        <TabList>
          <Tab  _selected={{ color: 'white', bg: 'blue.500' }} >Hiring Manager</Tab>
          <Tab  _selected={{ color: 'white', bg: 'green.500' }}>Job Seeker</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Heading mb={4}>Hiring Manager</Heading>
            <form onSubmit={handleHiringManagerSubmit}>
              <FormControl isRequired>
                <FormLabel>Name</FormLabel>
                <Input
                  type="text"
                  name="name"
                  value={hiringManager.name}
                  placeholder="Enter your Name"
                  onChange={handleHiringManagerChange}
                />
                <FormLabel>Email address</FormLabel>
                <Input
                  type="email"
                  name="email"
                  value={hiringManager.email}
                  placeholder="Enter your email"
                  onChange={handleHiringManagerChange}
                />
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  name="password"
                  value={hiringManager.password}
                  onChange={handleHiringManagerChange}
                  placeholder="Enter your password"
                />
                <FormLabel>Company Name</FormLabel>
                <Input
                  name="company_name"
                  value={hiringManager.company_name}
                  onChange={handleHiringManagerChange}
                  placeholder="Enter Name Of the Company"
                />
                <FormLabel>Company Address</FormLabel>
                <Input
                  name="company_address"
                  value={hiringManager.company_address}
                  onChange={handleHiringManagerChange}
                  placeholder="Enter Address Of the Country"
                />
                <Button type="submit" colorScheme="teal" mt={4}>
                  Submit
                </Button>
              </FormControl>
            </form>
          </TabPanel>
          <TabPanel>
            <Heading mb={4}>Job Seeker</Heading>
            <form onSubmit={handleJobSeekerSubmit}>
              <FormControl isRequired>
                <FormLabel>Username</FormLabel>
                <Input
                  type="text"
                  name="username"
                  value={jobSeeker.username}
                  placeholder="Enter your username"
                  onChange={handleJobSeekerChange}
                />
                <FormLabel>Email address</FormLabel>
                <Input
                  type="email"
                  name="email"
                  value={jobSeeker.email}
                  placeholder="Enter your email"
                  onChange={handleJobSeekerChange}
                />
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  name="password"
                  value={jobSeeker.password}
                  onChange={handleJobSeekerChange}
                  placeholder="Enter your password"
                />
                <FormLabel>Address</FormLabel>
                <Input
                  type="text"
                  name="address"
                  value={jobSeeker.address}
                  onChange={handleJobSeekerChange}
                  placeholder="Enter your Address"
                />
                <FormLabel>Work Experience</FormLabel>
                <Select
                  placeholder="Experience Level"
                  name="experience"
                  value={jobSeeker.experience}
                  onChange={handleJobSeekerChange}
                >
                  <option value="Entry level">Entry Level</option>
                  <option value="Mid level">Mid Level</option>
                  <option value="Senior">Senior</option>
                </Select>
                <FormLabel>Bio</FormLabel>
                <Textarea
                  name="bio"
                  value={jobSeeker.bio}
                  onChange={handleJobSeekerChange}
                  placeholder="Tell us Something about yourself"
                />
                <FormLabel>Skills</FormLabel>
                <Input
                  type="text"
                  name="skills"
                  value={jobSeeker.skills}
                  onChange={handleJobSeekerChange}
                  placeholder="Enter your skills separated by comma eg:Html,Js,Css"
                />
                <FormLabel>Status</FormLabel>
                <Select
                  placeholder="Status"
                  name="status"
                  value={jobSeeker.status}
                  onChange={handleJobSeekerChange}
                >
                  <option value={true}>Active</option>
                  <option value={false}>InActive</option>
                </Select>
                <FormLabel>Availability</FormLabel>
                <Select
                  placeholder="Availability"
                  name="availability"
                  value={jobSeeker.availability}
                  onChange={handleJobSeekerChange}
                >
                  <option value="Full Time">Full Time</option>
                  <option value="Part Time">Part Time</option>
                </Select>
                <Button type="submit" colorScheme="teal" mt={4}>
                  Submit
                </Button>
              </FormControl>
            </form>
          </TabPanel>
        </TabPanels>
        <Text mt={2} textAlign="center">
          Already a registered user?{" "}
          <Link to={"/login"} style={{ color: "blue" }}>
            Login here
          </Link>
        </Text>
      </Tabs>
    </Box>
  );
};

export default Signup;
