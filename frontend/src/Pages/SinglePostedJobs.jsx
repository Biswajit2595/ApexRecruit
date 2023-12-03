
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Box,
  Text,
  Divider,
  useMediaQuery,
  VStack,
  Flex,
  Select,
  Button,
  Spacer,
  useToast,
} from "@chakra-ui/react";
import { useNavigate,useParams } from "react-router-dom";
import {
  deleteJobPost,
  getRecommendations,
  getSingleCreatedpost,
  updateJobPostStatus,
} from "../Redux/PostReducer/action";
import Applications from "../Components/Applications";
import RecommendationModal from "../Components/RecommendationModal";

const SinglePostedJobs = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const toast = useToast();
  const { singlePostedJob, token, recommendations } = useSelector((store) => ({
    isLoading: store.postReducer.isLoading,
    isError: store.postReducer.isError,
    singlePostedJob: store.postReducer.singlePostedJob,
    userId: store.authReducer.id,
    token: store.authReducer.token,
    recommendations: store.postReducer.recommendations,
  }));
  const dispatch = useDispatch();
  const [status, setStatus] = useState("Open");
  const [isLargerThan768] = useMediaQuery("(min-width: 768px)");
  const [isRecommendationModalOpen, setIsRecommendationModalOpen] = useState(
    false
  );

  useEffect(() => {
    dispatch(getSingleCreatedpost(id, token));
  }, [id]);

  const handleStatusUpdate = () => {
    dispatch(updateJobPostStatus(id, token, status)).then(() => {
      toast({
        position: "top",
        title: "Status Updated.",
        description: `Application Status has been successfully Updated`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      dispatch(getSingleCreatedpost(id, token));
    });
  };

  const handleDelete = () => {
    dispatch(deleteJobPost(id, token)).then(() => {
      toast({
        position: "top",
        title: "Post Deleted.",
        description: `Application has been successfully Deleted`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      navigate("/postedjobs");
    });
  };

  const handleRecommendations = () => {
    dispatch(getRecommendations(id, token));
    setIsRecommendationModalOpen(true);
  };

  return (
    <VStack spacing={8} align="start" width="100%" p={5}>
      <Flex
        direction={{ base: "column", md: "row" }}
        width="100%"
        justify="space-between"
      >
        <Box
          width={isLargerThan768 ? "45%" : "100%"}
          boxShadow="lg"
          borderRadius={5}
          p={8}
          bg="white"
        >
          <Text fontSize="2xl" fontWeight="bold">
            Hiring For {singlePostedJob.title}
          </Text>
          <Text color="gray.500">{singlePostedJob.company_name}</Text>
          <Text color="gray.500">
            {singlePostedJob.experience} | {singlePostedJob.salary}
          </Text>
          <Text color="gray.500">{singlePostedJob.location}</Text>
          <Flex alignItems="center" gap={2} flexWrap="wrap">
            <Text>
              <strong>Status:</strong> {singlePostedJob.status}
            </Text>
            <Spacer />
            <Select
              maxWidth={{ base: "100%", md: "20%" }}
              mt={{ base: 2, md: 0 }}
              mb={2}
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="Open">Open</option>
              <option value="Filled">Filled</option>
              <option value="In Progress">In Progress</option>
            </Select>
            {/* Button to update the status */}
            <Button
              colorScheme="teal"
              onClick={handleStatusUpdate}
              mb={{ base: 2, md: 0 }}
            >
              UPDATE
            </Button>
            <Button colorScheme="red" onClick={handleDelete} mb={2}>
              Delete
            </Button>
          </Flex>
        
          <Button colorScheme="teal" onClick={handleRecommendations}>
            Recommendations
          </Button>
          <Text>Posted On: {singlePostedJob.created_at}</Text>
          <Divider my={4} />
          <Text fontSize="xl" fontWeight="bold">
            Description:
          </Text>
          <Text>{singlePostedJob.description}</Text>
          <Text fontSize="xl" fontWeight="bold">
            Role:
          </Text>
          <Text>{singlePostedJob.role}</Text>
          <Text fontSize="xl" fontWeight="bold">
            Industry:
          </Text>
          <Text>{singlePostedJob.industry}</Text>
          <Text fontSize="xl" fontWeight="bold">
            Department:
          </Text>
          <Text>{singlePostedJob.department}</Text>
          <Text fontSize="xl" fontWeight="bold">
            Employment Type:
          </Text>
          <Text>{singlePostedJob.employment_type}</Text>
          <Text fontSize="xl" fontWeight="bold">
            Education:
          </Text>
          <Text>{singlePostedJob.education}</Text>
          <Text fontSize="xl" fontWeight="bold">
            Key Skills:
          </Text>
          <Text>{singlePostedJob.skills}</Text>
          <Text fontSize="xl" fontWeight="bold">
            Start Date:
          </Text>
          <Text>{singlePostedJob.start_date}</Text>
          <Text fontSize="xl" fontWeight="bold">
            End Date:
          </Text>
          <Text>{singlePostedJob.end_date}</Text>
        </Box>

        <Divider
          orientation={{ base: "horizontal", md: "vertical" }}
          mx={5}
          borderColor="gray.300"
        />

        <Box
          width={isLargerThan768 ? "50%" : "100%"}
          boxShadow="lg"
          borderRadius={5}
          p={8}
          bg="white"
        >
          <Applications id={id} />
        </Box>
      </Flex>
      {/* Modal for Recommendations */}
      <RecommendationModal
        isOpen={isRecommendationModalOpen}
        onClose={() => setIsRecommendationModalOpen(false)}
        recommendations={recommendations}
      />
    </VStack>
  );
};

export default SinglePostedJobs;
