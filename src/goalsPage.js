import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  Divider,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  FormGroup,
  FormControlLabel,
  Checkbox
} from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import axiosConfig from "./api";

export default function GoalsPage() {
  const navigate = useNavigate();
  const { search } = useLocation();
  const params = new URLSearchParams(search);

  // ✅ Extract user info from StartPage
  const user_id = params.get('username');
  const age = Number(params.get('age'));
  const height_cm = Number(params.get('height_cm'));
  const weight_kg = Number(params.get('weight_kg'));
  const gender = params.get('gender');

  // ✅ Local form state
  const [goal, setGoal] = useState('');
  const [experience_level, setExperienceLevel] = useState('');
  const [limitations, setLimitations] = useState('');
  const [available_days, setAvailableDays] = useState([]);
  const [loading, setLoading] = useState(false);

  // ✅ Handle checkbox selection
  const handleDayToggle = (day) => {
    setAvailableDays((prev) =>
      prev.includes(day)
        ? prev.filter((d) => d !== day)
        : [...prev, day]
    );
  };

  // ✅ Submit form
  const handleSubmit = async () => {
    const payload = {
      user_id,
      age,
      height_cm,
      weight_kg,
      gender,
      goal,
      experience_level,
      limitations,
      available_days,
    };

    console.log("📦 Submitting payload:", payload);

    if (!goal || !experience_level || available_days.length === 0) {
      alert("Please fill out all required fields before submitting.");
      return;
    }

    try {
      setLoading(true);
      const response = await axiosConfig.post('/', payload);
      console.log('✅ API Response:', response.data);
      navigate(`/home?user_id=${user_id}`);
    } catch (error) {
      console.error('❌ Error posting user data:', error);
      alert("Error submitting data. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  const allDays = [
    "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
  ];

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

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          {/* ✅ Goal Dropdown */}
          <FormControl fullWidth>
            <InputLabel>Goal</InputLabel>
            <Select
              value={goal}
              label="Goal"
              onChange={(e) => setGoal(e.target.value)}
            >
              <MenuItem value="build muscle">Build Muscle</MenuItem>
              <MenuItem value="lose fat">Lose Fat</MenuItem>
              <MenuItem value="maintain">Maintain</MenuItem>
              <MenuItem value="improve endurance">Improve Endurance</MenuItem>
            </Select>
          </FormControl>

          {/* ✅ Experience Level Dropdown */}
          <FormControl fullWidth>
            <InputLabel>Experience Level</InputLabel>
            <Select
              value={experience_level}
              label="Experience Level"
              onChange={(e) => setExperienceLevel(e.target.value)}
            >
              <MenuItem value="beginner">Beginner</MenuItem>
              <MenuItem value="intermediate">Intermediate</MenuItem>
              <MenuItem value="advanced">Advanced</MenuItem>
            </Select>
          </FormControl>

          <Divider />

          {/* ✅ Limitations / Injuries Input */}
          <Typography variant="subtitle1" fontWeight="medium">
            Injuries / Other Information
          </Typography>
          <TextField
            label="Enter details"
            variant="outlined"
            fullWidth
            value={limitations}
            onChange={(e) => setLimitations(e.target.value)}
          />

          {/* ✅ Available Days Checkboxes */}
          <Typography variant="subtitle1" fontWeight="medium" mt={1}>
            Days Available
          </Typography>
          <FormGroup>
            {allDays.map((day) => (
              <FormControlLabel
                key={day}
                control={
                  <Checkbox
                    checked={available_days.includes(day)}
                    onChange={() => handleDayToggle(day)}
                  />
                }
                label={day}
              />
            ))}
          </FormGroup>

          {/* ✅ Submit Button */}
          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={loading}
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
            {loading ? "Submitting..." : "Submit"}
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}
