import React, { useState } from 'react';
import { FormGroup, FormControlLabel, Checkbox, TextField, Box, Typography } from '@mui/material';

export default function CheckboxLabels() {
  const equipmentList = [
    'Treadmill',
    'Cable Machine',
    'Chest Press',
    'Lat Pulldown',
    'Leg Press',
    'Dumbbells',
    'Kettlebells',
    'Others',
  ];

  // Store checked state
  const [checkedItems, setCheckedItems] = useState({});
  // Store text for each field
  const [formValues, setFormValues] = useState({});

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setCheckedItems((prev) => ({ ...prev, [name]: checked }));

    // If unchecked, clear its text fields
    if (!checked) {
      setFormValues((prev) => {
        const newValues = { ...prev };
        delete newValues[name];
        return newValues;
      });
    }
  };

  const handleInputChange = (name, field, value) => {
    setFormValues((prev) => ({
      ...prev,
      [name]: {
        ...prev[name],
        [field]: value,
      },
    }));
  };

  return (
    <Box>
      <FormGroup>
        {equipmentList.map((item) => (
          <Box
            key={item}
            sx={{
              mb: 3,
              p: 2,
              borderRadius: 2,
              backgroundColor: '#f9f9f9',
              boxShadow: checkedItems[item]
                ? '0 0 0 2px #1976d2 inset'
                : '0 0 0 1px #e0e0e0 inset',
            }}
          >
            <FormControlLabel
              control={
                <Checkbox
                  name={item}
                  checked={!!checkedItems[item]}
                  onChange={handleCheckboxChange}
                />
              }
              label={
                <Typography fontWeight="bold" color="#333">
                  {item}
                </Typography>
              }
            />

            {/* ✅ Show text boxes when checked */}
            {checkedItems[item] && (
              <Box sx={{ mt: 1, display: 'flex', flexDirection: 'column', gap: 1 }}>
                <TextField
                  variant="outlined"
                  label="Reps"
                  fullWidth
                  value={formValues[item]?.weight || ''}
                  onChange={(e) =>
                    handleInputChange(item, 'weight', e.target.value)
                  }
                />
                <TextField
                  variant="outlined"
                  label="Sets"
                  fullWidth
                  value={formValues[item]?.reps || ''}
                  onChange={(e) =>
                    handleInputChange(item, 'reps', e.target.value)
                  }
                />
              </Box>
            )}
          </Box>
        ))}
      </FormGroup>
    </Box>
  );
}
