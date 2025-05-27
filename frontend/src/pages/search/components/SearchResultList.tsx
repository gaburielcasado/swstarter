import { Box, Divider, Stack, Typography, useTheme } from '@mui/material';
import { useSearchStore } from '../stores/searchStore';
import SearchResultListItem from './SearchResultListItem';
import fonts from '../../../theme/fonts';

export default function SearchResultList() {
  const { results, isLoading } = useSearchStore();
  const theme = useTheme();
  if (!results) {
    return null;
  }

  const text = isLoading ? (
    'Searching...'
  ) : (
    <>
      There are zero matches.
      <br />
      Use the form to search for People or Movies.
    </>
  );

  return (
    <Stack direction={'column'} width={'100%'} height={'100%'}>
      <Typography variant="pageTitle">Results</Typography>

      <Divider sx={{ mt: 2 }} />

      {results.length > 0 && !isLoading && (
        <>
          <Stack
            direction={'column'}
            width={'100%'}
            maxHeight={'100%'}
            overflow={'auto'}
            divider={<Divider />}
          >
            {results.map((result) => (
              <SearchResultListItem key={result.id} result={result} />
            ))}
          </Stack>
          <Divider />
        </>
      )}

      {(results.length === 0 || isLoading) && (
        <Box
          height={'100%'}
          display={'flex'}
          justifyContent={'center'}
          alignItems={'center'}
          mt={{ xs: 4, md: 0 }}
        >
          <Typography
            fontWeight={fonts.montserrat.weights.bold}
            color={theme.palette.custom.pinkishGrey}
            textAlign={'center'}
          >
            {text}
          </Typography>
        </Box>
      )}
    </Stack>
  );
}
