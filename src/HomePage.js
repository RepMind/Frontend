import React from 'react';
import { Box, Typography, Paper, Button } from '@mui/material';
import Calendar from './components/calendar';
import DatePicker from './components/datePicker';
import Machinebox from './components/machinebox';
import TextField from './components/textfield';

export default function HomePage() {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        p: 3,
        backgroundColor: '#f5f7fa',
        minHeight: '100vh',
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 4,
          borderRadius: 3,
          width: '100%',
          maxWidth: 600,
          backgroundColor: 'white',
        }}
      >
        <Typography variant="h5" fontWeight="bold" mb={3} textAlign="center">
          Home Page
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <Box>
            <Typography variant="subtitle1" mb={1}>
              Welcome! Here’s your calendar:
            </Typography>
            <Calendar />
          </Box>

          <Box>
            <Typography variant="subtitle1" mb={1}>
              Pick a date:
            </Typography>
            <DatePicker />
          </Box>

          <Box>
            <Typography variant="subtitle1" mb={1}>
              What workout did you do today?
            </Typography>
            <Machinebox />
          </Box>

          <Box>
            <Typography variant="subtitle1" mb={1}>
              How long did you work out today?
            </Typography>
            <TextField label="Minutes" variant="outlined" fullWidth />
          </Box>

          <Box>
            <Typography variant="subtitle1" mb={1}>
              Extra Info (sets, reps, etc)
            </Typography>
            <TextField label="Extra Info" variant="outlined" fullWidth />
          </Box>

          <Button   
            variant="contained"
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
            Log Workout
          </Button>
          <Button>Regenerate Plan</Button>
        </Box>
      </Paper>
    </Box>
  );
}
