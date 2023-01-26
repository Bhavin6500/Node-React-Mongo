import React, { useState } from 'react'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import './Register.css'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router'
import { useDispatch } from 'react-redux'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputLabel from '@mui/material/InputLabel'
import InputAdornment from '@mui/material/InputAdornment'
import IconButton from '@mui/material/IconButton'
import FormControl from '@mui/material/FormControl'
import { signUp } from '../../Redux/Actions/Auth_Actions'

export const Register = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [values, setValues] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmpassword: '',
    showPassword: false,
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
    dispatch(signUp(values, navigate))
  }
  return (
    <div className="register">
      <div className="registerCard">
        <h2>Sign In</h2>
        <div className="registerForm">
          <div style={{display:"flex"}}>
            <TextField
              id="outlined-basic"
              label="First Name"
              variant="outlined"
              name="firstName"
              
              style={{ marginBottom: 10,marginRight:5 }}
              onChange={handleChange}
            />
            <TextField
              id="outlined-basic"
              label="Last Name"
              variant="outlined"
              name="lastName"
              
              style={{ marginBottom: 10 }}
              onChange={handleChange}
            />
          </div>

          <TextField
            id="outlined-basic"
            label="Email"
            variant="outlined"
            name="email"
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
              name="password"
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
          <TextField
            id="outlined-basic"
            label="Confirm Password"
            variant="outlined"
            name="confirmpassword"
            type="password"
            fullWidth
            style={{ marginBottom: 10 }}
            onChange={handleChange}
          />
          <Button
            variant="contained"
            fullWidth
            style={{ marginBottom: 10 }}
            onClick={handleSubmit}
            type="submit"
          >
            Sign Up
          </Button>
          <h4>
            Already have an account ?{' '}
            <Link
              to="/auth"
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              Sign In
            </Link>
          </h4>
        </div>
      </div>
    </div>
  )
}
