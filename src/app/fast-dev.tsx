'use client';

import React from 'react';
import Link from 'next/link';
import {
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
} from '@mui/material';
import { Palette, Storefront, LocalOffer, Person } from '@mui/icons-material';

export default function FastDevPage() {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        width: '100%',
        bgcolor: '#0f0f0f',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        p: 4,
        color: 'white',
      }}
    >
      <Typography
        variant="h2"
        component="h1"
        sx={{ mb: 1, fontWeight: 'bold' }}
      >
        Collie Fashion
      </Typography>

      <Typography variant="h6" sx={{ mb: 4, opacity: 0.7 }}>
        Development Mode - Fast Compilation
      </Typography>

      <Button
        component={Link}
        href="/regular-page"
        variant="contained"
        color="primary"
        size="large"
        sx={{
          mb: 6,
          px: 4,
          py: 1.5,
          fontSize: '1.1rem',
          bgcolor: '#3f51b5',
          '&:hover': {
            bgcolor: '#303f9f',
          },
        }}
      >
        Load Full Application
      </Button>

      <Grid container spacing={3} sx={{ maxWidth: 600 }}>
        <Grid item xs={6}>
          <Card sx={{ bgcolor: 'rgba(255,255,255,0.05)', color: 'white' }}>
            <CardContent
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                p: 3,
              }}
            >
              <Palette sx={{ fontSize: 40, mb: 2, color: '#f06292' }} />
              <Typography variant="h6">Discover</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={6}>
          <Card sx={{ bgcolor: 'rgba(255,255,255,0.05)', color: 'white' }}>
            <CardContent
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                p: 3,
              }}
            >
              <Storefront sx={{ fontSize: 40, mb: 2, color: '#64b5f6' }} />
              <Typography variant="h6">Collections</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={6}>
          <Card sx={{ bgcolor: 'rgba(255,255,255,0.05)', color: 'white' }}>
            <CardContent
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                p: 3,
              }}
            >
              <LocalOffer sx={{ fontSize: 40, mb: 2, color: '#81c784' }} />
              <Typography variant="h6">Offers</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={6}>
          <Card sx={{ bgcolor: 'rgba(255,255,255,0.05)', color: 'white' }}>
            <CardContent
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                p: 3,
              }}
            >
              <Person sx={{ fontSize: 40, mb: 2, color: '#ffb74d' }} />
              <Typography variant="h6">Profile</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Typography variant="body2" sx={{ mt: 6, opacity: 0.5 }}>
        This is a lightweight version for faster development.
      </Typography>
    </Box>
  );
}
