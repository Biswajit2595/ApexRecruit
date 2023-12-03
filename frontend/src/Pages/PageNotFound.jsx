
import { Box, Text, Image } from "@chakra-ui/react";
import notFoundImage from "../images/pagenotFound.png"; // Replace with the actual path to your image

const PageNotFound = () => {
  return (
    <Box textAlign="center" p={5} mt={10}>
      <Image src={notFoundImage} alt="404 Image" boxSize="500px" mx="auto" mb={6} />
      <Text fontSize="3xl" fontWeight="bold" color="red.500">
        404 - Page Not Found
      </Text>
      <Text fontSize="xl" mt={3}>
        Oops! The page you are looking for does not exist.
      </Text>
    </Box>
  );
};

export default PageNotFound;

