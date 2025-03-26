import React, { useState } from 'react';
import {
  Box,
  Button,
  Drawer,
  Typography,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  IconButton,
  styled,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { DocumentUploadData } from '../../types/portfolio';

interface DocumentUploadProps {
  open: boolean;
  onClose: () => void;
}

// Style components with proper z-index values
const StyledDrawer = styled(Drawer)(({ theme }) => ({
  zIndex: 1400,
  '& .MuiBackdrop-root': {
    zIndex: 1400,
  },
  '& .MuiDrawer-paper': {
    width: '400px',
    maxWidth: '100%',
    padding: 0,
    zIndex: 1400,
    boxShadow: '-2px 0 8px rgba(0, 0, 0, 0.15)',
    '@media (max-width: 600px)': {
      width: '100%',
    },
  },
}));

// Style the select component with improved dropdown positioning
const StyledSelect = styled(Select)({
  '& .MuiMenu-paper': {
    zIndex: 1500,
  },
});

const DrawerHeader = styled(Box)(({ theme }) => ({
  padding: '16px 24px',
  borderBottom: '1px solid #e0e0e0',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
}));

const DrawerContent = styled(Box)({
  padding: '24px',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  overflowY: 'auto',
});

const DrawerFooter = styled(Box)({
  padding: '16px 24px',
  borderTop: '1px solid #e0e0e0',
  marginTop: 'auto',
  backgroundColor: '#fff',
});

const SubmitButton = styled(Button)({
  backgroundColor: '#1976d2',
  color: 'white',
  '&:hover': {
    backgroundColor: '#1565c0',
  },
  borderRadius: '4px',
  padding: '8px 24px',
});

const FileUploadBox = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  marginTop: '16px',
});

const DocumentUpload: React.FC<DocumentUploadProps> = ({ open, onClose }) => {
  const [documentName, setDocumentName] = useState<string>('');
  const [documentType, setDocumentType] = useState<string>('');
  const [remarks, setRemarks] = useState<string>('');
  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState<string>('No file chosen');

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
      setFileName(event.target.files[0].name);
    }
  };

  const handleSubmit = () => {
    const uploadData: DocumentUploadData = {
      documentName,
      documentType,
      remarks,
      file
    };
    
    // Here would be the API call to upload the document
    console.log(uploadData);
    
    // Reset form and close drawer
    setDocumentName('');
    setDocumentType('');
    setRemarks('');
    setFile(null);
    setFileName('No file chosen');
    onClose();
  };

  return (
    <StyledDrawer
      anchor="right"
      open={open}
      onClose={onClose}
      keepMounted={false}
    >
      <Box sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        height: '100%' 
      }}>
        <DrawerHeader>
          <Typography variant="h6">Upload document</Typography>
          <IconButton 
            onClick={onClose} 
            aria-label="close"
            sx={{ color: '#999' }}
          >
            <CloseIcon />
          </IconButton>
        </DrawerHeader>
        
        <DrawerContent>
          <Box sx={{ mt: 2 }}>
            <FormControl fullWidth variant="outlined" sx={{ mb: 3 }}>
              <InputLabel id="document-name-label">Document Name</InputLabel>
              <StyledSelect
                labelId="document-name-label"
                value={documentName}
                label="Document Name"
                onChange={(e) => setDocumentName(e.target.value as string)}
                MenuProps={{
                  container: document.body,
                  style: { zIndex: 1500 }
                }}
              >
                <MenuItem value="Notice">Notice</MenuItem>
                <MenuItem value="Agreement">Agreement</MenuItem>
                <MenuItem value="Statement">Statement</MenuItem>
                <MenuItem value="ID Proof">ID Proof</MenuItem>
              </StyledSelect>
            </FormControl>

            <FormControl fullWidth variant="outlined" sx={{ mb: 3 }}>
              <InputLabel id="document-type-label">Document Type</InputLabel>
              <StyledSelect
                labelId="document-type-label"
                value={documentType}
                label="Document Type"
                onChange={(e) => setDocumentType(e.target.value as string)}
                MenuProps={{
                  container: document.body,
                  style: { zIndex: 1500 }
                }}
              >
                <MenuItem value="Loan Agreement">Loan Agreement</MenuItem>
                <MenuItem value="Mortgage Deed">Mortgage Deed</MenuItem>
                <MenuItem value="Bank Statement">Bank Statement</MenuItem>
                <MenuItem value="Legal Notice">Legal Notice</MenuItem>
              </StyledSelect>
            </FormControl>

            <TextField
              fullWidth
              label="Document Remarks"
              variant="outlined"
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              placeholder="Enter remarks here"
              multiline
              rows={3}
              sx={{ mb: 3 }}
            />

            <Box>
              <Typography variant="subtitle2" color="textSecondary" sx={{ mb: 1 }}>
                Select File
              </Typography>
              <FileUploadBox>
                <Button
                  variant="outlined"
                  size="small"
                  sx={{ mr: 2 }}
                  onClick={() => document.getElementById('file-upload')?.click()}
                >
                  Choose file
                </Button>
                <Box component="input" 
                  id="file-upload"
                  type="file"
                  onChange={handleFileChange}
                  sx={{ display: 'none' }}
                />
                <Typography variant="body2" color="textSecondary">
                  {fileName}
                </Typography>
              </FileUploadBox>
            </Box>
          </Box>
        </DrawerContent>
        
        <DrawerFooter>
          <SubmitButton onClick={handleSubmit} fullWidth>
            Submit
          </SubmitButton>
        </DrawerFooter>
      </Box>
    </StyledDrawer>
  );
};

export default DocumentUpload; 