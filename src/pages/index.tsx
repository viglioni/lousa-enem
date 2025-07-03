import { VideoCall, Videocam } from '@mui/icons-material'
import {
  Button,
  Container,
  Grid,
  Typography,
  Box,
  createTheme,
  ThemeProvider,
  Snackbar,
  Alert,
} from '@mui/material'
import React, { useState } from 'react'

const warmTheme = createTheme({
  palette: {
    primary: {
      main: '#FF6B6B',
    },
    secondary: {
      main: '#2C3E50', // Bright green
    },
    background: {
      default: '#FAFAFA',
    },
    text: {
      primary: '#FFFFFF',
    },
  },
})

const MeetingIdButton = ({ text, value, onCopy }) => {
  const handleCopyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(value)
    } catch (err) {
      const textArea = document.createElement('textarea')
      textArea.value = value
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand('copy')
      document.body.removeChild(textArea)
    }
    onCopy(value)
  }

  return (
    <Button variant="outlined" onClick={handleCopyToClipboard}>
      {text} {value}
    </Button>
  )
}

const Home = () => {
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [copiedValue, setCopiedValue] = useState('')

  const handleCopy = value => {
    setCopiedValue(value)
    setSnackbarOpen(true)
  }

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false)
  }

  return (
    <ThemeProvider theme={warmTheme}>
      <Box
        sx={{
          'backgroundColor': 'background.default',
          'backgroundImage': 'url(mulheres.jpg)',
          'backgroundSize': 'cover',
          'backgroundPosition': 'center',
          'backgroundRepeat': 'no-repeat',
          'position': 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.7)', // Dark overlay
            zIndex: 1,
          },
        }}
      >
        <Container
          sx={{
            padding: '32px 16px',
            minHeight: '100vh',
            position: 'relative',
            zIndex: 2,
          }}
        >
          <Box sx={{ textAlign: 'center', marginBottom: '48px' }}>
            <Typography
              variant="h3"
              component="h1"
              sx={{
                fontWeight: 'bold',
                marginBottom: '24px',
                fontSize: { xs: '2rem', md: '3rem' },
                color: 'primary.main',
              }}
            >
              Defesa de Doutorado da Ianca
            </Typography>
            <Typography
              variant="h5"
              component="h2"
              sx={{
                fontWeight: 'medium',
                color: 'text.primary',
                fontSize: { xs: '1.2rem', md: '1.5rem' },
                lineHeight: 1.4,
              }}
            >
              IMUNIDADE CERVICOVAGINAL NO ENVELHECIMENTO REPRODUTIVO DA MULHER:
              INFLUÊNCIA DA INFECÇÃO POR HPV DE ALTO RISCO
            </Typography>
          </Box>

          <Grid
            container
            spacing={4}
            sx={{ justifyContent: 'center', marginTop: '20px' }}
          >
            <Grid item xs={12} md={6}>
              <Typography
                variant="body1"
                sx={{
                  fontSize: '1.5rem',
                  lineHeight: 1.6,
                  textAlign: { xs: 'center', md: 'left' },
                  color: 'text.primary',
                }}
              >
                Defesa de Ianca Évelin de Paula Viglioni.
                <br />
                <b>Orientador:</b> Dr. Marcelo Antônio Pascoal Xavier
                <br />
                <b>Coorientadora: </b> Dra. Vanessa Peruhype Magalhães Pascoal.
                <br />
                <br />O exame será realizado no dia 04 de julho de 2025 às 14
                horas, no formato remoto, via zoom.
                <br />
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}
                >
                  <Box
                    sx={{
                      margin: '20px',
                      display: 'flex',
                      flexDirection: 'row',
                      flexWrap: 'wrap',
                      gap: '10px',
                      justifyContent: 'space-around',
                    }}
                  >
                    <MeetingIdButton
                      text="ID da reunião:"
                      value="849 1159 5040"
                      onCopy={handleCopy}
                    />
                    <MeetingIdButton
                      text="Senha:"
                      value="879795"
                      onCopy={handleCopy}
                    />
                  </Box>
                </Box>
              </Typography>
            </Grid>

            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '24px',
                }}
              >
                <Button
                  component="a"
                  href="https://us06web.zoom.us/j/84911595040?pwd=y80HtZkbPHCUdOKkUFC4qN3HzrqTXh.1"
                  target="_blank"
                  rel="noopener noreferrer"
                  size="large"
                  variant="contained"
                  color="primary"
                  startIcon={<Videocam />}
                  sx={{
                    padding: '16px 32px',
                    fontSize: '1.2rem',
                    fontWeight: 'bold',
                    width: { xs: '100%', md: 'auto' },
                  }}
                >
                  Clique aqui para assistir a defesa
                </Button>
                <img
                  src="/zoom-qr-code.svg"
                  alt="QR Code para acesso à reunião"
                  style={{
                    width: '60%',

                    borderRadius: '8px',
                  }}
                />
              </Box>
            </Grid>
          </Grid>
        </Container>

        <Snackbar
          open={snackbarOpen}
          autoHideDuration={3000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert
            onClose={handleCloseSnackbar}
            severity="success"
            sx={{ width: '100%' }}
          >
            O número {copiedValue} foi copiado!
          </Alert>
        </Snackbar>
      </Box>
    </ThemeProvider>
  )
}

export default Home
