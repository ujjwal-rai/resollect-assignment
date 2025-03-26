import React, { useState } from 'react';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import MainLayout from './layouts/MainLayout';
import Portfolio from './components/Portfolio/Portfolio';
import Dashboard from './components/Dashboard/Dashboard';
import Notices from './components/Notices/Notices';
import Notifications from './components/Notifications/Notifications';
import BlankPage from './components/Blank/BlankPage';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    background: {
      default: '#f8f9fa',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
});

const App = () => {
  const [currentSection, setCurrentSection] = useState('Portfolio');

  // Render content based on selected section
  const renderContent = () => {
    switch (currentSection) {
      case 'Dashboard':
        return <Dashboard />;
      case 'Portfolio':
        return <Portfolio />;
      case 'Notices':
        return <Notices />;
      case 'Notifications':
        return <Notifications />;
      case 'Auction':
        return <BlankPage title="Auction" />;
      case 'Data Upload':
        return <BlankPage title="Data Upload" />;
      case 'Control Panel':
        return <BlankPage title="Control Panel" />;
      case 'User Management':
        return <BlankPage title="User Management" />;
      case 'Permissions':
        return <BlankPage title="Permissions" />;
      default:
        return <Portfolio />;
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <MainLayout onSectionChange={setCurrentSection}>
        {renderContent()}
      </MainLayout>
    </ThemeProvider>
  );
};

export default App; 