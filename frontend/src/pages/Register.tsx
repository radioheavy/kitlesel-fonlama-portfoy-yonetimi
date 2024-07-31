import React, { useState } from 'react';
import { TextField, Button, Typography, Box, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { useFeedback } from '../components/Feedback';

const Register: React.FC = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { showSuccess, showError } = useFeedback();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/auth/register', { firstName, lastName, email, password });
      showSuccess('Kayıt başarılı! Lütfen giriş yapın.');
      navigate('/login');
    } catch (error) {
      console.error('Registration error', error);
      showError('Kayıt olurken bir hata oluştu. Lütfen tekrar deneyin.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 400, margin: 'auto', mt: 4 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>Kayıt Ol</Typography>
      <TextField
        label="Ad"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        fullWidth
        margin="normal"
        required
      />
      <TextField
        label="Soyad"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        fullWidth
        margin="normal"
        required
      />
      <TextField
        label="E-posta"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
        margin="normal"
        required
      />
      <TextField
        label="Şifre"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
        margin="normal"
        required
      />
      <Button 
        type="submit" 
        variant="contained" 
        color="primary" 
        sx={{ mt: 2 }} 
        disabled={loading}
        fullWidth
      >
        {loading ? <CircularProgress size={24} /> : 'Kayıt Ol'}
      </Button>
    </Box>
  );
};

export default Register;