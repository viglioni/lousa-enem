import { Box } from '@mui/material'

interface GifProps {
  src: string
}

export const GifBox = ({ src }: GifProps) => {
  return (
    <Box
      component="img"
      src={src}
      alt="Loading..."
      sx={{
        display: 'block',
        margin: 'auto',
        maxWidth: '100%',
        height: 'auto',
      }}
    />
  )
}
