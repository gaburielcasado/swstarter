import { styled } from '@mui/material';

const UncheckedRadioIcon = styled('div')(({ theme }) => ({
  width: 16,
  height: 16,
  backgroundColor: '#fff',
  borderRadius: '50%',
  border: `1px solid ${theme.palette.custom.pinkishGrey}`,
}));

export default UncheckedRadioIcon;
