import { Button, Stack, Typography } from '@mui/material';
import type { SearchResult } from '../stores/searchStore';
import { useNavigate } from 'react-router-dom';

interface SearchResultListItemProps {
  result: SearchResult;
}

export default function SearchResultListItem({
  result,
}: SearchResultListItemProps) {
  const navigate = useNavigate();

  const handleDetailsClick = () => {
    navigate(`/details/${result.id}`);
  };

  return (
    <Stack
      direction={'row'}
      justifyContent={'space-between'}
      py={2}
      alignItems={'center'}
    >
      <Typography>{result.title}</Typography>

      <Button variant="contained" onClick={handleDetailsClick}>
        See details
      </Button>
    </Stack>
  );
}
