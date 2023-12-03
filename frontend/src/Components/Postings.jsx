import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getJobPosts } from "../Redux/PostReducer/action";
import { Box, Text, Avatar,Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const Postings = ({ width }) => {
  const { jobposts, isLoading, isError } = useSelector((store) => ({
    jobposts: store.postReducer.jobposts,
    isLoading: store.postReducer.isLoading,
    isError: store.postReducer.isError,
  }));

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getJobPosts());
  }, []);
  // console.log(jobposts)

  return (
    <Box w={width}>
      {jobposts.map((el) => (
        <Box key={el.id} padding={5} boxShadow="lg">
          <Avatar name={el.company_name} />
          <Text>{el.role}</Text>
          <Text>{el.company_name}</Text>
          <Text>{el.employment_type}</Text>
          <Text>{el.experience}</Text>
          <Text>{el.skills}</Text>
          <Text>{el.location}</Text>
          <Link to={`/job/view/${el.id}`}><Button color='white' backgroundColor='teal'>View Full Details</Button></Link>
        </Box>
      ))}
    </Box>
  );
};

export default Postings;
