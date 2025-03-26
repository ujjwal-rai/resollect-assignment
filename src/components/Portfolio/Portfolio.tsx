import React, { useState } from 'react';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Tabs,
  Tab,
  TextField,
  Button,
  Checkbox,
  styled,
  Typography,
  Menu,
  MenuItem,
  Popover,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  FormControlLabel,
  Divider,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import ViewColumnIcon from '@mui/icons-material/ViewColumn';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { LoanData, TabType } from '../../types/portfolio';
import DocumentUpload from '../Upload/DocumentUpload';

const StyledTableContainer = styled(TableContainer)({
  '& .MuiTableCell-head': {
    backgroundColor: '#f5f5f5',
    fontWeight: 'bold',
    padding: '12px 16px',
  },
  '& .MuiTableCell-body': {
    padding: '12px 16px',
    borderBottom: '1px solid #e0e0e0',
  },
  '& .MuiTableRow-root:hover': {
    backgroundColor: '#f5f5f5',
  },
  '@media (max-width: 880px)': {
    '& .MuiTableCell-head, & .MuiTableCell-body': {
      padding: '8px 12px',
      fontSize: '0.8rem',
    },
  },
});

const PortfolioHeader = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '16px 24px',
  flexWrap: 'wrap',
  gap: '16px',
  borderBottom: '1px solid #e0e0e0',
  '@media (max-width: 880px)': {
    padding: '12px 16px',
    flexDirection: 'column',
    alignItems: 'stretch',
  },
});

const SearchContainer = styled(Box)({
  display: 'flex',
  gap: '16px',
  alignItems: 'center',
  flexWrap: 'wrap',
  '@media (max-width: 880px)': {
    width: '100%',
    '& .MuiTextField-root': {
      width: '100%',
    },
  },
});

const ActionContainer = styled(Box)({
  display: 'flex',
  gap: '16px',
  alignItems: 'center',
  '@media (max-width: 880px)': {
    width: '100%',
    justifyContent: 'space-between',
  },
});

const TabsContainer = styled(Box)({
  borderBottom: '1px solid #e0e0e0',
  '& .MuiTabs-indicator': {
    backgroundColor: '#1976d2',
    height: 3,
  },
  '& .MuiTab-root': {
    minWidth: 'auto',
    padding: '12px 16px',
    fontWeight: 500,
    color: '#777',
    '&.Mui-selected': {
      color: '#1976d2',
    },
  },
  '@media (max-width: 880px)': {
    '& .MuiTab-root': {
      padding: '8px 12px',
      fontSize: '0.75rem',
    },
  },
});

// Interface for column visibility
interface ColumnConfig {
  id: keyof LoanData;
  label: string;
  visible: boolean;
}

