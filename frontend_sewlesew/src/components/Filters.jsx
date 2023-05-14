import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Box, Stack, Typography } from '@mui/material';

const Filters = () => {
  return (
    <Box p={2} sx={{ overflow: 'auto', height: '90vh',
    flex: 2}}>
        <FormGroup row='false'>
            <FormControlLabel control={<Checkbox />} label="Medical Cases" />
            <FormControlLabel control={<Checkbox />} label="Housing Cases" />
            <FormControlLabel control={<Checkbox />} label="Elderly Support" />
            <FormControlLabel control={<Checkbox />} label="Disabled Support" />
            <FormControlLabel control={<Checkbox />} label="Child Support" />
        </FormGroup>
    </Box>
  )
}

export default Filters