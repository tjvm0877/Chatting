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
import { signUp } from '../api/auth';

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

const SignUp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [emailInput, setEmailInput] = useState('');
  const [nameInput, setNameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState('');
  const [nameError, setNameError] = useState(false);
  const [nameErrorMessage, setNameErrorMessage] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
  const navigate = useNavigate();

  const onEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmailInput(e.target.value);
    setEmailError(false);
    setEmailErrorMessage('');
  };
  const onNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNameInput(e.target.value);
    setNameError(false);
    setNameErrorMessage('');
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
      await signUp(emailInput, nameInput, passwordInput);
      navigate('/sign-in');
    } catch (error) {
      alert('회원가입 실패');
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

    if (!nameInput || nameInput.length < 3) {
      setNameError(true);
      setNameErrorMessage('Name must be at least 3 characters long.');
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
        <Typography
          component="h1"
          variant="h4"
          sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
        >
          Sign up
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate
          sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            gap: '1em',
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
            <FormLabel htmlFor="name">Name</FormLabel>
            <TextField
              error={nameError}
              helperText={nameErrorMessage}
              id="name"
              type="text"
              name="name"
              placeholder="your name"
              autoComplete="name"
              required
              fullWidth
              variant="outlined"
              value={nameInput}
              onChange={onNameChange}
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
            {isLoading ? 'Signing up...' : 'Sign up'}
          </Button>
        </Box>
        <Divider>or</Divider>
        <Typography sx={{ textAlign: 'center' }}>
          Already have an account?{' '}
          <Button onClick={() => navigate('/sign-in')}>Sign in</Button>
        </Typography>
      </Card>
    </Stack>
  );
};

export default SignUp;
