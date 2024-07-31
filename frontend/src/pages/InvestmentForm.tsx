import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Box, MenuItem, CircularProgress } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import api from '../services/api';
import { useFeedback } from '../components/Feedback';

interface InvestmentFormData {
  companyName: string;
  amount: number;
  shares: number;
  investmentDate: Date | null;
}

const InvestmentForm: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<InvestmentFormData>({
    companyName: '',
    amount: 0,
    shares: 0,
    investmentDate: null,
  });
  const [companies, setCompanies] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const { showSuccess, showError } = useFeedback();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const companiesResponse = await api.get('/companies');
        setCompanies(companiesResponse.data.map((company: any) => company.name));

        if (id) {
          const investmentResponse = await api.get(`/investments/${id}`);
          setFormData(investmentResponse.data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        showError('Veri yüklenirken bir hata oluştu.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, showError]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === 'amount' || name === 'shares' ? Number(value) : value,
    }));
  };

  const handleDateChange = (date: Date | null) => {
    setFormData((prevData) => ({
      ...prevData,
      investmentDate: date,
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    try {
      if (id) {
        await api.patch(`/investments/${id}`, formData);
        showSuccess('Yatırım başarıyla güncellendi.');
      } else {
        await api.post('/investments', formData);
        showSuccess('Yeni yatırım başarıyla eklendi.');
      }
      navigate('/portfolio');
    } catch (error) {
      console.error('Error saving investment:', error);
      showError('Yatırım kaydedilirken bir hata oluştu. Lütfen tekrar deneyin.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 400, margin: 'auto', mt: 4 }}>
        <Typography variant="h5" sx={{ mb: 2 }}>
          {id ? 'Yatırım Düzenle' : 'Yeni Yatırım Ekle'}
        </Typography>
        <TextField
          select
          label="Şirket Adı"
          name="companyName"
          value={formData.companyName}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        >
          {companies.map((company) => (
            <MenuItem key={company} value={company}>
              {company}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          label="Yatırım Tutarı"
          name="amount"
          type="number"
          value={formData.amount}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Hisse Sayısı"
          name="shares"
          type="number"
          value={formData.shares}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <DatePicker
          label="Yatırım Tarihi"
          value={formData.investmentDate}
          onChange={handleDateChange}
          slotProps={{
            textField: {
              fullWidth: true,
              margin: "normal",
              required: true
            }
          }}
        />
        <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }} disabled={loading}>
          {loading ? <CircularProgress size={24} /> : (id ? 'Güncelle' : 'Ekle')}
        </Button>
      </Box>
    </LocalizationProvider>
  );
};

export default InvestmentForm;