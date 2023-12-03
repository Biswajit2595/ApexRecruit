import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { Box, Text, Heading,Button,HStack,useToast } from "@chakra-ui/react";
import { getSingleJobPost, jobApply } from "../Redux/PostReducer/action";

const SinglesinglePost = () => {
  const { id } = useParams();
  const { singlePost,userId,token,isAuth } = useSelector((store) => ({
    isLoading: store.postReducer.isLoading,
    isError: store.postReducer.isError,
    singlePost: store.postReducer.singlePost,
    userId:store.authReducer.id,
    token:store.authReducer.token,
    isAuth:store.authReducer.isAuth
  }));
  const toast=useToast()
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSingleJobPost(id));
  }, [id]);

  const handleApply=()=>{
    dispatch(jobApply(id,token)).then(() => {
      toast({
        position:"top",
        title:'Application Successfull',
        description: `You have successfully applied for the ${singlePost.title}`,
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
    }).catch(() => {
      toast({
        position:"top",
        title:'Error',
        description: `Something Went Wrong Please try again`,
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    });
  }



  return (
    <Box gap={5} textAlign='start'  borderRadius={8} boxShadow="lg">
      <Box p={4} m={5} boxShadow="lg" borderRadius={5}>
        <Text fontSize='lg' >
          <strong>Hiring For {singlePost.title}</strong>
        </Text>
        <Text color={"GrayText"}>
            {singlePost.company_name}
        </Text>
        <Text color={"GrayText"}>{singlePost.experience} | {singlePost.salary}</Text>
        <Text color={"GrayText"}>{singlePost.location}</Text>
        <Text>
          <strong>Status:</strong> {singlePost.status}
        </Text>
        <HStack justifyContent="space-between">
        <Text>Posted On: {singlePost.created_at}</Text>
        <Button onClick={handleApply} bgColor='blue.400' color='white' _hover={{color:"black",bgColor:"teal"}}>Apply</Button>
        </HStack>
        </Box>
        <Box p={4} m={4} boxShadow="md" borderRadius={5}>
        <Text><strong>Description:</strong></Text>
        <Text>{singlePost.description}</Text>
        <Text>
          <strong>Role:</strong> {singlePost.role}
        </Text>
        <Text>
          <strong>Industry:</strong> {singlePost.industry}
        </Text>
        <Text>
          <strong>Department:</strong> {singlePost.department}
        </Text>
        <Text>
          <strong>Employment Type:</strong> {singlePost.employment_type}
        </Text>
        <Text><strong>Education:</strong></Text>
        <Text>{singlePost.education}</Text>
        <Text>
          <strong>Key Skills:</strong>
        </Text>
        <Text> {singlePost.skills}</Text>
        <Text>
          <strong>Start Date:</strong> {singlePost.start_date}
        </Text>
        <Text>
          <strong>End Date:</strong> {singlePost.end_date}
        </Text>
      </Box>
    </Box>
  );
};

export default SinglesinglePost;
