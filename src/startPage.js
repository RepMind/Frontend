import React from 'react';
import { Box, TextField, Button, Typography, Paper } from '@mui/material';
import DropDown from './components/dropDown';
import { useNavigate } from 'react-router-dom';

export default function StartPage() {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#f5f7fa',
        
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 4,
          borderRadius: 3,
          width: '100%',
          maxWidth: 400,
          backgroundColor: 'white',
        }}
      >
        <Typography variant="h5" fontWeight="bold" mb={3} textAlign="center">
          User Information
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField label="Username" variant="outlined" fullWidth />
          <TextField label="Age" variant="outlined" fullWidth />
          <TextField label="Height (cm)" variant="outlined" fullWidth />
          <TextField label="Weight (kg)" variant="outlined" fullWidth />
          <DropDown />
          <Button
            variant="contained"
            onClick={() => navigate('/goals')}
            sx={{
              mt: 2,
              backgroundColor: '#1976d2',
              textTransform: 'none',
              fontWeight: 'bold',
              borderRadius: 2,
              py: 1,
              ':hover': { backgroundColor: '#115293' },
            }}
          >
            Submit
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}
