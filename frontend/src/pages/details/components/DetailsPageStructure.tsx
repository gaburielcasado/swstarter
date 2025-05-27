import { Box, Stack } from '@mui/material';
import type { ReactNode } from 'react';

export interface DetailsPageStructureProps {
  title: ReactNode;
  descriptionPanel: ReactNode;
  linksPanel: ReactNode;
  button: ReactNode;
}

export default function DetailsPageStructure({
  title,
  descriptionPanel,
  linksPanel,
  button,
}: DetailsPageStructureProps) {
  return (
    <Box
      display={'flex'}
      width={'100%'}
      justifyContent={'center'}
      height={'100%'}
    >
      <Stack direction={'column'} width={'100%'} maxWidth={'md'}>
        <Box sx={{ mb: 2 }}>{title}</Box>

        <Stack
          direction={{
            xs: 'column',
            sm: 'row',
          }}
          mt={3}
          columnGap={10}
          rowGap={5}
          width={'100%'}
          maxWidth={'100%'}
          height={'auto'}
        >
          <Box
            width={{
              xs: '100%',
              sm: '50%',
            }}
          >
            {descriptionPanel}
          </Box>
          <Box
            width={{
              xs: '100%',
              sm: '50%',
            }}
          >
            {linksPanel}
          </Box>
        </Stack>

        <Box mt={6} pb={6}>
          {button}
        </Box>
      </Stack>
    </Box>
  );
}
