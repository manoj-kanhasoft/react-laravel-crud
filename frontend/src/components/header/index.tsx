import * as React from "react";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Avatar,
  Button,
  Tooltip,
  MenuItem,
} from "@mui/material";
import LogoDev from "@mui/icons-material/LogoDev";
import { Link, useNavigate } from "react-router-dom";
import { signout } from "../../store/thunk/authThunk";
import { useAppDispatch } from "../../store/store";
import { getLoginUser } from "../../helpers/services";

function Index() {
  const userData = getLoginUser();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const attemptLogout = () => {
    dispatch(signout({ navigate }));
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <LogoDev
            sx={{
              mr: 1,
              fontSize: "30px",
            }}
          />
          <Typography
            variant="h6"
            noWrap
            sx={{
              mr: 2,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            <Link to="/" style={{ color: "white", textDecoration: "none" }}>
              LOGO
            </Link>
          </Typography>

          {!userData?.user ? (
            <Box
              sx={{
                flexGrow: 1,
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <Button sx={{ my: 2, display: "block" }}>
                <Link to="/sign-in" style={{ color: "white" }}>
                  Sign In
                </Link>
              </Button>
              <Button sx={{ my: 2, display: "block" }}>
                <Link to="/sign-up" style={{ color: "white" }}>
                  Sign Up
                </Link>
              </Button>
            </Box>
          ) : (
            <Box
              sx={{
                flexGrow: 1,
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <Link to="/payment" style={{ textDecoration: "none" }}>
                <Button sx={{ my: 2, display: "block", color: "white" }}>
                  Payment
                </Button>
              </Link>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar
                    alt={userData?.user?.name}
                    src="/static/images/avatar/2.jpg"
                  />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem onClick={handleCloseUserMenu}>
                  <Typography textAlign="center" onClick={attemptLogout}>
                    Logout
                  </Typography>
                </MenuItem>
              </Menu>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Index;
