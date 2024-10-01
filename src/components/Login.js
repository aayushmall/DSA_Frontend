import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Card, CardContent, Typography, Grid } from '@mui/material';


const Login = ({ setToken, setCompletedSubtopics }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(process.env.REACT_APP_BACKEND_BASE_URL + '/api/auth/login', { email, password });
      setToken(response.data.token);
      debugger
      setCompletedSubtopics(response.data.completedSubtopics); 
    } catch (err) {
      setError('Invalid credentials. Please try again.');
    }
  };

  return (
    <Grid container justifyContent="center" style={{ minHeight: '100vh', alignItems: 'center' }}>
      <Grid item xs={12} sm={6} md={4}>
        <Card>
          <CardContent>
            <Typography variant="h4" component="div" gutterBottom align="center">
              Login
            </Typography>

            <form onSubmit={handleSubmit}>
              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                margin="normal"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                label="Password"
                type="password"
                variant="outlined"
                fullWidth
                margin="normal"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              {error && <Typography color="error" align="center">{error}</Typography>}

              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                style={{ marginTop: '20px' }}
              >
                Login
              </Button>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Login;