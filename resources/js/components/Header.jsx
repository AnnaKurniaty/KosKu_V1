import { Typography, Box, useTheme } from '@mui/material'
const Header = ({ title, subTitle }) => {
    const theme = useTheme()
    return (
        <Box>
            <Typography
            variant='h2'
            color='white'
            fontWeight='bold'
            sx={{ mb: '5px' }}
            >
                {title}
            </Typography>
            <Typography
            variant='h5'
            color='white'
            >
                {subTitle}
            </Typography>
        </Box>
    )
}

export default Header
