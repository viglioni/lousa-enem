import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material'

interface ScheduleItem {
  time: string
  activity: string
}

interface ScheduleTableProps {
  items: ScheduleItem[]
}

const ScheduleTable = ({ items }: ScheduleTableProps) => {
  return (
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
            <TableRow key={item.time}>
              <TableCell>{item.time}</TableCell>
              <TableCell>{item.activity}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default ScheduleTable
