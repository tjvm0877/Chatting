import {
  Box,
  Button,
  Divider,
  FormControl,
  FormLabel,
  Stack,
  TextField,
  Typography,
  Card,
} from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { signIn } from '../api/auth';
import useAuthStore from '../stores/authStore';

const cardStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  maxWidth: '28em',
  padding: '2em',
  gap: '1em',
  margin: 'auto',
  boxShadow:
    '0em 0.3125em 0.9375em 0em rgba(30, 34, 45, 0.05), 0em 0.9375em 2.1875em -0.3125em rgba(30, 34, 45, 0.05)',
};

const containerStyle = {
  minHeight: '100vh',
  padding: '1em',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  position: 'relative',
  background:
    'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
};

const SignIn = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
  const setIsSignIn = useAuthStore((state) => state.setIsSignIn);
  const navigate = useNavigate();

  const onEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmailInput(e.target.value);
    setEmailError(false);
    setEmailErrorMessage('');
  };
  const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordInput(e.target.value);
    setPasswordError(false);
    setPasswordErrorMessage('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateInputs()) return;

    try {
      setIsLoading(true);
      await signIn(emailInput, passwordInput);
      setIsSignIn(true);
      navigate('/chat');
    } catch (error) {
      console.log(error);
      alert('로그인 실패');
    } finally {
      setIsLoading(false);
    }
  };

  const validateInputs = () => {
    let isValid = true;

    if (!emailInput || !/\S+@\S+\.\S+/.test(emailInput)) {
      setEmailError(true);
      setEmailErrorMessage('Please enter a valid email address.');
      isValid = false;
    }

    if (!passwordInput || passwordInput.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage('Password must be at least 6 characters long.');
      isValid = false;
    }

    return isValid;
  };

  return (
    <Stack sx={containerStyle}>
      <Card variant="outlined" sx={cardStyle}>
        <Typography component="h1" variant="h4" sx={{ width: '100%' }}>
          Sign in
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate
          sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            gap: 2,
          }}
        >
          <FormControl>
            <FormLabel htmlFor="email">Email</FormLabel>
            <TextField
              error={emailError}
              helperText={emailErrorMessage}
              id="email"
              type="email"
              name="email"
              placeholder="your@email.com"
              autoComplete="email"
              autoFocus
              required
              fullWidth
              variant="outlined"
              value={emailInput}
              onChange={onEmailChange}
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="password">Password</FormLabel>
            <TextField
              error={passwordError}
              helperText={passwordErrorMessage}
              name="password"
              placeholder="••••••"
              type="password"
              id="password"
              autoComplete="current-password"
              required
              fullWidth
              variant="outlined"
              value={passwordInput}
              onChange={onPasswordChange}
            />
          </FormControl>
          <Button
            type="submit"
            fullWidth
            disabled={isLoading}
            variant="contained"
          >
            {isLoading ? 'Signing up...' : 'Sign in'}
          </Button>
        </Box>
        <Divider>or</Divider>
        <Typography sx={{ textAlign: 'center' }}>
          Don&apos;t have an account?{' '}
          <Button onClick={() => navigate('/sign-up')}>Sign up</Button>
        </Typography>
      </Card>
    </Stack>
  );
};

export default SignIn;
