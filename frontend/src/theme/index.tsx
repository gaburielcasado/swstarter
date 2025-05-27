import { createTheme } from '@mui/material';
import UncheckedRadioIcon from '../components/UncheckedRadioIcon';
import CheckedRadioIcon from '../components/CheckedRadioIcon';
import fonts from './fonts';
import colors from './colors';

let theme = createTheme({
  spacing: 5,
  typography: {
    fontFamily: fonts.montserrat.fontFamily,
    htmlFontSize: 16,
  },
  components: {
    MuiInput: {
      defaultProps: {
        disableUnderline: true,
      },
    },
    MuiRadio: {
      defaultProps: {
        icon: <UncheckedRadioIcon />,
        checkedIcon: <CheckedRadioIcon />,
      },
    },
    MuiDivider: {
      defaultProps: {
        color: colors.pinkishGrey,
      },
    },
  },
  palette: {
    primary: {
      main: colors.greenTeal,
    },
    custom: {
      ...colors,
    },
  },
});

theme = createTheme(theme, {
  typography: {
    pageTitle: {
      fontSize: theme.typography.pxToRem(18),
      fontWeight: fonts.montserrat.weights.bold,
      color: '#000',
    },
    sectionTitle: {
      fontSize: theme.typography.pxToRem(16),
      fontWeight: fonts.montserrat.weights.bold,
      color: '#000',
    },
    sectionBody: {
      fontSize: theme.typography.pxToRem(14),
      fontWeight: fonts.montserrat.weights.regular,
      color: '#000',
    },
  },
  components: {
    MuiButton: {
      defaultProps: {
        disableElevation: true,
        sx: {
          borderRadius: '20px',
          py: '5px',
          color: '#fff',
          fontWeight: fonts.montserrat.weights.bold,
          '&.Mui-disabled': {
            backgroundColor: theme.palette.custom.pinkishGrey,
            color: '#fff',
          },
        },
      },
    },
    MuiOutlinedInput: {
      defaultProps: {
        sx: {
          input: {
            padding: 2,
            borderRadius: '4px',
            boxShadow: `inset 0 1px 3px 0 ${theme.palette.custom.warmGrey75}`,
            border: `1px solid ${theme.palette.custom.pinkishGrey}`,
            fontSize: theme.typography.pxToRem(14),
            fontWeight: fonts.montserrat.weights.bold,
            color: '#383838',
            '&::placeholder': {
              opacity: 1,
              color: theme.palette.custom.pinkishGrey,
            },
            '&:focus': {
              border: '1px solid #383838',
            },
          },
          fieldset: {
            padding: 0,
            border: 'none',
          },
        },
      },
    },
    MuiFormControlLabel: {
      defaultProps: {
        sx: {
          '.MuiFormControlLabel-label': {
            fontSize: theme.typography.pxToRem(14),
            fontWeight: fonts.montserrat.weights.bold,
          },
        },
      },
    },
  },
});

export default theme;
