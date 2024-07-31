import React, { useState, useEffect } from 'react';
import { Typography, Grid, Paper, Box, CircularProgress } from '@mui/material';
import api from '../services/api';
import { useFeedback } from '../components/Feedback';

interface DashboardData {
  totalInvestment: number;
  totalShares: number;
  currentValue: number;
  profitLoss: number;
  investmentCount: number;
}

const Dashboard: React.FC = () => {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const { showError } = useFeedback();

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await api.get<DashboardData>('/dashboard');
        setDashboardData(response.data);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        showError('Dashboard verilerini yüklerken bir hata oluştu.');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [showError]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (!dashboardData) {
    return <Typography>Veri bulunamadı.</Typography>;
  }

  return (
    <Box sx={{ flexGrow: 1, mt: 4 }}>
      <Typography variant="h4" gutterBottom>Dashboard</Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={4}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6">Toplam Yatırım</Typography>
            <Typography variant="h4">{dashboardData.totalInvestment.toLocaleString()} TL</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6">Mevcut Değer</Typography>
            <Typography variant="h4">{dashboardData.currentValue.toLocaleString()} TL</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6">Kâr/Zarar</Typography>
            <Typography variant="h4" color={dashboardData.profitLoss >= 0 ? 'success.main' : 'error.main'}>
              {dashboardData.profitLoss.toLocaleString()} TL
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6">Toplam Hisse</Typography>
            <Typography variant="h4">{dashboardData.totalShares.toLocaleString()}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6">Yatırım Sayısı</Typography>
            <Typography variant="h4">{dashboardData.investmentCount}</Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
