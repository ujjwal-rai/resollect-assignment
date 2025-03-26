import React, { useState, useEffect } from 'react';
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  styled,
  useMediaQuery,
  useTheme,
  Divider,
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import FolderIcon from '@mui/icons-material/Folder';
import NotificationsIcon from '@mui/icons-material/Notifications';
import DescriptionIcon from '@mui/icons-material/Description';
import GavelIcon from '@mui/icons-material/Gavel';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import SettingsIcon from '@mui/icons-material/Settings';
import PeopleIcon from '@mui/icons-material/People';
import LockIcon from '@mui/icons-material/Lock';

// Define prop interfaces for styled components
interface CustomStyledProps {
  ismobile?: string;
  isdrawer?: string;
}

const SidebarContainer = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'ismobile' && prop !== 'isdrawer'
})<CustomStyledProps>(({ ismobile, isdrawer }) => ({
  width: isdrawer === 'true' ? '100%' : (ismobile === 'true' ? '100%' : 320),
  flexShrink: 0,
  backgroundColor: '#ffffff',
  height: isdrawer === 'true' ? '100%' : (ismobile === 'true' ? 'auto' : '100%'),
  overflowY: 'auto',
  borderRight: isdrawer === 'true' ? 'none' : (ismobile === 'true' ? 'none' : '1px solid #e0e0e0'),
  borderBottom: ismobile === 'true' && isdrawer !== 'true' ? '1px solid #e0e0e0' : 'none',
  display: 'flex',
  flexDirection: 'column',
  paddingTop: isdrawer === 'true' ? '8px' : 0,
}));

const StyledList = styled(List, {
  shouldForwardProp: (prop) => prop !== 'ismobile' && prop !== 'isdrawer'
})<CustomStyledProps>(({ ismobile, isdrawer }) => ({
  display: 'flex',
  flexDirection: isdrawer === 'true' ? 'column' : (ismobile === 'true' ? 'row' : 'column'),
  paddingTop: 0,
  paddingBottom: 0,
  width: '100%',
  overflowY: isdrawer === 'true' ? 'auto' : 'initial',
  maxHeight: isdrawer === 'true' ? 'calc(100vh - 80px)' : 'none',
}));

interface ListButtonProps extends CustomStyledProps {
  selected?: boolean;
}

const StyledListItemButton = styled(ListItemButton, {
  shouldForwardProp: (prop) => prop !== 'ismobile' && prop !== 'isdrawer'
})<ListButtonProps>(({ selected, ismobile, isdrawer }) => ({
  padding: ismobile === 'true' && isdrawer !== 'true' ? '8px 12px' : '10px 24px',
  minWidth: ismobile === 'true' && isdrawer !== 'true' ? '100px' : 'auto',
  justifyContent: ismobile === 'true' && isdrawer !== 'true' ? 'center' : 'flex-start',
  borderRadius: 0,
  '&:hover': {
    backgroundColor: '#f5f5f5',
  },
  ...(selected && {
    backgroundColor: '#e3f2fd',
    '&::before': {
      content: '""',
      position: 'absolute',
      left: ismobile === 'true' && isdrawer !== 'true' ? 'auto' : 0,
      top: ismobile === 'true' && isdrawer !== 'true' ? 0 : 'auto',
      right: ismobile === 'true' && isdrawer !== 'true' ? 'auto' : 'auto',
      bottom: ismobile === 'true' && isdrawer !== 'true' ? 0 : 'auto',
      width: ismobile === 'true' && isdrawer !== 'true' ? '100%' : '4px',
      height: ismobile === 'true' && isdrawer !== 'true' ? '4px' : '100%',
      backgroundColor: '#1976d2',
    },
    '& .MuiListItemIcon-root': {
      color: '#1976d2',
    },
    '& .MuiTypography-root': {
      color: '#1976d2',
      fontWeight: 600,
    },
  }),
}));

const StyledListItemIcon = styled(ListItemIcon, {
  shouldForwardProp: (prop) => prop !== 'ismobile' && prop !== 'isdrawer'
})<CustomStyledProps>(({ ismobile, isdrawer }) => ({
  minWidth: ismobile === 'true' && isdrawer !== 'true' ? 'auto' : 56,
  color: '#555',
  justifyContent: ismobile === 'true' && isdrawer !== 'true' ? 'center' : 'flex-start',
  '& .MuiSvgIcon-root': {
    fontSize: '1.2rem',
  },
}));

