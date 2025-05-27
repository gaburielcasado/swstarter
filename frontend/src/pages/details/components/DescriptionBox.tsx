import { Divider, Stack, Typography } from '@mui/material';
import type { DescriptionPanel } from '../stores/detailsStore';

export default function DescriptionBox({ data }: { data: DescriptionPanel }) {
  return (
    <Stack direction={'column'} width={'100%'}>
      <Typography variant="sectionTitle">{data.title}</Typography>
      <Divider sx={{ mt: 1 }} />
      <Typography variant="sectionBody" whiteSpace={'pre'} mt={0.5}>
        {data.body}
      </Typography>
    </Stack>
  );
}
