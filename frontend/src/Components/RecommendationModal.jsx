

import {
  Modal,
  ModalBody,
  ModalOverlay,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalFooter,
  Text,
  Button,
} from "@chakra-ui/react";

const RecommendationModal = ({ isOpen, onClose, recommendations }) => {
    // Split the recommendations string by newline character
    const recommendationLines = recommendations ? recommendations.split("\n") : [];
  
    return (
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Recommendations</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {/* Map through the lines and display each as a separate Text element */}
            {recommendationLines.map((line, index) => (
              <Text key={index}>{line}</Text>
            ))}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="teal" onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    );
  };
  

export default RecommendationModal;
