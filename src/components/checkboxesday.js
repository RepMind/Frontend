import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

export default function CheckboxLabels() {
  return (
    <FormGroup>
      <FormControlLabel control={<Checkbox />} label="Monday" />
      <FormControlLabel control={<Checkbox />} label="Tuesday" />
      <FormControlLabel control={<Checkbox />} label="Wednesday" />
      <FormControlLabel control={<Checkbox />} label="Thrusday" />
      <FormControlLabel control={<Checkbox />} label="Friday" />
      <FormControlLabel control={<Checkbox />} label="Saturday" />
      <FormControlLabel control={<Checkbox />} label="Sunday" />
      


    </FormGroup>
  );
}