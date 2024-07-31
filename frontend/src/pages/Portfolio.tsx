import React, { useState, useEffect } from 'react';
import { Typography, Grid, Paper, Box, CircularProgress } from '@mui/material';
import { Pie, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from 'chart.js';
import api from '../services/api';
import { useFeedback } from '../components/Feedback';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

interface InvestmentData {
  companyName: string;
  amount: number;
  currentValue: number;
}

const Reporting: React.FC = () => {
  const [investmentData, setInvestmentData] = useState<InvestmentData[]>([]);
  const [loading, setLoading] = useState(true);
  const { showError } = useFeedback();

  useEffect(() => {
    const fetchInvestmentData = async () => {
      try {
        const response = await api.get<InvestmentData[]>('/investments');
        setInvestmentData(response.data);
      } catch (error) {
        console.error('Error fetching investment data:', error);
        showError('Yatırım verilerini yüklerken bir hata oluştu.');
      } finally {
        setLoading(false);
      }
    };

    fetchInvestmentData();
  }, [showError]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (investmentData.length === 0) {
    return <Typography>Henüz yatırım verisi bulunmamaktadır.</Typography>;
  }

  // Pie chart data
  const pieData = {
    labels: investmentData.map(data => data.companyName),
    datasets: [{
      data: investmentData.map(data => data.amount),
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'],
    }],
  };

  // Bar chart data
  const barData = {
    labels: investmentData.map(data => data.companyName),
    datasets: [{
      label: 'Mevcut Değer',
      data: investmentData.map(data => data.currentValue),
      backgroundColor: '#36A2EB',
    }],
  };

  return (
    <Box sx={{ flexGrow: 1, mt: 4 }}>
      <Typography variant="h4" gutterBottom>Raporlama</Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6">Yatırım Dağılımı</Typography>
            <Pie data={pieData} />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6">Şirket Bazında Mevcut Değer</Typography>
            <Bar data={barData} />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Reporting;
