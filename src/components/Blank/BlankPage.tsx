import React from 'react';
import { Box, Typography } from '@mui/material';

interface BlankPageProps {
  title: string;
}

const BlankPage = ({ title }: BlankPageProps) => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
        {title}
      </Typography>
    </Box>
  );
};

export default BlankPage; 