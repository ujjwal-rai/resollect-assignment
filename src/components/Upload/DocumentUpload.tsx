import React, { useState } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Typography,
  IconButton,
  styled,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { DocumentUploadData } from '../../types/portfolio';

interface DocumentUploadProps {
  open: boolean;
  onClose: () => void;
}

const UploadButton = styled(Button)({
  marginTop: '20px',
  textTransform: 'none',
  borderRadius: '4px',
});

const CloseButton = styled(IconButton)({
  position: 'absolute',
  right: 8,
  top: 8,
  color: '#999',
});

const StyledDialog = styled(Dialog)({
  '& .MuiDialogTitle-root': {
    backgroundColor: '#fff',
    padding: '16px 24px',
    borderBottom: '1px solid #e0e0e0',
  },
  '& .MuiDialogContent-root': {
    padding: '24px',
  },
  '& .MuiDialogActions-root': {
    padding: '16px 24px',
    borderTop: '1px solid #e0e0e0',
  },
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
    
    // Reset form and close dialog
    setDocumentName('');
    setDocumentType('');
    setRemarks('');
    setFile(null);
    setFileName('No file chosen');
    onClose();
  };

  return (
    <StyledDialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        Upload Document
        <CloseButton onClick={onClose} aria-label="close">
          <CloseIcon />
        </CloseButton>
      </DialogTitle>
      <DialogContent>
        <Box sx={{ mt: 2 }}>
          <FormControl fullWidth variant="outlined" sx={{ mb: 3 }}>
            <InputLabel id="document-name-label">Document Name</InputLabel>
            <Select
              labelId="document-name-label"
              value={documentName}
              label="Document Name"
              onChange={(e) => setDocumentName(e.target.value as string)}
              displayEmpty
              renderValue={documentName ? undefined : () => "Select"}
            >
              <MenuItem value="Notice">Notice</MenuItem>
              <MenuItem value="Agreement">Agreement</MenuItem>
              <MenuItem value="Statement">Statement</MenuItem>
              <MenuItem value="ID Proof">ID Proof</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth variant="outlined" sx={{ mb: 3 }}>
            <InputLabel id="document-type-label">Document Type</InputLabel>
            <Select
              labelId="document-type-label"
              value={documentType}
              label="Document Type"
              onChange={(e) => setDocumentType(e.target.value as string)}
              displayEmpty
              renderValue={documentType ? undefined : () => "Select"}
            >
              <MenuItem value="Loan Agreement">Loan Agreement</MenuItem>
              <MenuItem value="Mortgage Deed">Mortgage Deed</MenuItem>
              <MenuItem value="Bank Statement">Bank Statement</MenuItem>
              <MenuItem value="Legal Notice">Legal Notice</MenuItem>
            </Select>
          </FormControl>

          <TextField
            fullWidth
            label="Document Remarks"
            variant="outlined"
            value={remarks}
            onChange={(e) => setRemarks(e.target.value)}
            placeholder="Type"
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
      </DialogContent>
      <DialogActions>
        <SubmitButton onClick={handleSubmit} fullWidth>
          Submit
        </SubmitButton>
      </DialogActions>
    </StyledDialog>
  );
};

export default DocumentUpload; 