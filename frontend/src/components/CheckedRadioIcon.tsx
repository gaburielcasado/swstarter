import { styled } from '@mui/material';

const CheckedRadioIcon = styled('div')(({ theme }) => ({
  width: 16,
  height: 16,
  backgroundColor: '#fff',
  borderRadius: '50%',
  border: `6px solid ${theme.palette.custom.emerald}`,
}));

export default CheckedRadioIcon;
