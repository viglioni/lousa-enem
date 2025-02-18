import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
} from '@mui/material'
import { useEffect, useState } from 'react'
import dayjs from 'dayjs'

interface ScheduleItem {
  time: string
  activity: string
}

interface ScheduleTableProps {
  items: ScheduleItem[]
}

const ScheduleTable = ({ items }: ScheduleTableProps) => {
  const [currentTimeSlot, setCurrentTimeSlot] = useState<string | null>(null)

  useEffect(() => {
    const updateCurrentTimeSlot = () => {
      const now = dayjs()
      const currentTime = now.format('HH:mm')

      const matchingSlot = items.find(item => {
        const [start, end] = item.time.split(' - ')
        return currentTime >= start && currentTime <= end
      })

      setCurrentTimeSlot(matchingSlot?.time || null)
    }

    updateCurrentTimeSlot()
    const interval = setInterval(updateCurrentTimeSlot, 60000) // Update every minute

    return () => clearInterval(interval)
  }, [items])

  return (
    <Box sx={{ mt: 4 }}>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Horário</TableCell>
              <TableCell>Atividade</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map(item => (
              <TableRow
                key={item.time}
                sx={{
                  backgroundColor:
                    item.time === currentTimeSlot ? 'action.hover' : 'inherit',
                }}
              >
                <TableCell>{item.time}</TableCell>
                <TableCell>{item.activity}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}

export default ScheduleTable
