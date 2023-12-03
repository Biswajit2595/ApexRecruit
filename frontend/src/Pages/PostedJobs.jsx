import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCreatedpost } from '../Redux/PostReducer/action'
import { Box, Text, Avatar,Button,VStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";



const PostedJobs = () => {
  const { id, postedJobs, token } = useSelector((store) => ({
    id: store.authReducer.id,
    token: store.authReducer.token,
    postedJobs: store.postReducer.postedJobs,
  }));

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCreatedpost(token));
  }, []);

  return (
    <VStack spacing={4} align="stretch" w={['90%', '70%', '60%']} m="auto">
      {postedJobs.map((el) => (
        <Box
          key={el.id}
          p={5}
          borderRadius="md"
          borderWidth="1px"
          boxShadow="md"
          w="100%"
          _hover={{ shadow: 'lg' }}
        >
          <Avatar name={el.company_name} size="md" mb={3} />
          <Text fontSize="xl" fontWeight="bold">
            {el.role}
          </Text>
          <Text color="gray.600">{el.company_name}</Text>
          <Text>{el.employment_type}</Text>
          <Text>{el.experience}</Text>
          <Text>{el.skills}</Text>
          <Text>{el.location}</Text>
          <Link to={`/postedjobs/view/${el.id}`}>
            <Button
              colorScheme="teal"
              mt={3}
              _hover={{ color: 'white', bgColor: 'teal.600' }}
            >
              View Applicants
            </Button>
          </Link>
        </Box>
      ))}
    </VStack>
  );
};

export default PostedJobs;