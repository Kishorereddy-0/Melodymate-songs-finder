import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Alert,
  InputAdornment,
  IconButton
} from '@mui/material';
import { Visibility, VisibilityOff, MusicNote } from '@mui/icons-material';
import '../styles/Auth.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email');
      return;
    }

    const result = login(email, password);
    if (result.success) {
      navigate('/songs');
    }
  };

  return (
    <div className="auth-container">
      <Container maxWidth="sm">
        <Box className="auth-box">
          <Paper elevation={10} className="auth-paper">
            <Box className="auth-header">
              <MusicNote className="auth-icon" />
              <Typography variant="h4" component="h1" className="auth-title">
                Welcome Back
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Login to discover amazing music
              </Typography>
            </Box>

            <form onSubmit={handleSubmit}>
              {error && (
                <Alert severity="error" className="auth-alert">
                  {error}
                </Alert>
              )}

              <TextField
                fullWidth
                label="Email Address"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                margin="normal"
                variant="outlined"
                className="auth-input"
                autoComplete="email"
              />

              <TextField
                fullWidth
                label="Password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                margin="normal"
                variant="outlined"
                className="auth-input"
                autoComplete="current-password"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                className="auth-button"
              >
                Login
              </Button>

              <Box className="auth-footer">
                <Typography variant="body2">
                  Don't have an account?{' '}
                  <Link to="/signup" className="auth-link">
                    Sign Up
                  </Link>
                </Typography>
              </Box>
            </form>
          </Paper>
        </Box>
      </Container>
    </div>
  );
};

export default Login;
