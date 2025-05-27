import { Box, Stack } from '@mui/material';
import SearchForm from './SearchForm';
import SearchResultList from './SearchResultList';
import { useSearchStore } from '../stores/searchStore';
import { useEffect } from 'react';

export default function SearchPage() {
  const { results } = useSearchStore();

  useEffect(() => {
    document.title = 'HoloNet Explorer';
  }, []);

  return (
    <Stack
      direction={{
        xs: 'column',
        md: 'row',
      }}
      justifyContent={{
        xs: 'start',
        md: 'center',
      }}
      width={'100%'}
      height={'100%'}
    >
      <Box
        width={'100%'}
        maxWidth={{
          xs: '100%',
          md: 'sm',
        }}
      >
        <SearchForm />
      </Box>

      <Stack
        direction={'row'}
        width={results ? '100%' : 0}
        height={'100%'}
        sx={{
          transition: {
            xs: 'opacity 300ms ease-in',
            md: 'width 1000ms cubic-bezier(0.530, 0.005, 0.020, 0.995), opacity 300ms ease-in 350ms',
          },
          opacity: results ? 1 : 0,
          willChange: 'width, opacity',
        }}
        mt={{
          xs: 6,
          md: 0,
        }}
      >
        <Box
          pl={{
            xs: 0,
            md: 20,
          }}
        />
        <SearchResultList />
      </Stack>
    </Stack>
  );
}
