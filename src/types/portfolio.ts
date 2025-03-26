export interface LoanData {
  loanNo: string;
  loanType: 'Home Loan' | 'Car Loan' | 'Personal Loan' | 'Business Loan' | 'Education Loan';
  borrower: string;
  borrowerAddress: string;
  coBorrowerName: string;
  coBorrowerAddress: string;
  currentDPD: number;
  sanctionAmount: number;
  region: string;
  status: string;
}

export type TabType = 'All' | 'Pre Sarfeasi' | 'NPA' | 'Responses' | 'Symbolic Possession' | 'DM Order' | 'Physical Possession' | 'Auctions';

export interface DocumentUploadData {
  documentName: string;
  documentType: string;
  remarks: string;
  file: File | null;
} 