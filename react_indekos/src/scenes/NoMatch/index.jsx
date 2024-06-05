import React from 'react'
import { Box, Button, useTheme } from '@mui/material'
import { useNavigate } from 'react-router-dom'
const NoMatch = () => {
  const theme = useTheme()
  const navigate = useNavigate()
  const btnstyle={margin:'2em 0', backgroundColor:theme.palette.secondary[500], color:"white", padding:'0.5em 0', borderRadius: '0.5em', width:'350px'}
  return (
    <Box width='350px' textAlign='center' margin='15rem auto' fontSize='1.1rem' display='flex' flexDirection='column'>
      Sorry! We don't find any match for your search!
      <Button style={btnstyle} onClick={() => navigate('/dashboard/:id')}>
        Go Back
      </Button>
    </Box>
  )
}

export default NoMatch
