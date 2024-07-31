import React, { useState, useEffect } from 'react';
import { Typography, Grid, Paper, Box } from '@mui/material';
import { Pie, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from 'chart.js';
import api from '../services/api';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

interface InvestmentData {
  companyName: string;
  amount: number;
  currentValue: number;
}

const Reporting: React.FC = () => {
  const [investmentData, setInvestmentData] = useState<InvestmentData[]>([]);

  useEffect(() => {
    const fetchInvestmentData = async () => {
      try {
        const response = await api.get<InvestmentData[]>('/investments');
        setInvestmentData(response.data);
      } catch (error) {
        console.error('Error fetching investment data:', error);
      }
    };

    fetchInvestmentData();
  }, []);

  const pieChartData = {
    labels: investmentData.map(item => item.companyName),
    datasets: [
      {
        data: investmentData.map(item => item.currentValue),
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
          '#FF9F40'
        ],
      },
    ],
  };

  const barChartData = {
    labels: investmentData.map(item => item.companyName),
    datasets: [
      {
        label: 'Yatırım Tutarı',
        data: investmentData.map(item => item.amount),
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
      },
      {
        label: 'Mevcut Değer',
        data: investmentData.map(item => item.currentValue),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  const barChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Yatırım Tutarı vs Mevcut Değer',
      },
    },
  };

  return (
    <Box sx={{ flexGrow: 1, mt: 4 }}>
      <Typography variant="h4" gutterBottom>Raporlama</Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>Portföy Dağılımı</Typography>
            <Pie data={pieChartData} />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>Yatırım Performansı</Typography>
            <Bar options={barChartOptions} data={barChartData} />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Reporting;