const StyledListItemText = styled(ListItemText, {
  shouldForwardProp: (prop) => prop !== 'ismobile' && prop !== 'isdrawer'
})<CustomStyledProps>(({ ismobile, isdrawer }) => ({
  '& .MuiTypography-root': {
    fontWeight: 500,
    color: '#333',
    display: ismobile === 'true' && isdrawer !== 'true' ? 'none' : 'block',
    fontSize: '0.9rem',
  },
}));

const FooterContainer = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'ismobile'
})<{ ismobile?: string }>(({ ismobile }) => ({
  marginTop: 'auto',
  padding: '16px',
  borderTop: '1px solid #e0e0e0',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  opacity: 0.5,
}));

const FooterLogo = styled('img')({
  height: '16px',
  marginLeft: '6px',
});

const menuItems = [
  { text: 'Dashboard', icon: <DashboardIcon /> },
  { text: 'Portfolio', icon: <FolderIcon /> },
  { text: 'Notifications', icon: <NotificationsIcon /> },
  { text: 'Notices', icon: <DescriptionIcon /> },
  { text: 'Auction', icon: <GavelIcon /> },
  { text: 'Data Upload', icon: <CloudUploadIcon /> },
  { text: 'Control Panel', icon: <SettingsIcon /> },
  { text: 'User Management', icon: <PeopleIcon /> },
  { text: 'Permissions', icon: <LockIcon /> },
];

interface SidebarProps {
  onSectionChange?: (section: string, index: number) => void;
  inDrawer?: boolean;
  selectedIndex?: number;
}

const Sidebar = ({ onSectionChange, inDrawer = false, selectedIndex: propSelectedIndex }: SidebarProps) => {
  const [localSelectedIndex, setLocalSelectedIndex] = useState(1); // Default to Portfolio
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isDrawer = inDrawer || (isMobile && document.querySelector('.MuiDrawer-root')) !== null;
  
  // Use the prop value if available, otherwise use local state
  const selectedIndex = propSelectedIndex !== undefined ? propSelectedIndex : localSelectedIndex;

  const handleListItemClick = (index: number) => {
    setLocalSelectedIndex(index);
    if (onSectionChange) {
      onSectionChange(menuItems[index].text, index);
    }
  };

  const StyledListItem = styled(ListItem)({
    padding: 0,
    display: 'block',
    width: '100%',
  });

  return (
    <SidebarContainer 
      ismobile={isMobile ? 'true' : 'false'} 
      isdrawer={isDrawer ? 'true' : 'false'}
    >
      <StyledList 
        ismobile={isMobile ? 'true' : 'false'} 
        isdrawer={isDrawer ? 'true' : 'false'}
      >
        {menuItems.map((item, index) => (
          <StyledListItem key={item.text} disablePadding>
            <StyledListItemButton
              selected={selectedIndex === index}
              onClick={() => handleListItemClick(index)}
              ismobile={isMobile ? 'true' : 'false'}
              isdrawer={isDrawer ? 'true' : 'false'}
            >
              <StyledListItemIcon 
                ismobile={isMobile ? 'true' : 'false'} 
                isdrawer={isDrawer ? 'true' : 'false'}
              >
                {item.icon}
              </StyledListItemIcon>
              <StyledListItemText 
                ismobile={isMobile ? 'true' : 'false'} 
                isdrawer={isDrawer ? 'true' : 'false'} 
                primary={item.text} 
              />
            </StyledListItemButton>
          </StyledListItem>
        ))}
      </StyledList>
      
      {(isDrawer || !isMobile) && (
        <FooterContainer ismobile={isMobile ? 'true' : 'false'}>
          <Typography variant="caption" color="textSecondary" sx={{ fontSize: '0.7rem' }}>
            powered by
          </Typography>
          <FooterLogo src="/resollect_logo.jpg" alt="Resollect" />
        </FooterContainer>
      )}
    </SidebarContainer>
  );
};

export default Sidebar; 