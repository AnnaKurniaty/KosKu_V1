import { Grid,Paper, TextField} from '@material-ui/core'
import { LoadingButton } from '@mui/lab'
// import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import { useTheme, Box } from '@mui/material';
import { useState } from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { setUserId } from '../../utils'
import { setUser } from "../../state"
import { setLoading } from "../../state"
import logoImage from "../../asset/logo.png";

const Register = () => {
    const theme = useTheme()
    const [email, setEmail] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const loading = useSelector((state) => state.global.loading)
    const paperStyle={padding :20,height:"auto",width:350, margin:"5rem auto", backgroundColor: theme.palette.background.alt}
    const textStyle={color: theme.palette.secondary[500]}
    const btnstyle={margin:'2em 0', backgroundColor:theme.palette.secondary[500], color:"white", padding:'0.5em 0', borderRadius: '0.5em'}
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const LoginTo = (e) => {
        e.preventDefault()
        dispatch(setLoading())
        axios.post('http://localhost:9000/login/login', {email: email, password: password}).then(response => {
            dispatch(setLoading())
            setUserId(response.data[0]._id)
            dispatch(setUser(response.data[0]._id))
            navigate('/dashboard')
        }).catch(error => {
            dispatch(setLoading())
            console.log(error)
        })
    }
    return(
        <Grid>
            <Paper elevation={10} style={paperStyle}>
                <Grid align='center'>
                <Box
                component="img"
                alt="logo"
                src={logoImage}
                height="58px"
                width="84px"
              />
                    <h2 style={textStyle}>Sign In</h2>
                </Grid>
                <form onSubmit={LoginTo}>
                    <TextField 
                    label='Email' 
                    placeholder='Enter Email Address'
                    fullWidth 
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    
                    InputLabelProps={{
                        style: { color: theme.palette.secondary[500] }
                    }} 
                    InputProps={{
                        style: {
                            color: theme.palette.secondary[500]
                        },
                    }}
                    />
                    <TextField 
                    label='Nama Pengguna' 
                    placeholder='Enter Username'
                    fullWidth 
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    
                    InputLabelProps={{
                        style: { color: theme.palette.secondary[500] }
                    }} 
                    InputProps={{
                        style: {
                            color: theme.palette.secondary[500]
                        },
                    }}
                    />
                    <TextField 
                    label='Password' 
                    placeholder='Enter password' 
                    type='password' 
                    fullWidth 
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                   
                    InputLabelProps={{
                        style: { color: theme.palette.secondary[500] },
                    }}
                    style={{
                        color: theme.palette.secondary[500],
                        marginTop: '.4rem'
                    }}
                    InputProps={{
                        style: {
                            color: theme.palette.secondary[500]
                        },
                    }}
                    />
                    <LoadingButton type='submit' style={btnstyle} fullWidth loading={loading}>Daftar</LoadingButton>
                </form>
            </Paper>
        </Grid>
    )
}

export default Register