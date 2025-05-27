import { Box, Button, Stack, Typography } from '@mui/material';
import { useDetailsStore } from '../stores/detailsStore';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import DescriptionBox from './DescriptionBox';
import LinksBox from './LinksBox';
import DetailsPageSkeleton from './DetailsPageSkeleton';
import DetailsPageStructure from './DetailsPageStructure';

const BackButton = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate('/');
  };

  return (
    <Button variant="contained" onClick={handleBackClick}>
      Back to search
    </Button>
  );
};

export default function DetailsPage() {
  const { isLoading, result, fetchDetails } = useDetailsStore();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (id) {
      fetchDetails(id);
    }
  }, [id]);

  useEffect(() => {
    document.title = 'HoloRecord Viewer';
  }, []);

  if (isLoading) {
    return <DetailsPageSkeleton />;
  }

  if (!result) {
    return (
      <Stack
        direction={'column'}
        maxWidth={'md'}
        width={'100%'}
        justifyContent={'center'}
        alignItems={'center'}
      >
        <Typography variant="pageTitle">Details not found</Typography>

        <Box mt={3}>
          <BackButton />
        </Box>
      </Stack>
    );
  }

  return (
    <DetailsPageStructure
      title={<Typography variant="pageTitle">{result.title}</Typography>}
      descriptionPanel={<DescriptionBox data={result.descriptionPanel} />}
      linksPanel={<LinksBox data={result.detailLinksPanel} />}
      button={<BackButton />}
    />
  );
}
