import React, { Component, ErrorInfo, ReactNode } from "react";
import { Box, Typography, Button } from "@mui/material";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 4 }}>
          <Typography variant="h5" gutterBottom>
            Üzgünüz, bir şeyler yanlış gitti.
          </Typography>
          <Button 
            variant="contained" 
            color="primary" 
            onClick={() => this.setState({ hasError: false })}
          >
            Yeniden Dene
          </Button>
        </Box>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;