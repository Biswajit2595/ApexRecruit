import { Box, HStack, useBreakpointValue } from '@chakra-ui/react';
import Profile from '../Components/Profile';
import Postings from '../Components/Postings';

const Jobs = () => {
  const profileWidth = useBreakpointValue({ base: '100%', md: '30%' });
  const postingsWidth = useBreakpointValue({ base: '100%', md: '60%' });

  return (
    <Box>
      <HStack flexDirection={{ base: 'column', md: 'row' }} m={4} alignItems="flex-start">
        <Profile width={profileWidth} />
        <Postings width={postingsWidth} />
      </HStack>
    </Box>
  );
};

export default Jobs;
