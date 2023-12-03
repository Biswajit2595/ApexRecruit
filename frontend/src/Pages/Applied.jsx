import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAppliedjob } from '../Redux/PostReducer/action';
import { Box, Text, Stack, Badge, Divider,Flex } from "@chakra-ui/react";

const Applied = () => {
  const { id, token, appliedJobs } = useSelector((store) => ({
    id: store.authReducer.id,
    token: store.authReducer.token,
    appliedJobs: store.postReducer.appliedJobs,
  }));
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAppliedjob(id, token));
  }, [id]);

  return (
    <Stack p={6} m="auto" width={['100%', '80%', '60%']} spacing={4}>
      {appliedJobs &&
        appliedJobs.map((el) => (
          <Box
            key={el.id}
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            boxShadow="md"
            bg={el.status === 'APPLIED'
            ? 'blue.100'
            : el.status === 'Accepted'
            ? 'green.100'
            : el.status === 'Rejected'
            ? 'red.100'
            : 'gray.100'}
          >
            <Flex direction="column" p={4}>
              <Text fontSize="xl" fontWeight="bold" mb={2}>
                {el.job_posting.title}
              </Text>
              <Text mb={2}>Skills: {el.job_posting.skills}</Text>
              <Text mb={2}>Experience: {el.job_posting.experience}</Text>
              <Divider my={2} />
              <Text mb={2}>
                Application ID: <strong>{el.application_id}</strong>
              </Text>
              <Text mb={2}>
                Created At: <strong>{el.created_at}</strong>
              </Text>
              <Divider my={2} />
              <Text>
                Status:{' '}
                <Badge
                  colorScheme={
                    el.status === 'APPLIED'
                      ? 'blue'
                      : el.status === 'Accepted'
                      ? 'green'
                      : el.status === 'Rejected'
                      ? 'red'
                      : 'gray'
                  }
                >
                  {el.status}
                </Badge>
              </Text>
            </Flex>
          </Box>
        ))}
    </Stack>
  );
};

export default Applied;
