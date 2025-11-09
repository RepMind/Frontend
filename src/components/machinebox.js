import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

export default function CheckboxLabels() {
  return (
    <FormGroup>
      <FormControlLabel control={<Checkbox />} label="Treadmill" />
      <FormControlLabel control={<Checkbox />} label="Cable Machine" />
      <FormControlLabel control={<Checkbox />} label="Chest Press" />
      <FormControlLabel control={<Checkbox />} label="Lat Pulldown" />
      <FormControlLabel control={<Checkbox />} label="Leg Press" />
      <FormControlLabel control={<Checkbox />} label="Dumbbells" />
      <FormControlLabel control={<Checkbox />} label="Kettleells" />
      <FormControlLabel control={<Checkbox />} label="Others" />

      


    </FormGroup>
  );
}