const Portfolio = () => {
  const [selectedTab, setSelectedTab] = useState<TabType>('All');
  const [selectedLoans, setSelectedLoans] = useState<string[]>([]);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [columnMenuAnchor, setColumnMenuAnchor] = useState<null | HTMLElement>(null);
  const [filterMenuAnchor, setFilterMenuAnchor] = useState<null | HTMLElement>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const theme = useTheme();
  const isMobile = useMediaQuery('(max-width:880px)');
  
  // Column configuration with visibility state
  const [columns, setColumns] = useState<ColumnConfig[]>([
    { id: 'loanNo', label: 'Loan No.', visible: true },
    { id: 'loanType', label: 'Loan Type', visible: true },
    { id: 'borrower', label: 'Borrower', visible: true },
    { id: 'borrowerAddress', label: 'Borrower Address', visible: true },
    { id: 'coBorrowerName', label: 'Co Borrower Name', visible: true },
    { id: 'coBorrowerAddress', label: 'Co Borrower Address', visible: true },
    { id: 'currentDPD', label: 'Current DPD', visible: true },
    { id: 'sanctionAmount', label: 'Sanction Amount', visible: true },
    { id: 'region', label: 'Region', visible: true },
    { id: 'status', label: 'Status', visible: true },
  ]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: TabType) => {
    setSelectedTab(newValue);
  };

  const handleLoanSelection = (loanNo: string) => {
    setSelectedLoans(prev =>
      prev.includes(loanNo)
        ? prev.filter(no => no !== loanNo)
        : [...prev, loanNo]
    );
  };

  const openUploadDialog = () => {
    setIsUploadOpen(true);
    setFilterMenuAnchor(null);
  };

  const closeUploadDialog = () => {
    setIsUploadOpen(false);
  };
  
  // Column menu handlers
  const handleColumnMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setColumnMenuAnchor(event.currentTarget);
  };
  
  const handleColumnMenuClose = () => {
    setColumnMenuAnchor(null);
  };
  
  // Filter menu handlers
  const handleFilterMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setFilterMenuAnchor(event.currentTarget);
  };
  
  const handleFilterMenuClose = () => {
    setFilterMenuAnchor(null);
  };
  
  const handleColumnToggle = (columnId: keyof LoanData) => {
    setColumns(prevColumns => 
      prevColumns.map(column => 
        column.id === columnId
          ? { ...column, visible: !column.visible }
          : column
      )
    );
  };
  
  const handleSelectAllColumns = (selected: boolean) => {
    setColumns(prevColumns =>
      prevColumns.map(column => ({ ...column, visible: selected }))
    );
  };

  // Mock data
  const loans: LoanData[] = [
    {
      loanNo: 'L28U3247',
      loanType: 'Home Loan',
      borrower: 'Vedika Sarkar',
      borrowerAddress: '83 Yogi Ganj, Kadapa-068720',
      coBorrowerName: 'Divit Vora',
      coBorrowerAddress: '24/543, Acharya Path Dingde-052360',
      currentDPD: 91,
      sanctionAmount: 1934068,
      region: 'West',
      status: 'Active'
    },
    {
      loanNo: 'L28U3243',
      loanType: 'Car Loan',
      borrower: 'Hrithika Agrawal',
      borrowerAddress: '88/522, Dev Path, Berhampore 841186',
      coBorrowerName: 'Malika Tak',
      coBorrowerAddress: '58 Tela Road, Sultan Pur Majra 919878',
      currentDPD: 100,
      sanctionAmount: 1842143,
      region: 'North',
      status: 'Active'
    },
    {
      loanNo: 'L28U3250',
      loanType: 'Car Loan',
      borrower: 'Priyansh Soman',
      borrowerAddress: 'H.No. 152 Andra Street Amritsar-431752',
      coBorrowerName: 'Zaina Dara',
      coBorrowerAddress: 'H-No. 42, Srivastava Marg, Junagadh-191124',
      currentDPD: 100,
      sanctionAmount: 4537889,
      region: 'East',
      status: 'Active'
    },
    {
      loanNo: 'L29P4521',
      loanType: 'Business Loan',
      borrower: 'Rajat Malhotra',
      borrowerAddress: '45 Gandhi Road, Mumbai-400001',
      coBorrowerName: 'Anjali Malhotra',
      coBorrowerAddress: '45 Gandhi Road, Mumbai-400001',
      currentDPD: 75,
      sanctionAmount: 3250000,
      region: 'West',
      status: 'NPA'
    },
    {
      loanNo: 'L31K6789',
      loanType: 'Home Loan',
      borrower: 'Suresh Kumar',
      borrowerAddress: '23/A Lake View, Chennai-600028',
      coBorrowerName: 'Priya Kumar',
      coBorrowerAddress: '23/A Lake View, Chennai-600028',
      currentDPD: 120,
      sanctionAmount: 4200000,
      region: 'South',
      status: 'Physical Possession'
    },
    {
      loanNo: 'L30R5678',
      loanType: 'Education Loan',
      borrower: 'Anika Patel',
      borrowerAddress: '67 University Road, Ahmedabad-380015',
      coBorrowerName: 'Nikhil Patel',
      coBorrowerAddress: '67 University Road, Ahmedabad-380015',
      currentDPD: 45,
      sanctionAmount: 850000,
      region: 'West',
      status: 'Active'
    },
    {
      loanNo: 'L32M9012',
      loanType: 'Car Loan',
      borrower: 'Karan Singh',
      borrowerAddress: '12 Model Town, Delhi-110009',
      coBorrowerName: 'Simran Kaur',
      coBorrowerAddress: '12 Model Town, Delhi-110009',
      currentDPD: 60,
      sanctionAmount: 1200000,
      region: 'North',
      status: 'Symbolic Possession'
    },
    {
      loanNo: 'L33N4567',
      loanType: 'Personal Loan',
      borrower: 'Vikram Mehta',
      borrowerAddress: '34 MG Road, Bangalore-560001',
      coBorrowerName: '',
      coBorrowerAddress: '',
      currentDPD: 30,
      sanctionAmount: 500000,
      region: 'South',
      status: 'Pre Sarfeasi'
    }
  ];

  // Filter loans based on search query
  const filteredLoans = loans.filter(loan => 
    searchQuery ? loan.loanNo.toLowerCase().includes(searchQuery.toLowerCase()) : true
  );

  // Get only visible columns
  const visibleColumns = columns.filter(column => column.visible);

  // Handle search input change
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  return (
    <Box sx={{ p: 0 }}>
      <TabsContainer>
        <Tabs
          value={selectedTab}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
          sx={{ px: 0, '& .MuiTab-root': { textTransform: 'uppercase' } }}
        >
          <Tab label="ALL" value="All" />
          <Tab label="PRE SARFEASI" value="Pre Sarfeasi" />
          <Tab label="NPA" value="NPA" />
          <Tab label="RESPONSES" value="Responses" />
          <Tab label="SYMBOLIC POSSESSION" value="Symbolic Possession" />
          <Tab label="DM ORDER" value="DM Order" />
          <Tab label="PHYSICAL POSSESSION" value="Physical Possessions" />
          <Tab label="AUCTIONS" value="Auctions" />
        </Tabs>
      </TabsContainer>

      <PortfolioHeader>
        <SearchContainer>
          <TextField
            placeholder="Search Loan Number"
            variant="outlined"
            size="small"
            sx={{ width: '240px' }}
            value={searchQuery}
            onChange={handleSearchChange}
            InputProps={{
              sx: { 
                '&:focus-within': { 
                  '& .MuiOutlinedInput-notchedOutline': { 
                    borderColor: '#1976d2' 
                  } 
                }
              }
            }}
          />
        </SearchContainer>
        <ActionContainer>
          <Button
            variant="outlined"
            onClick={handleColumnMenuOpen}
            sx={{ 
              whiteSpace: 'nowrap', 
              bgcolor: '#ffffff',
              color: '#333333',
              borderColor: '#dddddd',
              '&:hover': {
                bgcolor: '#f5f5f5',
                borderColor: '#cccccc'
              }
            }}
            endIcon={<ArrowDropDownIcon sx={{ color: '#777777' }} />}
          >
            Select columns
          </Button>
          
          {/* Column Selection Popover */}
          <Popover
            open={Boolean(columnMenuAnchor)}
            anchorEl={columnMenuAnchor}
            onClose={handleColumnMenuClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            PaperProps={{
              sx: { width: 250, maxHeight: 400, overflow: 'auto', p: 1 }
            }}
          >
            <List dense>
              <ListItem>
                <FormControlLabel
                  control={
                    <Checkbox 
                      checked={columns.every(col => col.visible)}
                      indeterminate={columns.some(col => col.visible) && !columns.every(col => col.visible)}
                      onChange={(e) => handleSelectAllColumns(e.target.checked)}
                    />
                  }
                  label="Select All"
                />
              </ListItem>
              <Divider />
              {columns.map((column) => (
                <ListItem key={column.id as string} dense button onClick={() => handleColumnToggle(column.id)}>
                  <ListItemIcon sx={{ minWidth: 36 }}>
                    <Checkbox checked={column.visible} edge="start" />
                  </ListItemIcon>
                  <ListItemText primary={column.label} />
                </ListItem>
              ))}
            </List>
          </Popover>
          
          {/* More Filters Button with Menu */}
          <Button
            variant="contained"
            onClick={handleFilterMenuOpen}
            sx={{ whiteSpace: 'nowrap', bgcolor: '#1976d2' }}
            endIcon={<ArrowDropDownIcon />}
            startIcon={<FilterListIcon />}
          >
            More filters
          </Button>
          
          {/* More Filters Menu */}
          <Menu
            anchorEl={filterMenuAnchor}
            open={Boolean(filterMenuAnchor)}
            onClose={handleFilterMenuClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
          >
            <MenuItem onClick={openUploadDialog}>
              <ListItemIcon>
                <CloudUploadIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Upload document</ListItemText>
            </MenuItem>
            {/* Add more filter options here */}
            <MenuItem>
              <ListItemText>Filter by date</ListItemText>
            </MenuItem>
            <MenuItem>
              <ListItemText>Filter by status</ListItemText>
            </MenuItem>
            <MenuItem>
              <ListItemText>Filter by region</ListItemText>
            </MenuItem>
          </Menu>
        </ActionContainer>
      </PortfolioHeader>

      {/* Selection Actions Bar */}
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        p: isMobile ? 1.5 : 2, 
        borderBottom: '1px solid #e0e0e0',
        bgcolor: selectedLoans.length > 0 ? '#f9f9f9' : 'transparent',
        flexDirection: isMobile ? 'column' : 'row',
        gap: isMobile ? 1 : 0
      }}>
        <Box sx={{ 
          display: 'flex', 
          gap: isMobile ? 1 : 2,
          width: isMobile ? '100%' : 'auto',
          flexDirection: isMobile ? 'column' : 'row'
        }}>
          <Button 
            variant="contained" 
            color="primary"
            disabled={selectedLoans.length === 0}
            fullWidth={isMobile}
            size={isMobile ? "small" : "medium"}
          >
            Generate Pre Sarfaesi Notice ({selectedLoans.length})
          </Button>
          <Button 
            variant="contained" 
            color="error"
            disabled={selectedLoans.length === 0}
            fullWidth={isMobile}
            size={isMobile ? "small" : "medium"}
          >
            Declare NPA ({selectedLoans.length})
          </Button>
        </Box>
        <Typography variant="body2" color="text.secondary" sx={{ mt: isMobile ? 1 : 0 }}>
          {`${selectedLoans.length} ${selectedLoans.length !== 1 ? 'loans' : 'loan'} selected`}
        </Typography>
      </Box>

      <StyledTableContainer sx={{ 
        overflowX: 'auto',
        '@media (max-width: 880px)': {
          '& table': {
            tableLayout: 'auto',
            minWidth: '800px',
          }
        }
      }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  onChange={() => {
                    if (selectedLoans.length === filteredLoans.length) {
                      setSelectedLoans([]);
                    } else {
                      setSelectedLoans(filteredLoans.map(loan => loan.loanNo));
                    }
                  }}
                  checked={selectedLoans.length > 0 && selectedLoans.length === filteredLoans.length}
                  indeterminate={selectedLoans.length > 0 && selectedLoans.length < filteredLoans.length}
                />
              </TableCell>
              {visibleColumns.map((column) => (
                <TableCell key={column.id as string}>{column.label}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredLoans.length > 0 ? (
              filteredLoans.map((loan) => (
                <TableRow
                  key={loan.loanNo}
                  hover
                  selected={selectedLoans.includes(loan.loanNo)}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedLoans.includes(loan.loanNo)}
                      onChange={() => handleLoanSelection(loan.loanNo)}
                    />
                  </TableCell>
                  {visibleColumns.map((column) => (
                    <TableCell key={`${loan.loanNo}-${column.id as string}`}>
                      {column.id === 'sanctionAmount' 
                        ? `₹ ${loan[column.id].toLocaleString()}` 
                        : loan[column.id]}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={visibleColumns.length + 1} align="center" sx={{ py: 3 }}>
                  <Typography variant="body1" color="text.secondary">
                    No loans found matching "{searchQuery}"
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </StyledTableContainer>
      
      {/* Document Upload Dialog */}
      <DocumentUpload open={isUploadOpen} onClose={closeUploadDialog} />
    </Box>
  );
};

export default Portfolio; 