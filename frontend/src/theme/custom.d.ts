import { Palette } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    custom: {
      pinkishGrey: string;
      warmGrey75: string;
      emerald: string;
    };
  }
  interface PaletteOptions {
    custom?: {
      pinkishGrey?: string;
      warmGrey75?: string;
      emerald?: string;
    };
  }
}
