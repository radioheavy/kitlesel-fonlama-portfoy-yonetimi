import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Button, Box } from '@mui/material';
import { useAuth } from '../context/AuthContext';

const Navigation: React.FC = () => {
  const { isAuthenticated, logout } = useAuth();

  return (
    <Box sx={{ display: 'flex', gap: 2 }}>
      <Button component={RouterLink} to="/" color="inherit">Ana Sayfa</Button>
      {isAuthenticated ? (
        <>
          <Button component={RouterLink} to="/dashboard" color="inherit">Dashboard</Button>
          <Button component={RouterLink} to="/portfolio" color="inherit">Portföyüm</Button>
          <Button component={RouterLink} to="/reporting" color="inherit">Raporlama</Button>
          <Button component={RouterLink} to="/investments/new" color="inherit">Yeni Yatırım</Button>
          <Button onClick={logout} color="inherit">Çıkış Yap</Button>
        </>
      ) : (
        <>
          <Button component={RouterLink} to="/login" color="inherit">Giriş Yap</Button>
          <Button component={RouterLink} to="/register" color="inherit">Kayıt Ol</Button>
        </>
      )}
    </Box>
  );
};

export default Navigation;