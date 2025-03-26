# Resollect - Loan Management Portfolio System

## Overview
Resollect is a comprehensive loan management and portfolio system designed for financial institutions to track, manage, and process loans efficiently. The system provides a modern UI with responsive design that works seamlessly across desktop and mobile devices.

## Technology Stack

### Core Technologies
- **React**: A JavaScript library for building user interfaces
- **TypeScript**: Adds static typing to JavaScript, enhancing code quality and developer experience
- **Material UI (MUI)**: Component library that implements Google's Material Design

### Key Libraries
- **@mui/material**: Core Material UI components
- **@mui/icons-material**: Material Design icons
- **react-router-dom**: Routing library for React applications
- **react-scripts**: Configuration and scripts for Create React App

## Project Structure

```
src/
├── components/          # UI components organized by feature
│   ├── Blank/           # Blank page template for sections under development
│   ├── Dashboard/       # Dashboard with statistics and charts
│   ├── Notices/         # Notices section with information boxes
│   ├── Notifications/   # Notification system with interactive cards
│   ├── Portfolio/       # Main loan portfolio management interface
│   │   └── ...
│   ├── Sidebar/         # Navigation sidebar component
│   └── Upload/          # Document upload functionality
├── layouts/             # Page layout components
│   └── MainLayout.tsx   # Main application layout with header and sidebar
├── types/               # TypeScript type definitions
│   └── portfolio.ts     # Types for loan data and portfolio components
├── App.tsx              # Main application component with routing logic
└── index.tsx            # Application entry point
```

## Components

### MainLayout
The main layout wrapper that provides:
- Responsive app bar with logo
- User profile information
- Sidebar navigation (desktop view)
- Hamburger menu with drawer navigation (mobile view)
- Content area that adapts to the selected section

### Sidebar
A navigation component that:
- Shows as a vertical sidebar on desktop
- Transforms into a drawer menu on mobile
- Highlights the currently selected section
- Communicates section changes to parent components

### Portfolio
The main loan management interface featuring:
- Searchable loan data table
- Customizable columns with show/hide functionality
- Filter options for loan data
- Batch actions for selected loans
- Horizontal scrolling on mobile for complete data access

### Dashboard
Analytics dashboard with:
- Key performance indicators in stat cards
- Bar chart visualization for monthly trends
- Responsive layout that adapts to screen size

### Notifications
Notification center displaying:
- Color-coded notification cards by type
- Time indicators for when notifications were received
- Interactive hover effects for better UX
- Badge showing total notification count

### Notices
Section for displaying important notices with:
- Styled paper containers
- Lorem ipsum placeholder content

### Document Upload
Modal component for uploading loan-related documents.

## Responsive Design
The application implements a mobile-first responsive design:
- Desktop view (> 880px): Full sidebar navigation
- Mobile view (≤ 880px): Hamburger menu with drawer navigation
- Adaptive content layout based on screen size
- Touch-friendly interactive elements

## Usage

### Installation
```
npm install
```

### Development Server
```
npm start
```

### Production Build
```
npm run build
```

## Roadmap
- Authentication and user management
- Advanced filtering for loan portfolios
- Document management system
- Reporting and analytics dashboard enhancements
- Integration with backend APIs 