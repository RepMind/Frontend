import React from 'react';
import { Box, Paper, Typography, Button, Divider } from '@mui/material';
import DropDown from './components/dropdowngoals';
import DropDownEl from './components/dropdownel';
import TextField from './components/textfield';
import Checkboxesday from './components/checkboxesday';
import { useNavigate } from 'react-router-dom';

export default function GoalsPage() {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#f5f7fa',
        p: 2,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 4,
          borderRadius: 3,
          width: '100%',
          maxWidth: 500,
          backgroundColor: 'white',
        }}
      >
        <Typography variant="h5" fontWeight="bold" mb={3} textAlign="center">
          Fitness Goals
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <DropDown />
          <DropDownEl />

          <Divider sx={{ my: 2 }} />

          <Typography variant="subtitle1" fontWeight="medium">
            Injuries / Other Information
          </Typography>
          <TextField label="Enter details" variant="outlined" fullWidth />

          <Typography variant="subtitle1" fontWeight="medium" mt={2}>
            Days Available
          </Typography>
          <Checkboxesday />

          <Button
            variant="contained"
            onClick={() => navigate('/home')}
            sx={{
              mt: 3,
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
