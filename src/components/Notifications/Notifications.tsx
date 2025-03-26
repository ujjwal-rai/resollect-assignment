import React from 'react';
import { Box, Typography, Paper, styled, Chip, Avatar, Badge } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import WarningIcon from '@mui/icons-material/Warning';
import InfoIcon from '@mui/icons-material/Info';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import DescriptionIcon from '@mui/icons-material/Description';

const NotificationContainer = styled(Paper)({
  padding: '16px',
  borderRadius: '8px',
  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  marginBottom: '16px',
  display: 'flex',
  alignItems: 'flex-start',
  gap: '16px',
  transition: 'transform 0.2s',
  cursor: 'pointer',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
  },
});

const NotificationIcon = styled(Box)(({ color }: { color: string }) => ({
  width: '40px',
  height: '40px',
  borderRadius: '50%',
  backgroundColor: `${color}10`,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
  '& .MuiSvgIcon-root': {
    color: color,
  },
}));

const NotificationContent = styled(Box)({
  flex: 1,
});

const TimeStamp = styled(Typography)({
  fontSize: '0.75rem',
  color: '#777',
  marginTop: '4px',
});

const notificationData = [
  {
    id: 1,
    title: 'Loan Approval',
    message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tempus magna et risus.',
    time: '2 hours ago',
    color: '#4caf50',
    icon: <CheckCircleIcon />,
    type: 'Success',
  },
  {
    id: 2,
    title: 'Document Required',
    message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris ultrices elit in turpis.',
    time: 'Yesterday',
    color: '#f44336',
    icon: <ErrorIcon />,
    type: 'Urgent',
  },
  {
    id: 3,
    title: 'Payment Due Reminder',
    message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam id dui vel urna feugiat.',
    time: '3 days ago',
    color: '#ff9800',
    icon: <WarningIcon />,
    type: 'Warning',
  },
  {
    id: 4,
    title: 'System Update',
    message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris iaculis nibh eget ligula.',
    time: '1 week ago',
    color: '#2196f3',
    icon: <InfoIcon />,
    type: 'Info',
  },
  {
    id: 5,
    title: 'New Notice Generated',
    message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus varius magna vel sapien.',
    time: '2 weeks ago',
    color: '#9c27b0',
    icon: <DescriptionIcon />,
    type: 'Notice',
  },
  {
    id: 6,
    title: 'Account Status Update',
    message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque eu erat vel neque.',
    time: '2 weeks ago',
    color: '#4caf50',
    icon: <CheckCircleIcon />,
    type: 'Success',
  },
  {
    id: 7,
    title: 'Missing Information',
    message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse volutpat enim et nisi.',
    time: '3 weeks ago',
    color: '#f44336',
    icon: <ErrorIcon />,
    type: 'Urgent',
  },
  {
    id: 8,
    title: 'Auction Scheduled',
    message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec eleifend tellus vel orci.',
    time: '1 month ago',
    color: '#ff9800',
    icon: <WarningIcon />,
    type: 'Warning',
  },
  {
    id: 9,
    title: 'Policy Update',
    message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi sit amet condimentum nunc.',
    time: '1 month ago',
    color: '#2196f3',
    icon: <InfoIcon />,
    type: 'Info',
  },
  {
    id: 10,
    title: 'Loan Status Change',
    message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce fringilla neque ac nisi.',
    time: '2 months ago',
    color: '#9c27b0',
    icon: <DescriptionIcon />,
    type: 'Notice',
  },
  {
    id: 11,
    title: 'Recovery Update',
    message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean feugiat mauris vel eros.',
    time: '2 months ago',
    color: '#4caf50',
    icon: <CheckCircleIcon />,
    type: 'Success',
  },
];

const Notifications = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 600 }}>
          Notifications
        </Typography>
        <Badge badgeContent={notificationData.length} color="primary">
          <NotificationsIcon color="action" />
        </Badge>
      </Box>
      
      {notificationData.map((notification) => (
        <NotificationContainer key={notification.id}>
          <NotificationIcon color={notification.color}>
            {notification.icon}
          </NotificationIcon>
          <NotificationContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.5 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                {notification.title}
              </Typography>
              <Chip 
                label={notification.type} 
                size="small" 
                sx={{ 
                  bgcolor: `${notification.color}10`, 
                  color: notification.color,
                  fontSize: '0.7rem',
                }}
              />
            </Box>
            <Typography variant="body2">
              {notification.message}
            </Typography>
            <TimeStamp>
              {notification.time}
            </TimeStamp>
          </NotificationContent>
        </NotificationContainer>
      ))}
    </Box>
  );
};

export default Notifications; 