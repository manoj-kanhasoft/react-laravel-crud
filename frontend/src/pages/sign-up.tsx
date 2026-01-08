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
import LayoutContainer from "../components/layoutContainer";
import PersonAdd from "@mui/icons-material/PersonAdd";
import { validateSignUp } from "../helpers/validations";
import { signup } from "../store/thunk/authThunk";
import { useAppDispatch, useAppSelector } from "../store/store";
import SimpleLoader from "../components/simpleLoader";

function SignUp(): JSX.Element {
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
    const error = validateSignUp(data);
    setErrors(error);
    if (!Object.keys(error).length) {
      dispatch(signup({ ...data, navigate }));
    }
  };

  return (
    <LayoutContainer>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 5,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <PersonAdd />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign Up
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
              id="name"
              label="Name"
              name="name"
              autoComplete="name"
              autoFocus
              onChange={onChange}
              error={errors && errors?.name ? true : false}
              helperText={errors && errors?.name}
            />
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
              id="mobile_no"
              label="Mobile No."
              name="mobile_no"
              autoComplete="mobile_no"
              autoFocus
              onChange={onChange}
              error={errors && errors?.mobile_no ? true : false}
              helperText={errors && errors?.mobile_no}
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
            <TextField
              margin="normal"
              required
              fullWidth
              name="password_confirmation"
              label="Confirm password"
              type="password"
              id="password_confirmation"
              autoComplete="password_confirmation"
              onChange={onChange}
              error={errors && errors?.password_confirmation ? true : false}
              helperText={errors && errors?.password_confirmation}
            />
            {errors && errors?.confirmation_not_matched && (
              <Typography variant="h6" color="error" fontSize={12}>
                {errors?.confirmation_not_matched}
              </Typography>
            )}

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={loading}
            >
              {loading && <SimpleLoader color="#3361FF" />}
              Sign Up
            </Button>
            <Grid container>
              <Grid item>
                <Link to="/sign-in">Already have account? Sign In</Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </LayoutContainer>
  );
}

export default SignUp;
