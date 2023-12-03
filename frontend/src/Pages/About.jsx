import { Box, Heading, Text, Image, Center } from "@chakra-ui/react";

const About = () => {
  return (
    <Box p={8} textAlign="center" minH="100vh">
      <Center>
        <Box maxW="800px">
          <Heading as="h1" size="xl" mb={4}>
            About Apex Recruit
          </Heading>

          <Text fontSize="lg" color="gray.500" mb={8}>
            Apex Recruit is your premier job search platform, connecting talented
            individuals with exciting career opportunities.
          </Text>

          <Image
            src="/path/to/your/image.jpg"
            alt="About Apex Recruit"
            mb={6}
            borderRadius="md"
          />

          <Text fontSize="lg" mb={4}>
            Our Mission
          </Text>

          <Text>
            At Apex Recruit, our mission is to simplify the job search process,
            providing a seamless experience for both job seekers and employers.
            We aim to match the right talent with the right job, fostering
            success and growth in every career journey.
          </Text>

          <Text fontSize="lg" mt={8} mb={4}>
            Contact Us
          </Text>

          <Text>
            If you have any questions or feedback, feel free to contact us at{" "}
            <strong>info@apexrecruit.com</strong>.
          </Text>
        </Box>
      </Center>
    </Box>
  );
};

export default About;
