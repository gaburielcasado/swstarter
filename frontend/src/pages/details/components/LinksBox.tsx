import { Divider, Link, Stack, Typography } from '@mui/material';
import type { DetailLinksPanel } from '../stores/detailsStore';
import { Link as RouterLink } from 'react-router-dom';
import { Fragment } from 'react/jsx-runtime';

export default function LinksBox({ data }: { data: DetailLinksPanel }) {
  return (
    <Stack direction={'column'}>
      <Typography variant="sectionTitle">{data.title}</Typography>
      <Divider sx={{ mt: 1 }} />
      <Typography variant="sectionBody" mt={0.5}>
        {data.items.map((item, index) => (
          <Fragment key={item.id}>
            <Link component={RouterLink} to={`/details/${item.id}`}>
              {item.title}
            </Link>
            {index < data.items.length - 1 && ', '}
          </Fragment>
        ))}
      </Typography>
    </Stack>
  );
}
