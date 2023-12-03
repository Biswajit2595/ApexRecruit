import { useState } from 'react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button, Input, Textarea,Text,Select } from '@chakra-ui/react';

const ProfileUpdateJobSeeker = ({ isOpen, onClose, profile, updateProfile }) => {
  const [updatedProfile, setUpdatedProfile] = useState(profile);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedProfile((prevProfile) => ({ ...prevProfile, [name]: value }));
  };

  const handleSubmit = () => {
    updateProfile(updatedProfile);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent >
        <ModalHeader>Update Job Seeker Profile</ModalHeader>
        <ModalCloseButton />
        <ModalBody bgColor={'#efd4d4'}>
            <Text><strong>Username: </strong></Text>
            <Input bgColor={'white'} name="name" value={updatedProfile.username} onChange={handleInputChange} mb={4} placeholder="Name" />
            <Text><strong>Email: </strong></Text>
            <Input bgColor={'white'} name="email" value={updatedProfile.email} onChange={handleInputChange} mb={4} placeholder="Email" isDisabled/>
            <Text><strong>Experience: </strong></Text>
            <Select bgColor={'white'} name="experience" value={updatedProfile.experience} onChange={handleInputChange}>
                <option value="Entry Level">Entry Level</option>
                <option value="Mid Level">Mid Level</option>
                <option value="Senior">Senior</option>
            </Select>
            <Text><strong>Bio: </strong></Text>
            <Textarea bgColor={'white'} name="bio" value={updatedProfile.bio} onChange={handleInputChange} mb={4} placeholder="Bio" />
            <Text><strong>Skills: </strong></Text>
            <Input bgColor={'white'} name="skills" value={updatedProfile.skills} onChange={handleInputChange} mb={4} placeholder="Skills seperated by comma eg: HTML,CSS,JAVA" />

            <Text><strong>Status: </strong></Text>
            <Select bgColor={'white'} name='status' placeholder='Select status' value={updatedProfile.status} onChange={handleInputChange}>
                <option value={true}>Active</option>
                <option value={false}>InActive</option>
            </Select>
            <Text><strong>Availability: </strong></Text>
            <Select bgColor={'white'} name="availability" value={updatedProfile.availability} onChange={handleInputChange} mb={4} placeholder="Availability">
                <option value="Full-Time">Full Time</option>
                <option value="Part-Time">Part Time</option>
            </Select>
            <Text><strong>Address: </strong></Text>
            <Input bgColor={'white'} name="address" value={updatedProfile.address} onChange={handleInputChange} mb={4} placeholder="Address" />
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
            Save
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ProfileUpdateJobSeeker;
