
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getApplicants, updateApplicationStatus } from '../Redux/PostReducer/action';
import { Box, Text, Heading, List, ListItem, Avatar, Button, Select } from '@chakra-ui/react';

const Applications = ({ id }) => {
  const { applicants, token } = useSelector((store) => ({
    applicants: store.postReducer.applicants,
    token: store.authReducer.token,
  }));
  const dispatch = useDispatch();
  const [selectedStatus, setSelectedStatus] = useState('Pending');

  useEffect(() => {
    dispatch(getApplicants(id, token));
  }, [id, token]);

  const handleStatusChange = (applicationId, newStatus) => {
    dispatch(updateApplicationStatus(applicationId, token, newStatus)).then(() => {
      dispatch(getApplicants(id, token));
    });
  };

  return (
    <Box>
      {applicants.length === 0 ? (
        <Text>No applications have been submitted for this job posting.</Text>
      ) : (
        applicants.map((application) => (
          <Box key={application.application_id} p={4} borderWidth="1px" borderRadius="lg" mb={4}>
            <Heading as="h2" size="md">
              Application ID: {application.application_id}
            </Heading>
            <Text>Created At: {application.created_at}</Text>
            <Box mt={2}>
              <List>
                <ListItem textAlign="justify">
                  <Avatar size="sm" name={application.job_seeker.name} />{' '}
                  <strong>{application.job_seeker.name}</strong>
                </ListItem>
                <ListItem>
                  {' '}
                  <strong>Email:</strong> {application.job_seeker.email}
                </ListItem>
                <ListItem>
                  <strong>Experience:</strong> {application.job_seeker.experience}
                </ListItem>
                <ListItem>
                  <strong>Skills:</strong> {application.job_seeker.skills}
                </ListItem>
              </List>
            </Box>
            <Text>
              <strong>Status:</strong> {application.status}
            </Text>
            {/* Dropdown for changing the application status */}
            <Select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              maxWidth="150px"
              mt={2}
              mb={2}
            >
              <option value="Pending">Pending</option>
              <option value="Reviewed">Reviewed</option>
              <option value="Accepted">Accepted</option>
              <option value="Rejected">Rejected</option>
            </Select>
            {/* Button to update the status */}
            <Button
              onClick={() => handleStatusChange(application.application_id, selectedStatus)}
              colorScheme={selectedStatus === 'Accepted' ? 'green' : 'blue'}
            >
              UPDATE
            </Button>
          </Box>
        ))
      )}
    </Box>
  );
};

export default Applications;
