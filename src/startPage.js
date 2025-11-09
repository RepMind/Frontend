import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Paper } from '@mui/material';
import DropDown from './components/dropDown';
import { useNavigate } from 'react-router-dom';
import axiosInstance from "./api";

export default function StartPage() {
  const navigate = useNavigate();

  // ✅ Store form input values in state
  const [formData, setFormData] = useState({
    username: '',
    age: '',
    height_cm: '',
    weight_kg: '',
    gender: '', // assuming DropDown sets gender
  });

  // Handle text input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle dropdown selection (assuming DropDown returns value)
  const handleGenderSelect = (gender) => {
    setFormData((prev) => ({ ...prev, gender }));
  };

  // ✅ Submit handler
  const handleSubmit = () => {
    // Build query string
    const query = new URLSearchParams(formData).toString();
    navigate(`/goals?${query}`);
  };

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
          <TextField
            label="Username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            variant="outlined"
            fullWidth
          />
          <TextField
            label="Age"
            name="age"
            value={formData.age}
            onChange={handleChange}
            variant="outlined"
            fullWidth
          />
          <TextField
            label="Height (cm)"
            name="height_cm"
            value={formData.height_cm}
            onChange={handleChange}
            variant="outlined"
            fullWidth
          />
          <TextField
            label="Weight (kg)"
            name="weight_kg"
            value={formData.weight_kg}
            onChange={handleChange}
            variant="outlined"
            fullWidth
          />

          {/* DropDown component */}
          <DropDown onSelect={handleGenderSelect} />

          <Button
            variant="contained"
            onClick={handleSubmit}
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
