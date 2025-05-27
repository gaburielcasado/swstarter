import {
  Button,
  FormControlLabel,
  OutlinedInput,
  Radio,
  RadioGroup,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';
import { useState } from 'react';
import fonts from '../../../theme/fonts';
import { useSearchStore } from '../stores/searchStore';

export default function SearchForm() {
  const theme = useTheme();
  const { pxToRem } = theme.typography;

  const [query, setQuery] = useState('');
  const [type, setType] = useState<'character' | 'film'>('character');

  const { isLoading: loading, fetchResults } = useSearchStore();

  const typePlaceholderMap: Record<'character' | 'film', string> = {
    character: 'e.g. Chewbacca, Yoda, Boba Fett',
    film: 'e.g. A New Hope, The Empire Strikes Back',
  };

  const handleSearch = () => {
    if (!query.trim() || loading) return;
    fetchResults(query, type);
  };

  const handleTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setType(e.target.value as 'character' | 'film');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <Stack spacing={4} width={'100%'}>
      <Typography
        fontFamily={fonts.montserrat.fontFamily}
        fontWeight={fonts.montserrat.weights.semiBold}
        fontSize={pxToRem(14)}
        color="#383838"
      >
        What are you searching for?
      </Typography>

      <RadioGroup row value={type} onChange={handleTypeChange}>
        <FormControlLabel
          value="character"
          control={<Radio />}
          label="People"
        />
        <FormControlLabel value="film" control={<Radio />} label="Movies" />
      </RadioGroup>

      <OutlinedInput
        fullWidth
        placeholder={typePlaceholderMap[type]}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
      />

      <Button
        variant="contained"
        onClick={handleSearch}
        disabled={!query.trim()}
      >
        {loading ? 'Searching...' : 'Search'}
      </Button>
    </Stack>
  );
}
