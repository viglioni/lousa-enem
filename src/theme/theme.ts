import { createTheme, responsiveFontSizes } from '@mui/material'

const theme = createTheme({
  palette: {
    mode: 'dark',
  },
  spacing: factor => `${0.5 * factor}rem`,
})

export default responsiveFontSizes(theme)
