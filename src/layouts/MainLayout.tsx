import React, { useState } from 'react';
import { Box, AppBar, Toolbar, Typography, Avatar, styled, IconButton, Drawer, useMediaQuery, useTheme } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Sidebar from '../components/Sidebar/Sidebar';

const MainContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh',
});

const StyledAppBar = styled(AppBar)({
  backgroundColor: '#ffffff',
  color: '#000000',
  boxShadow: '0px 1px 4px rgba(0, 0, 0, 0.1)',
  zIndex: 1300, // Ensure it's above the sidebar
});

const StyledToolbar = styled(Toolbar)({
  '@media (max-width: 880px)': {
    paddingLeft: '8px',
    paddingRight: '8px',
    minHeight: '56px',
  },
});

const ContentWrapper = styled(Box)({
  display: 'flex',
  flexGrow: 1,
  height: 'calc(100vh - 64px)', // Subtract header height
  overflow: 'hidden', // Prevent scroll at the wrapper level
  '@media (max-width: 880px)': {
    height: 'calc(100vh - 56px)', // Smaller header on mobile
    flexDirection: 'column', // Stack vertically on mobile
  },
});

const ContentContainer = styled(Box)({
  flexGrow: 1,
  overflow: 'auto',
  backgroundColor: '#ffffff',
  padding: 0,
  display: 'flex',
  flexDirection: 'column',
});

const SectionHeader = styled(Box)({
  padding: '16px 24px',
  backgroundColor: '#f8f9fa',
  borderBottom: '1px solid #e0e0e0',
  display: 'flex',
  alignItems: 'center',
});

const ContentArea = styled(Box)({
  flexGrow: 1,
  overflow: 'auto',
});

const UserInfo = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
});

const Logo = styled('img')({
  height: '32px',
  marginRight: '16px',
  '@media (max-width: 880px)': {
    height: '28px',
    marginRight: '8px',
  },
});

const LogoContainer = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  marginRight: 'auto',
});

const SidebarWrapper = styled(Box)({
  '@media (max-width: 880px)': {
    display: 'none', // Hide on mobile by default
  },
});

const MobileDrawer = styled(Drawer)({
  '& .MuiDrawer-paper': {
    width: '380px',
    boxSizing: 'border-box',
    paddingTop: '4px', // Add padding at the top for spacing
  },
});

interface MainLayoutProps {
  children: React.ReactNode;
  onSectionChange?: (section: string) => void;
}

const MainLayout = ({ children, onSectionChange }: MainLayoutProps) => {
  const [currentSection, setCurrentSection] = useState('Portfolio');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedMenuIndex, setSelectedMenuIndex] = useState(1);
  const theme = useTheme();
  const isMobile = useMediaQuery('(max-width:880px)');

  const handleSectionChange = (section: string, index: number) => {
    setCurrentSection(section);
    setSelectedMenuIndex(index);
    if (onSectionChange) {
      onSectionChange(section);
    }
    if (isMobile) {
      setMobileMenuOpen(false);
    }
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <MainContainer>
      <StyledAppBar position="static">
        <StyledToolbar>
          {isMobile && (
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={toggleMobileMenu}
              sx={{ mr: 1 }}
            >
              <MenuIcon />
            </IconButton>
          )}
          <LogoContainer>
            <Logo src="/resollect_logo.jpg" alt="Resollect Logo" />
          </LogoContainer>
          <UserInfo>
            <Avatar sx={{ bgcolor: '#bbdefb', '@media (max-width: 880px)': { width: 30, height: 30 } }}>T</Avatar>
            <Box sx={{ '@media (max-width: 880px)': { display: { xs: 'none', sm: 'block' } } }}>
              <Typography variant="subtitle2">Tushar</Typography>
              <Typography variant="caption" color="textSecondary">
                tushar@resollect.com
              </Typography>
            </Box>
          </UserInfo>
        </StyledToolbar>
      </StyledAppBar>
      
      {/* Mobile Drawer */}
      <MobileDrawer
        anchor="left"
        open={mobileMenuOpen}
        onClose={toggleMobileMenu}
        variant="temporary"
        sx={{ zIndex: 1400 }} // Ensure drawer is above the header
      >
        <Box sx={{ height: '100%', paddingTop: '0px' }}>
          <Sidebar 
            onSectionChange={handleSectionChange} 
            inDrawer={true} 
            selectedIndex={selectedMenuIndex}
          />
        </Box>
      </MobileDrawer>
      
      <ContentWrapper>
        {/* Desktop Sidebar */}
        <SidebarWrapper>
          <Sidebar 
            onSectionChange={handleSectionChange} 
            selectedIndex={selectedMenuIndex}
          />
        </SidebarWrapper>
        <ContentContainer>
          <SectionHeader>
            <Typography variant="h6" sx={{ fontWeight: 700, color: '#000000' }}>
              {currentSection}
            </Typography>
          </SectionHeader>
          <ContentArea>
            {children}
          </ContentArea>
        </ContentContainer>
      </ContentWrapper>
    </MainContainer>
  );
};

export default MainLayout; 