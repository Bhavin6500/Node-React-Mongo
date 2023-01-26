import React, { useState, useEffect } from 'react'
import './Header.css'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Avatar } from '@material-ui/core'
import { useDispatch } from 'react-redux'
import decode from 'jwt-decode'

export const Header = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch()
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))
  console.log(user)

  useEffect(() => {
    const token = user?.token
    console.log(user?.token)
    if (token) {
      const decodedToken = decode(token)
      if (decodedToken.exp * 1000 < new Date().getTime()) logout()
    }

    setUser(JSON.parse(localStorage.getItem('profile')))
  }, [location])

  const logout = () => {
    dispatch({ type: 'LOGOUT' })
    navigate('/auth')
    setUser(null)
    window.location.reload()
  }
  return (
    <div className="header">
      <div className="headerWrapper">
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Toolbar>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
              >
                <MenuIcon />
              </IconButton>
              <Typography
                variant="h6"
                component={Link}
                to="/"
                sx={{ flexGrow: 1 }}
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                Memories
              </Typography>
              {user ? (
                <>
                  <Avatar
                    alt={user.result.name}
                    src={user.result.imageUrl}
                    style={{
                      marginRight: '10px',
                      height: '30px',
                      width: '30px',
                    }}
                  >
                    {user?.result.name.charAt(0)}
                  </Avatar>
                  <Typography style={{ marginRight: '10px' }}>
                    {user?.result.name}
                  </Typography>

                  <Button color="inherit" onClick={logout}>
                    Logout
                  </Button>
                </>
              ) : (
                <Button color="inherit" component={Link} to="/auth">
                  Login
                </Button>
              )}
            </Toolbar>
          </AppBar>
        </Box>
      </div>
    </div>
  )
}
