
import { Box, Avatar, Text, Heading, Button, useBreakpointValue } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getProfileHiringManager,
  getProfileJobSeeker,
  updateHiringManagerProfile,
  updateJobseekerProfile,
} from '../Redux/AuthReducer/action';
import ProfileUpdateHiringManager from './ProfileUpdateHiringManager';
import ProfileUpdateJobSeeker from './ProfileUpdateJobSeeker';

const Profile = ({ width }) => {
  const [isHiringManagerModalOpen, setIsHiringManagerModalOpen] = useState(false);
  const [isJobSeekerModalOpen, setIsJobSeekerModalOpen] = useState(false);
  const dispatch = useDispatch();

  const { id, profile, role, token } = useSelector((store) => ({
    id: store.authReducer.id,
    role: store.authReducer.role,
    profile: store.authReducer.profile,
    token: store.authReducer.token,
  }));

  useEffect(() => {
    if (role === 'Hiring Manager') {
      dispatch(getProfileHiringManager(id));
    } else {
      dispatch(getProfileJobSeeker(id));
    }
  }, [id, role]);

  const handleUpdateHiringManagerProfile = (updatedProfile) => {
    dispatch(updateHiringManagerProfile(id, updatedProfile, token)).then(() => {
      dispatch(getProfileHiringManager(id));
    });
  };

  const handleUpdateJobSeekerProfile = (updatedProfile) => {
    dispatch(updateJobseekerProfile(id, updatedProfile, token)).then(() => {
      dispatch(getProfileJobSeeker(id));
    });
    console.log('Updating job seeker profile:', updatedProfile);
  };

  // Set height based on screen size
  const profileHeight = useBreakpointValue({ base: 'auto', md: '100vh' });

  return (
    <Box
      pt={6}
      bgColor="#bbdfe4"
      pb={6}
      h={profileHeight}
      position="sticky"
      w={width}
      borderWidth={1}
      textAlign="left"
      borderRadius={8}
      boxShadow="lg"
    >
      <Heading p={2} bgColor="blue.300" as="h2" size="xl" mb={6} color="white">
        {role}
      </Heading>
      {role === 'Hiring Manager' && (
        <Box>
          <Avatar ml={4} size="xl" name={profile.name} />
          <Text ml={2} fontSize="23px" fontWeight="bold">
            {profile.name}
          </Text>
          <Text ml={2}>{profile.email}</Text>
          <Text ml={2}>{profile.company_name}</Text>
          <Text ml={2}>{profile.company_address}</Text>
          <Button
            ml={4}
            my={3}
            bgColor="teal"
            color="white"
            _hover={{ bgColor: 'blue.200', color: 'black' }}
            onClick={() => setIsHiringManagerModalOpen(true)}
          >
            Update Profile
          </Button>
          <ProfileUpdateHiringManager
            isOpen={isHiringManagerModalOpen}
            onClose={() => setIsHiringManagerModalOpen(false)}
            profile={profile}
            updateProfile={handleUpdateHiringManagerProfile}
          />
        </Box>
      )}
      {role === 'Job Seeker' && (
        <Box>
          <Avatar ml={4} size="xl" name={profile.username} />
          <Text ml={4} fontSize="23px" fontWeight="bold">
            {profile.username}
          </Text>
          <Text ml={4}>{profile.email}</Text>
          <Text ml={4}>Exp: {profile.experience}</Text>
          <Text ml={2} m={2}>
            {profile.bio}
          </Text>
          <Text ml={4}>{profile.skills}</Text>
          <Text ml={4}>Status: {profile.status ? 'Active' : 'Inactive'}</Text>
          <Text ml={4}>{profile.availability}</Text>
          <Text ml={4}>{profile.address}</Text>
          <Button
            ml={4}
            my={3}
            bgColor="teal"
            color="white"
            _hover={{ bgColor: 'blue.200', color: 'black' }}
            onClick={() => setIsJobSeekerModalOpen(true)}
          >
            Update Profile
          </Button>
          <ProfileUpdateJobSeeker
            isOpen={isJobSeekerModalOpen}
            onClose={() => setIsJobSeekerModalOpen(false)}
            profile={profile}
            updateProfile={handleUpdateJobSeekerProfile}
          />
        </Box>
      )}
    </Box>
  );
};

export default Profile;


