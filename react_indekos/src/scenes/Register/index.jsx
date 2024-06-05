import React from 'react'
import { LoadingButton } from '@mui/lab'
import { useTheme, Box, Grid,Paper, TextField } from '@mui/material';
import { useState } from 'react'
import { useNavigate } from "react-router-dom";
import axiosClient from '../../axios-client';
import { useSelector } from 'react-redux';
import logoImage from "../../asset/logo.png";
import { useStateContext } from "../../context/ContextProvider";

const Register = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const [nama_lengkap, setNama] = useState("");
    const [alamat_pemilik, setAlamat] = useState("");
    const [nomor_telepon, setNomor] = useState("");
    const [password, setPassword] = useState("");

    const [errors, setErrors] = useState([]);

    const submitHandle =  (ev) =>{
        ev.preventDefault();
        const payload = {
            nama_lengkap: nama_lengkap,
            alamat_pemilik: alamat_pemilik,
            nomor_telepon: nomor_telepon,
            password: password,
        }
        axiosClient.post("/register",payload).then(data =>{
            navigate('/login');
        }).catch(err => {
            const response = err.response;
            if(response && response.status === 422){
                console.log(response.data.errors);
            }
        });
    }

    const loading = useSelector((state) => state.global.loading)
    const paperStyle={padding :20,height:"auto",width:350, margin:"9rem auto 9rem auto",backgroundColor: theme.palette.background.alt, borderRadius: '3rem'}
    const btnstyle={margin:'2em 0', backgroundColor:'#FF9900', color:"white", padding:'0.5em 2em', borderRadius: '2em'}

    return(
        <Grid>
            <Paper elevation={10} style={paperStyle}>
                <Grid align='center'>
                <Box
                component="img"
                alt="logo"
                src={logoImage}
                height="98px"
                    width="134px"
                    marginBottom={'2rem'}
              />
                </Grid>
                <form onSubmit={submitHandle}>
                    <TextField 
                    label='Nama Lengkap' 
                    value={nama_lengkap}
                    onChange={(v) => setNama(v.target.value)}
                    error={errors["nama_lengkap"] ?? null}
                    variant='standard'
                    color='warning'
                    fullWidth 
                    required
                    InputLabelProps={{
                        style: { color: "black" }
                    }} 
                    InputProps={{
                        style: {
                            color: "black"
                        },
                    }}
                    />
                    <TextField 
                    label='Alamat' 
                    value={alamat_pemilik}
                    onChange={(v) => setAlamat(v.target.value)}
                    error={errors["alamat_pemilik"] ?? null}
                    variant='standard'
                    color='warning'
                    fullWidth 
                    required
                    InputLabelProps={{
                        style: { color: "black" }
                    }} 
                    InputProps={{
                        style: {
                            color: "black"
                        },
                    }}
                    />
                    <TextField 
                    label='Nomor Telepon' 
                    value={nomor_telepon}
                    onChange={(v) => setNomor(v.target.value)}
                    error={errors["nomor_telepon"] ?? null}
                    variant='standard'
                    color='warning'
                    fullWidth 
                    required
                    InputLabelProps={{
                        style: { color: "black" }
                    }} 
                    InputProps={{
                        style: {
                            color: "black"
                        },
                    }}
                    />
                    <TextField 
                    label='Password' 
                    type='password' 
                    value={password}
                    onChange={(v) => setPassword(v.target.value)}
                        error={errors["password"] ?? null}
                    fullWidth 
                    required
                    variant='standard'
                    color='warning'
                    InputLabelProps={{
                        style: { color: "black" },
                    }}
                    style={{
                        color: "black",
                        marginTop: '.4rem'
                    }}
                    InputProps={{
                        style: {
                            color: "black"
                        },
                    }}
                    />
                    <div align="center">
                        <LoadingButton type='submit' style={btnstyle} loading={loading}>Daftar</LoadingButton>
                    </div>
                </form>
            </Paper>
        </Grid>
    )
}

export default Register;