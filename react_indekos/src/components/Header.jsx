import React from 'react'
import { Typography, Box, useTheme } from '@mui/material'
const Header = ({ title, subTitle }) => {
    const theme = useTheme()
    return (
        <Box width={'auto'}>
            <Typography
            variant='h4'
            color='white'
            fontWeight='bold'
            sx={{ mb: '5px' }}
            >
                {title}
            </Typography>
        </Box>
    )
}

export default Header
