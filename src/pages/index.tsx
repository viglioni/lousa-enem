import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  TimelineSeparator,
} from '@mui/lab'
import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from '@mui/material'
import { TimePicker } from '@mui/x-date-pickers/TimePicker'
import dayjs, { Dayjs } from 'dayjs'
import { useEffect, useState } from 'react'

// Aliases
const InputsContainer = Grid
const TestStartContainer = Grid
const DurationContainer = Grid

// Static Subcomponents
const Title = () => (
  <Typography variant="h3" align="center">
    Lousa ENEM
  </Typography>
)

interface DotProps {
  text: string
  end?: boolean
  marked?: boolean
}

const Dot = ({ text, end = false, marked = false }: DotProps) => (
  <TimelineItem>
    <TimelineSeparator>
      <TimelineDot color={marked ? 'success' : 'grey'} />
      {!end && <TimelineConnector />}
    </TimelineSeparator>
    <TimelineContent>{text}</TimelineContent>
  </TimelineItem>
)

const Home = (): JSX.Element => {
  const [value, setValue] = useState<Dayjs | null>(dayjs())
  const [duration, setDuration] = useState<number>(5 * 60)
  const [now, setNow] = useState<Dayjs>(dayjs())

  const spentMinutes = now.diff(value, 'minutes')
  const missingMinutes = duration - spentMinutes

  useEffect(() => {
    // Updates every minute
    const interval = setInterval(() => {
      setNow(dayjs())
    }, 60 * 1000)
    return () => {
      clearInterval(interval)
    }
  }, [])

  return (
    <Grid container gap="16px" direction="column" padding={'16px'}>
      <Title />
      <InputsContainer
        container
        direction="row"
        gap="16px"
        justifyContent={'space-evenly'}
      >
        <TestStartContainer direction="column">
          <InputLabel id="duration">Selecione a duração da prova</InputLabel>
          <TimePicker
            ampm={false}
            value={value}
            onChange={value => setValue(value)}
          />
        </TestStartContainer>
        <DurationContainer
          justifyContent="flex-end"
          display="flex"
          direction="column"
        >
          <InputLabel id="duration">Selecione a duração da prova</InputLabel>
          <FormControl>
            <Select
              labelId="duration"
              value={duration.toString()}
              id="select-duration"
              label="Duração"
              onChange={(e: SelectChangeEvent) => {
                setDuration(Number(e.target.value))
              }}
            >
              <MenuItem value={`${5 * 60}`}> 5h00min </MenuItem>
              <MenuItem value={`${5 * 60 + 30}`}> 5h30min </MenuItem>
            </Select>
          </FormControl>
        </DurationContainer>
      </InputsContainer>
      <Grid>
        <Timeline>
          <Dot text="Início" marked={spentMinutes >= 0} />
          <Dot text="1h" marked={spentMinutes >= 1 * 60} />
          <Dot text="2h" marked={spentMinutes >= 2 * 60} />
          <Dot text="3h" marked={spentMinutes >= 3 * 60} />
          <Dot text="4h" marked={spentMinutes >= 4 * 60} />
          <Dot text="Falta meia hora" marked={missingMinutes <= 30} />
          <Dot text="Faltam quinze minutos" marked={missingMinutes <= 15} />
          <Dot text="Faltam cinco minutos" marked={missingMinutes <= 5} />
          <Dot text="Tempo esgotado" marked={missingMinutes < 0} end />
        </Timeline>
      </Grid>
    </Grid>
  )
}

export default Home
