import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import theme from './theme';
import { AuthProvider } from './context/AuthContext';
import { FeedbackProvider } from './components/Feedback';
import Layout from './components/Layout';
import ErrorBoundary from './components/ErrorBoundary';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import InvestmentForm from './pages/InvestmentForm';
import Portfolio from './pages/Portfolio';
import Reporting from './pages/Reporting';

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <AuthProvider>
          <FeedbackProvider>
            <ErrorBoundary>
              <Router>
                <Layout>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/portfolio" element={<Portfolio />} />
                    <Route path="/reporting" element={<Reporting />} />
                    <Route path="/investments/new" element={<InvestmentForm />} />
                    <Route path="/investments/edit/:id" element={<InvestmentForm />} />
                  </Routes>
                </Layout>
              </Router>
            </ErrorBoundary>
          </FeedbackProvider>
        </AuthProvider>
      </LocalizationProvider>
    </ThemeProvider>
  );
};

export default App;