import React from 'react';
import { Box, Typography, Paper, styled } from '@mui/material';

// Add SVG namespace declaration
declare namespace JSX {
  interface IntrinsicElements {
    svg: React.SVGProps<SVGSVGElement>;
    path: React.SVGProps<SVGPathElement>;
    circle: React.SVGProps<SVGCircleElement>;
    line: React.SVGProps<SVGLineElement>;
    text: React.SVGProps<SVGTextElement>;
  }
}

const ChartContainer = styled(Paper)({
  padding: '24px',
  borderRadius: '8px',
  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  marginBottom: '24px',
});

// Simplified chart using div elements instead of SVG
const LineChart = () => {
  // Sample data points (values between 0-100)
  const dataPoints = [50, 25, 35, 60, 40, 75, 55, 70, 65, 80];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'];
  
  return (
    <Box>
      <Box sx={{ 
        display: 'flex', 
        height: '200px', 
        alignItems: 'flex-end', 
        position: 'relative',
        borderBottom: '1px solid #ccc',
        borderLeft: '1px solid #ccc',
        mt: 4,
        mb: 4
      }}>
        {dataPoints.map((point, i) => (
          <Box 
            key={i} 
            sx={{ 
              height: `${point}%`, 
              width: '8%', 
              mx: '1%',
              bgcolor: 'rgba(25, 118, 210, 0.7)', 
              position: 'relative',
              '&:hover': {
                bgcolor: 'rgba(25, 118, 210, 0.9)',
              },
              '&:hover::after': {
                content: `"${point}"`,
                position: 'absolute',
                top: '-25px',
                left: '50%',
                transform: 'translateX(-50%)',
                bgcolor: '#333',
                color: 'white',
                padding: '2px 6px',
                borderRadius: '3px',
                fontSize: '12px',
              },
            }}
          />
        ))}
      </Box>
      
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        {months.map((month, i) => (
          <Typography key={i} variant="caption" sx={{ width: '10%', textAlign: 'center' }}>
            {month}
          </Typography>
        ))}
      </Box>
    </Box>
  );
};

const StatsContainer = styled(Box)({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
  gap: '16px',
  marginBottom: '24px',
});

const StatCard = styled(Paper)(({ color }: { color: string }) => ({
  padding: '16px',
  borderRadius: '8px',
  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  borderLeft: `4px solid ${color}`,
}));

const Dashboard = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
        Loan Portfolio Overview
      </Typography>
      
      <StatsContainer>
        <StatCard color="#4caf50">
          <Typography variant="subtitle2" color="text.secondary">Total Active Loans</Typography>
          <Typography variant="h4" sx={{ mt: 1, fontWeight: 600 }}>583</Typography>
          <Typography variant="body2" color="success.main" sx={{ mt: 1 }}>↑ 4.7% from last month</Typography>
        </StatCard>
        
        <StatCard color="#f44336">
          <Typography variant="subtitle2" color="text.secondary">NPA Loans</Typography>
          <Typography variant="h4" sx={{ mt: 1, fontWeight: 600 }}>47</Typography>
          <Typography variant="body2" color="error.main" sx={{ mt: 1 }}>↑ 2.3% from last month</Typography>
        </StatCard>
        
        <StatCard color="#2196f3">
          <Typography variant="subtitle2" color="text.secondary">Total Recovered</Typography>
          <Typography variant="h4" sx={{ mt: 1, fontWeight: 600 }}>₹12.8M</Typography>
          <Typography variant="body2" color="primary.main" sx={{ mt: 1 }}>↑ 8.1% from last month</Typography>
        </StatCard>
        
        <StatCard color="#ff9800">
          <Typography variant="subtitle2" color="text.secondary">Pending Foreclosures</Typography>
          <Typography variant="h4" sx={{ mt: 1, fontWeight: 600 }}>23</Typography>
          <Typography variant="body2" color="warning.main" sx={{ mt: 1 }}>↓ 3.5% from last month</Typography>
        </StatCard>
      </StatsContainer>
      
      <ChartContainer>
        <Typography variant="subtitle1" sx={{ mb: 3, fontWeight: 600 }}>
          Monthly Recovery Trends
        </Typography>
        <LineChart />
      </ChartContainer>
      
      <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 3 }}>
        <ChartContainer>
          <Typography variant="subtitle1" sx={{ mb: 3, fontWeight: 600 }}>
            Status Distribution
          </Typography>
          <Box sx={{ height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Typography variant="body2" color="text.secondary">
              Status chart will be displayed here
            </Typography>
          </Box>
        </ChartContainer>
        
        <ChartContainer>
          <Typography variant="subtitle1" sx={{ mb: 3, fontWeight: 600 }}>
            Region-wise Distribution
          </Typography>
          <Box sx={{ height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Typography variant="body2" color="text.secondary">
              Region chart will be displayed here
            </Typography>
          </Box>
        </ChartContainer>
      </Box>
    </Box>
  );
};

export default Dashboard; 