import React, { useState } from 'react'
import { GoogleLogin } from 'react-google-login'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import './Login.css'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputLabel from '@mui/material/InputLabel'
import InputAdornment from '@mui/material/InputAdornment'
import IconButton from '@mui/material/IconButton'
import FormControl from '@mui/material/FormControl'
import { useNavigate } from 'react-router'
import { signIn } from '../../Redux/Actions/Auth_Actions'

export const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [values, setValues] = useState({
    email: '',
    password: '',
  })
  let name, value
  const handleChange = (e) => {
    name = e.target.name
    value = e.target.value

    setValues({ ...values, [name]: value })
  }
  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    })
  }

  const handleMouseDownPassword = (event) => {
    event.preventDefault()
  }

  const handleSubmit = () => {
    dispatch(signIn(values, navigate))
  }

  const googleSuccess = async (res) => {
    const result = res?.profileObj
    const token = res?.tokenId

    try {
      dispatch({ type: 'AUTH', data: { result, token } })
      navigate('/')
      window.location.reload()
    } catch (error) {
      console.log(error)
    }
  }
  const googleError = () =>
    console.log('Google Sign In was unsuccessful. Try again later')
  // const googleFailure = (error) => {
  //   console.log(error, 'error')
  //   console.log('failed!!!')
  // }

  return (
    <div className="login">
      <div className="loginCard">
        <h2>Sign In</h2>

        <div className="loginForm">
          <TextField
            id="outlined-basic"
            label="Email"
            variant="outlined"
            name="email"
            value={values.email}
            fullWidth
            style={{ marginBottom: 10 }}
            onChange={handleChange}
          />
          <FormControl
            sx={{ width: '300px', marginBottom: 1 }}
            variant="outlined"
          >
            <InputLabel htmlFor="outlined-adornment-password">
              Password
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              name='password'
              fullWidth
              type={values.showPassword ? 'text' : 'password'}
              value={values.password}
              onChange={handleChange}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {values.showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
          </FormControl>
          <Button
            variant="contained"
            fullWidth
            style={{ marginBottom: 10 }}
            onClick={handleSubmit}
            type="submit"
          >
            Sign in
          </Button>
          <GoogleLogin
          //994095431122-gv0ajpj1k78h40h1o8v6g1b9abqboo3l.apps.googleusercontent.com
            clientId="994095431122-gv0ajpj1k78h40h1o8v6g1b9abqboo3l.apps.googleusercontent.com"
            render={(renderProps) => (
              <Button
                variant="contained"
                fullWidth
                style={{ marginBottom: 10 }}
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
              >
                Sign in with Google
              </Button>
            )}
            onSuccess={googleSuccess}
            onFailure={googleError}
            cookiePolicy="single_host_origin"
          />

          <h4>
            Don't have an account ?{' '}
            <Link
              to="/signUp"
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              Sign Up
            </Link>
          </h4>
        </div>
      </div>
    </div>
  )
}
