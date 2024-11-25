import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Typography,
  Box,
  Avatar,
  Chip
} from '@mui/material';
import { X } from 'lucide-react';
import moment from 'moment';

const ViewModal = ({ open, onClose, data, type }) => {
  const getTitle = () => {
    switch (type) {
      case 'event':
        return 'Event Details';
      case 'project':
        return 'Project Details';
      case 'user':
        return 'User Details';
      default:
        return 'Details';
    }
  };

  const renderContent = () => {
    if (!data) return null;

    switch (type) {
      case 'event':
        return (
          <Box className="space-y-4">
            <Box className="flex justify-between items-center">
              <Typography variant="h6">{data.name}</Typography>
              <Chip label={moment(data.createdAt).format('DD-MM-YYYY')} color="primary" size="small" />
            </Box>
            <Box className="bg-gray-50 p-4 rounded-lg">
              <Typography className="text-gray-600">{data.description}</Typography>
            </Box>
            <Box className="mt-4">
              <Typography variant="subtitle2" className="text-gray-500 mb-2">
                Feedback
              </Typography>
              {data.feedbacks?.map((feedback, index) => (
                <Box key={index} className="flex items-start space-x-3 mb-2">
                  <Avatar className="w-8 h-8">{feedback.createdBy[0]}</Avatar>
                  <Box>
                    <Typography variant="subtitle2">{feedback.createdBy}</Typography>
                    <Typography variant="body2" className="text-gray-600">
                      {feedback.feedback}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
        );

      case 'project':
        return (
          <Box className="space-y-4">
            <Typography variant="h6">{data.name}</Typography>
            <Box className="grid grid-cols-2 gap-4">
              <Box className="bg-gray-50 p-4 rounded-lg">
                <Typography variant="subtitle2" className="text-gray-500">
                  Project ID
                </Typography>
                <Typography>{data.id}</Typography>
              </Box>
              <Box className="bg-gray-50 p-4 rounded-lg">
                <Typography variant="subtitle2" className="text-gray-500">
                  Status
                </Typography>
                <Chip 
                  label={data.status} 
                  color={data.status === 'Active' ? 'success' : 'default'}
                  size="small" 
                />
              </Box>
            </Box>
            <Box className="mt-4">
              <Typography variant="subtitle2" className="text-gray-500 mb-2">
                Assigned Users
              </Typography>
              <Box className="flex flex-wrap gap-2">
                {data.users?.map((user, index) => (
                  <Chip
                    key={index}
                    avatar={<Avatar>{user[0]}</Avatar>}
                    label={user}
                    variant="outlined"
                  />
                ))}
              </Box>
            </Box>
          </Box>
        );

      case 'user':
        return (
          <Box className="space-y-4">
            <Box className="flex items-center space-x-4">
              <Avatar className="w-16 h-16">{data.name?.[0]}</Avatar>
              <Box>
                <Typography variant="h6">{data.name}</Typography>
                <Typography variant="body2" className="text-gray-600">
                  {data.projects?.length || 0} Projects
                </Typography>
              </Box>
            </Box>
            <Box className="mt-4">
              <Typography variant="subtitle2" className="text-gray-500 mb-2">
                Projects
              </Typography>
              <Box className="grid gap-2">
                {data.projects?.map((project, index) => (
                  <Box key={index} className="bg-gray-50 p-3 rounded-lg">
                    <Typography>{project}</Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          </Box>
        );

      default:
        return null;
    }
  };

  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle className="flex justify-between items-center">
        <Typography variant="h6">{getTitle()}</Typography>
        <IconButton onClick={onClose} size="small">
          <X className="h-5 w-5" />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        {renderContent()}
      </DialogContent>
    </Dialog>
  );
};

export default ViewModal;