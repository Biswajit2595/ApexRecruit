import { useState } from 'react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button, Input, Textarea } from '@chakra-ui/react';

const ProfileUpdateHiringManager = ({ isOpen, onClose, profile, updateProfile }) => {
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
      <ModalContent>
        <ModalHeader>Update Hiring Manager Profile</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Input name="name" value={updatedProfile.name} onChange={handleInputChange} mb={4} placeholder="Name" />
          <Input name="email" value={updatedProfile.email} onChange={handleInputChange} mb={4} placeholder="Email"isDisabled/>
          <Input name="company_name" value={updatedProfile.company_name} onChange={handleInputChange} mb={4} placeholder="Company Name" />
          <Input name="company_address" value={updatedProfile.company_address} onChange={handleInputChange} mb={4} placeholder="Company Address" />
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

export default ProfileUpdateHiringManager;
