
// import { Link } from "react-router-dom";
// import {
//   Box,
//   Flex,
//   Heading,
//   Text,
//   Button,
//   VStack,
//   Image,
//   SimpleGrid,
// } from "@chakra-ui/react";
// import photo from '../images/Daco_4975211.png'
// import accounr from '../images/accountcreate.png'
// import excited from '../images/excited.png'

// const Home = () => {
//   return (
//     <Box p={8} textAlign="center">
//       <Flex direction="column" align="center" justify="center">
//         {/* Logo */}
//         <Image
//           src={photo} 
//           alt="Apex Recruit Logo"
//           mb={4}
//         />

//         {/* Heading */}
//         <Heading as="h1" size="xl" mb={4}>
//           Welcome to Apex Recruit
//         </Heading>

//         {/* Subheading */}
//         <Text fontSize="lg" color="gray.500" mb={8}>
//           Your Premier Job Search Platform
//         </Text>

//         {/* Call-to-Action Button */}
//         <Link to="/jobs">
//           <Button colorScheme="teal" size="lg">
//             Explore Jobs
//           </Button>
//         </Link>
//       </Flex>

//       {/* Featured Sections */}
//       <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8} mt={12}>
//         <Box>
//           <Heading as="h2" size="lg" mb={4}>
//             Why Apex Recruit?
//           </Heading>
//           <Text>
//             Discover a world of exciting career opportunities tailored to your
//             skills and preferences.
//           </Text>
//           <Image src={excited}/>
//         </Box>

//         <Box>
//           <Heading as="h2" size="lg" mb={4}>
//             How It Works
//           </Heading>
//           <Text>
//             Create an account, explore jobs, and apply with ease. Apex Recruit
//             simplifies your job search journey.
//           </Text>
//           <Image src={accounr}/>
//         </Box>
//       </SimpleGrid>
//     </Box>
//   );
// };

// export default Home;

import { Link } from "react-router-dom";
import {
  Box,
  Flex,
  Heading,
  Text,
  Button,
  VStack,
  HStack,
  Image,
  SimpleGrid,
} from "@chakra-ui/react";
import photo from '../images/Daco_4975211.png'
import accounr from '../images/accountcreate.png'
import excited from '../images/excited.png'

const Home = () => {
  return (
    <Box p={8} textAlign="center">
      <Flex direction="column" align="center" justify="center">
        {/* Logo */}
        <Image
          src={photo} 
          alt="Apex Recruit Logo"
          mb={4}
        />

        {/* Heading */}
        <Heading as="h1" size="xl" mb={4}>
          Welcome to Apex Recruit
        </Heading>

        {/* Subheading */}
        <Text fontSize="lg" color="gray.500" mb={8}>
          Your Premier Job Search Platform
        </Text>

        {/* Call-to-Action Button */}
        <Link to="/jobs">
          <Button colorScheme="teal" size="lg">
            Explore Jobs
          </Button>
        </Link>
      </Flex>

      {/* Featured Sections */}
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8} mt={12}>
        <Box>
          <HStack align="start" spacing={4}>
            <Box>
            <Heading as="h2" size="lg" mb={4}>
              Why Apex Recruit?
            </Heading>
            <Text>
              Discover a world of exciting career opportunities tailored to your
              skills and preferences.
            </Text>
            </Box>
            <Image src={excited} boxSize="200px" borderRadius="md" />
          </HStack>
        </Box>

        <Box>
          <HStack align="start" spacing={4}>
            <Box>
            <Heading as="h2" size="lg" mb={4}>
              How It Works
            </Heading>
            <Text>
              Create an account, explore jobs, and apply with ease. Apex Recruit
              simplifies your job search journey.
            </Text>
            </Box>
            <Image src={accounr} boxSize="200px" borderRadius="md" />
          </HStack>
        </Box>
      </SimpleGrid>
    </Box>
  );
};

export default Home;
