import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Box,
  Container,
  TextField,
  Grid,
  CssBaseline,
  Avatar,
  Typography,
  Button,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import LayoutContainer from "../components/layoutContainer";
import SimpleLoader from "../components/simpleLoader";
import { validateSignIn } from "../helpers/validations";
import { login } from "../store/thunk/authThunk";
import { useAppDispatch, useAppSelector } from "../store/store";

function SignIn(): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading } = useAppSelector((state) => state.authReducer);

  const [data, setData] = useState<any>({});
  const [errors, setErrors] = useState<any>({});

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const error = validateSignIn(data);
    setErrors(error);
    if (!Object.keys(error).length) {
      dispatch(login({ ...data, navigate }));
    }
  };

  return (
    <LayoutContainer>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={onChange}
              error={errors && errors?.email ? true : false}
              helperText={errors && errors?.email}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={onChange}
              error={errors && errors?.password ? true : false}
              helperText={errors && errors?.password}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={loading}
            >
              {loading && <SimpleLoader color="#3361FF" />} Sign In
            </Button>
            <Grid container>
              <Grid item>
                <Link to="/sign-up">Don't have an account? Sign Up</Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </LayoutContainer>
  );
}

export default SignIn;
