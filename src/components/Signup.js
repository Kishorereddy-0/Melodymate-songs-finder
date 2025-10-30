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

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!name || !email || !password || !confirmPassword) {
      setError('Please fill in all fields');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    const result = signup(name, email, password);
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
                Join MelodyMate
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Create an account to start your music journey
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
                label="Full Name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                margin="normal"
                variant="outlined"
                className="auth-input"
                autoComplete="name"
              />

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
                autoComplete="new-password"
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

              <TextField
                fullWidth
                label="Confirm Password"
                type={showPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                margin="normal"
                variant="outlined"
                className="auth-input"
                autoComplete="new-password"
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                className="auth-button"
              >
                Sign Up
              </Button>

              <Box className="auth-footer">
                <Typography variant="body2">
                  Already have an account?{' '}
                  <Link to="/login" className="auth-link">
                    Login
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

export default Signup;
