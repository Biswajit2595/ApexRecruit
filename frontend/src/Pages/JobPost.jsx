import {
  Box,
  Input,
  Textarea,
  Button,
  FormControl,
  FormLabel,
  Select,
  Flex,
  Stack,
  useToast
} from "@chakra-ui/react";
import { useDispatch, useSelector } from 'react-redux'
import { useState } from "react";
import Profile from "../Components/Profile";
import { postJobs } from "../Redux/PostReducer/action";

const JobPost = () => {
  const token=useSelector(store=>store.authReducer.token)
  const dispatch=useDispatch()
  const toast=useToast()
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    role: "",
    company_name: "",
    department: "",
    employment_type: "",
    education: "",
    industry: "",
    skills: "",
    salary: "",
    experience: "",
    status: "",
    start_date: "",
    end_date: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(postJobs(token,formData)).then(()=>{
      toast({
        position: "top",
        title: "Job Created.",
        description: `Job Post Successfully for ${formData.title}`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    })
    // console.log(formData);
  };

  return (
    <Stack
      direction={{ base: "column", md: "row" }}
      spacing={{ base: 4, md: 0 }}
      p={4}
      mx="auto"
      maxW="1200px"
      gap={5}
    >
      <Box flex={{ base: "1", md: "3" }} mb={{ base: 4, md: 0 }}>
        <Profile />
      </Box>

      <Box flex={{ base: "1", md: "7" }}>
        <Box borderWidth="1px" p={4} borderRadius="md" boxShadow="md">
          <form onSubmit={handleSubmit}>
            <Stack spacing={4}>
              <FormControl isRequired>
                <FormLabel>Title</FormLabel>
                <Input
                  type="text"
                  name="title"
                  placeholder="Enter Title of the job"
                  value={formData.title}
                  onChange={handleChange}
                  isRequired
                />

                <FormLabel>Description</FormLabel>
                <Textarea
                  name="description"
                  placeholder="Enter job Description"
                  value={formData.description}
                  onChange={handleChange}
                  isRequired
                />

              <FormLabel>Location</FormLabel>
              <Input
                type="text"
                name="location"
                placeholder="Enter Location"
                value={formData.location}
                onChange={handleChange}
                isRequired
              />

              <FormLabel>Role</FormLabel>
              <Input
                type="text"
                name="role"
                placeholder="Enter Role for the Job"
                value={formData.role}
                onChange={handleChange}
                isRequired
              />

              <FormLabel>Company Name</FormLabel>
              <Input
                type="text"
                name="company_name"
                placeholder="Enter Name Of the Company"
                value={formData.company_name}
                onChange={handleChange}
                isRequired
              />

              <FormLabel>Department</FormLabel>
              <Input
                type="text"
                name="department"
                placeholder="Enter Department of the Job"
                value={formData.department}
                onChange={handleChange}
                isRequired
              />

              <FormLabel>Employment Type</FormLabel>
              <Input
                type="text"
                name="employment_type"
                placeholder="Enter Type Of Employment"
                value={formData.employment_type}
                onChange={handleChange}
                isRequired
              />

              <FormLabel>Education</FormLabel>
              <Input
                type="text"
                name="education"
                placeholder="Enter Education Details"
                value={formData.education}
                onChange={handleChange}
                isRequired
              />

              <FormLabel>Industry</FormLabel>
              <Input
                type="text"
                name="industry"
                placeholder="Enter Industry"
                value={formData.industry}
                onChange={handleChange}
                isRequired
              />

              <FormLabel>Skills</FormLabel>
              <Input
                type="text"
                name="skills"
                placeholder="Enter the Required skills for the Job"
                value={formData.skills}
                onChange={handleChange}
                isRequired
              />

              <FormLabel>Salary</FormLabel>
              <Input
                type="text"
                name="salary"
                placeholder="Enter Salary for the Job"
                value={formData.salary}
                onChange={handleChange}
                isRequired
              />

              <FormLabel>Experience</FormLabel>
              <Select
                placeholder="Experience Level"
                name="experience"
                onChange={handleChange}
                isRequired
              >
                <option value="Entry level">Entry Level</option>
                <option value="Mid Level">Mid Level</option>
                <option value="Senior">Senior</option>
              </Select>

              <FormLabel>Status</FormLabel>
              <Select
                placeholder="Status"
                name="status"
                onChange={handleChange}
                isRequired
              >
                <option value="open">Open</option>
                <option value="in progress">In Progress</option>
                <option value="filled">Filled</option>
              </Select>

              <FormLabel>Start Date</FormLabel>
              <Input
                type="text"
                name="start_date"
                value={formData.start_date}
                onChange={handleChange}
                isRequired
              />

<FormLabel>End Date</FormLabel>
                <Input
                  type="text"
                  name="end_date"
                  value={formData.end_date}
                  onChange={handleChange}
                  isRequired
                />
              </FormControl>

              <Flex justify="center">
                <Button type="submit" colorScheme="teal">
                  Submit
                </Button>
              </Flex>
            </Stack>
          </form>
        </Box>
      </Box>
    </Stack>
  );
};
export default JobPost;
