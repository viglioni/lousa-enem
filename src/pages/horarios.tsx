import {
  AppBar,
  Tabs,
  Tab,
  Box,
  Container,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import 'dayjs/locale/pt-br'
import { ScheduleTable } from '../components/schedule_table'
import { schedules } from '../data/schedules'
import { GifBox } from '../components/gif'

const weekDays = [
  { label: 'Domingo', shortLabel: 'Dom', tinyLabel: 'D', value: 0 },
  { label: 'Segunda', shortLabel: 'Seg', tinyLabel: 'S', value: 1 },
  { label: 'Terça', shortLabel: 'Ter', tinyLabel: 'T', value: 2 },
  { label: 'Quarta', shortLabel: 'Qua', tinyLabel: 'Q', value: 3 },
  { label: 'Quinta', shortLabel: 'Qui', tinyLabel: 'Q', value: 4 },
  { label: 'Sexta', shortLabel: 'Sex', tinyLabel: 'S', value: 5 },
  { label: 'Sábado', shortLabel: 'Sáb', tinyLabel: 'S', value: 6 },
]

const periods = [
  {
    label: '10/Fev - 30/Jun',
    shortLabel: '1º',
    start: '2024-02-10',
    end: '2024-06-30',
  },
  {
    label: '01/Jul - 20/Ago',
    shortLabel: '2º',
    start: '2024-07-01',
    end: '2024-08-20',
  },
  {
    label: '21/Ago - 06/Set',
    shortLabel: '3º',
    start: '2024-08-21',
    end: '2024-09-06',
  },
]

const useResponsiveLabel = () => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const isTablet = useMediaQuery(theme.breakpoints.down('md'))

  const getLabel = (item: {
    label: string
    shortLabel: string
    tinyLabel?: string
  }) => {
    if (isMobile) {
      return item.tinyLabel || item.shortLabel
    }
    if (isTablet) {
      return item.shortLabel
    }
    return item.label
  }

  return { getLabel }
}

const StudySchedules = () => {
  const router = useRouter()
  const [currentPeriodTab, setCurrentPeriodTab] = useState(0)
  const [currentDayTab, setCurrentDayTab] = useState(0)
  const { getLabel } = useResponsiveLabel()

  useEffect(() => {
    dayjs.locale('pt-br')
    const today = dayjs()

    // Find current period
    const currentPeriod = periods.findIndex(
      period =>
        today.isAfter(dayjs(period.start)) && today.isBefore(dayjs(period.end)),
    )
    const periodIndex = currentPeriod !== -1 ? currentPeriod : 0
    setCurrentPeriodTab(periodIndex)

    // Find current day
    const currentDay = weekDays.findIndex(day => day.value === today.day())
    setCurrentDayTab(currentDay)

    // Update query params to match current date
    router.push(
      {
        pathname: '/horarios',
        query: {
          period: periods[periodIndex].label,
          day: weekDays[currentDay].label,
        },
      },
      undefined,
      { shallow: true },
    )
  }, [])

  const handlePeriodChange = (_: React.SyntheticEvent, newValue: number) => {
    setCurrentPeriodTab(newValue)
    router.push(
      {
        pathname: '/horarios',
        query: {
          ...router.query,
          period: periods[newValue].label,
        },
      },
      undefined,
      { shallow: true },
    )
  }

  const handleDayChange = (_: React.SyntheticEvent, newValue: number) => {
    setCurrentDayTab(newValue)
    router.push(
      {
        pathname: '/horarios',
        query: {
          ...router.query,
          day: weekDays[newValue].label,
        },
      },
      undefined,
      { shallow: true },
    )
  }

  const period = periods[currentPeriodTab]?.label
  const day = weekDays[currentDayTab]?.label
  const tableData = schedules[period][day]

  return (
    <Container>
      <Box sx={{ width: '100%' }}>
        <AppBar position="static">
          <Tabs
            value={currentPeriodTab}
            onChange={handlePeriodChange}
            centered
            sx={{ '& .MuiTab-root': { minWidth: 50 } }}
          >
            {periods.map(period => (
              <Tab key={period.label} label={getLabel(period)} />
            ))}
          </Tabs>
          <Tabs
            value={currentDayTab}
            onChange={handleDayChange}
            centered
            sx={{ '& .MuiTab-root': { minWidth: 50 } }}
          >
            {weekDays.map(day => (
              <Tab key={day.label} label={getLabel(day)} />
            ))}
          </Tabs>
        </AppBar>
      </Box>
      <Container sx={{ mt: 4, px: 0 }}>
        {tableData.length ? (
          <ScheduleTable items={tableData} />
        ) : (
          <GifBox src="https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExOTc3aHk0YXprd24waWhmbHJ6NnRnb2VsMzZiaGlmaWhuN2VhcHU1ciZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/rfQIda9Iiz3mhYf6XZ/giphy.gif" />
        )}
      </Container>
    </Container>
  )
}

export default StudySchedules
