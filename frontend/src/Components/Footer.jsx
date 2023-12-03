import { Box, Flex, Text, Link, VStack, HStack } from "@chakra-ui/react";

const Footer = () => {
  return (
    <Box as="footer" paddingInline={4} pt={2} mt="auto" bgColor="teal.500" color="white">
      <VStack spacing={4} align="center">
        <Text fontSize="lg" fontWeight="bold">
          Connect with Apex Recruit
        </Text>
        <HStack spacing={4}>
          <Link href="#" color="white">
            Facebook
          </Link>
          <Link href="#" color="white">
            Twitter
          </Link>
          <Link href="#" color="white">
            LinkedIn
          </Link>
        </HStack>
      </VStack>

      <Flex justify="space-between" mt={8}>
        <Text>&copy; 2023 Apex Recruit. All rights reserved.</Text>
        <HStack spacing={4}>
          <Link href="#">Privacy Policy</Link>
          <Link href="#">Terms of Service</Link>
        </HStack>
      </Flex>
    </Box>
  );
};

export default Footer;
