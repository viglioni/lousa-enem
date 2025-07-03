import { Button, Container, Stack } from '@mui/material'
import React from 'react'

const Home = () => {
  return (
    <Container
      maxWidth="sm"
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
      }}
    >
      <Stack spacing={4} sx={{ padding: '32px' }}>
        <Button
          component="a"
          href="/horarios"
          size="large"
          variant="contained"
          sx={{
            padding: '16px 32px',
            fontSize: '1.5rem',
          }}
        >
          Horários
        </Button>
        <Button
          component="a"
          href="/simulado"
          size="large"
          variant="contained"
          sx={{
            padding: '16px 32px',
            fontSize: '1.5rem',
          }}
        >
          Simulado
        </Button>
      </Stack>
    </Container>
  )
}

export default Home
