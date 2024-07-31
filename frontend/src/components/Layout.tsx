import React from 'react';
import { AppBar, Toolbar, Typography, Container } from '@mui/material';
import Navigation from './Navigation';

const Layout: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>Kitlesel Fonlama Portföy Yönetimi</Typography>
          <Navigation />
        </Toolbar>
      </AppBar>
      <Container>
        <main>{children}</main>
      </Container>
    </>
  );
};

export default Layout;
