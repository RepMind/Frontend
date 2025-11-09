import React, { useEffect, useState } from 'react';
import { Box, Typography, Paper, Button, FormControlLabel, Checkbox, TextField } from '@mui/material';
import Calendar from './components/calendar';
import DatePicker from './components/datePicker';
import axiosInstance from './api';
import { useLocation, useNavigate } from 'react-router';
import { Navigate } from 'react-router';

export default function HomePage() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const user_id = params.get('user_id');
  const navigate = useNavigate()

  const [workouts, setWorkouts] = useState([]);
  const [selectedExercises, setSelectedExercises] = useState({}); // checkboxes
  const [exerciseWeights, setExerciseWeights] = useState({}); // store weight input for each exercise

  useEffect(() => {
    if (!user_id) return;

    axiosInstance.get(`/user/${user_id}/workouts`)
      .then(res => {
        if (res.data.workouts) {
          setWorkouts(res.data.workouts);
        }
      })
      .catch(err => console.error('Error fetching workouts:', err));
  }, [user_id]);

  const handleExerciseToggle = (workoutIdx, exerciseIdx) => {
    const key = `${workoutIdx}-${exerciseIdx}`;
    setSelectedExercises(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
    // clear weight if unchecked
    if (selectedExercises[key]) {
      setExerciseWeights(prev => {
        const copy = { ...prev };
        delete copy[key];
        return copy;
      });
    }
  };

  const handleWeightChange = (workoutIdx, exerciseIdx, value) => {
    const key = `${workoutIdx}-${exerciseIdx}`;
    setExerciseWeights(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleLogWorkout = () => {
    axiosInstance.post("/log", {
      user_id: user_id,
      workout_id: workouts[0].workout_id,
      notes: generateNotes()
    }).then(() => {
      navigate(`/log-workout?user_id=${user_id}`)
    })
  };

  const generateNotes = () => {
    const notes = [];
  
    workouts.forEach((workout, wIdx) => {
      workout.exercise.forEach((ex, eIdx ) => {
        const key = `${wIdx}-${eIdx}`;
        if (selectedExercises[key] && exerciseWeights[key]) {
          notes.push(`${ex.exercise_name}: ${exerciseWeights[key]}`);
        }
      });
    });
  
    return notes.length > 0 ? notes.join(', ') + '.' : '';
  };
  

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
              Your Workouts:
            </Typography>
            {workouts.length === 0 && (
              <Typography>No workouts found for this user.</Typography>
            )}
            {workouts.map((workout, wIdx) => (
              <Box key={wIdx} sx={{ mb: 2, p: 2, border: '1px solid #ccc', borderRadius: 2 }}>
                <Typography variant="subtitle2" fontWeight="bold" mb={1}>
                  {workout.workout_name || `Workout ${wIdx + 1}`}
                </Typography>
                {workout.exercise.map((ex, eIdx) => {
                  const key = `${wIdx}-${eIdx}`;
                  return (
                    <Box key={eIdx} sx={{ mb: 1 }}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={!!selectedExercises[key]}
                            onChange={() => handleExerciseToggle(wIdx, eIdx)}
                          />
                        }
                        label={`${ex.exercise_name} — ${ex.sets} sets × ${ex.reps}`}
                      />
                      {selectedExercises[key] && (
                        <TextField
                          label="Weight used"
                          variant="outlined"
                          fullWidth
                          size="small"
                          value={exerciseWeights[key] || ''}
                          onChange={(e) => handleWeightChange(wIdx, eIdx, e.target.value)}
                          sx={{ mt: 1 }}
                        />
                      )}
                    </Box>
                  );
                })}
              </Box>
            ))}
          </Box>

          <Button
            variant="contained"
            onClick={handleLogWorkout}
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
          <Button variant="outlined">Regenerate Plan</Button>
        </Box>
      </Paper>
    </Box>
  );
}
