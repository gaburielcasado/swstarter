import { Skeleton } from '@mui/material';
import DetailsPageStructure from './DetailsPageStructure';

export default function DetailsPageSkeleton() {
  return (
    <DetailsPageStructure
      title={<Skeleton height={'30px'} width={'300px'} variant="rounded" />}
      descriptionPanel={<Skeleton height={'400px'} variant="rounded" />}
      linksPanel={<Skeleton height={'400px'} variant="rounded" />}
      button={<Skeleton height={'40px'} width={'180px'} variant="rounded" />}
    />
  );
}
