import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { styled } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import Link from '@mui/material/Link';

const pages = ['Transactions', 'Pricing', 'FAQ'];
const settings = ['Profile', 'Settings', 'Logout'];

const white = '#FFFFFF';
const purple = '#DC03FF';

const ColorButton = styled(Button)(({ theme }) => ({
  color: white,
  borderColor: white,
  borderRadius: 20,
  paddingTop: 3,
  paddingBottom: 2,
  '&:hover': {
    borderColor: white,
    backgroundColor: purple,
  },
}));

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const navigate = useNavigate();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleSettingsMenuItemClicked = (settingsPage) => {
    setAnchorElUser(null); // dismiss the menu
    if (settingsPage === 'Profile') {
      navigate("/profile");
    } else if (settingsPage === 'Settings') {
      navigate("/settings");
    } else if (settingsPage === 'Logout') {
      console.log("Log out user");
    }
  }

  const handleAppPageSelected = (appPage) => {
    setAnchorElNav(null);
    if (appPage === 'FAQ') {
      navigate("/faq");
    } else if (appPage === 'Transactions') {
      navigate("/tx");
    } else if (appPage === 'Pricing') {
      navigate("/pricing");
    } else {
      navigate("/")
    }
  }

  const appBarTheme = createTheme({
    palette: {
      mode: 'dark',
      // primary: {
      //   main: '#1976d2',
      // },
    },
    typography: {
      fontFamily: 'Poppins',
      h6: {
        fontWeight: 600,
      },
    },
  });

  return (
    <ThemeProvider theme={appBarTheme}>
      <AppBar position="static" color="primary">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            {/* 1st part */}
            <Link href="/" underline="none">
              <Typography
                variant="h6"
                noWrap
                component="div"
                color={white}
                sx={{ display: { xs: 'none', md: 'flex' } }}
              >
                NFT
              </Typography>
            </Link>
            {/* 2nd part */}
            <Link href="/" underline="none">
              <Typography
                variant="h6"
                noWrap
                component="div"
                color={purple}
                sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
              >
                TaxHelper
              </Typography>
            </Link>

            {/* When on mobile or window is narrow, instead of showing pages as tabs, stack them in a navigation menu */}
            {/* Navigation menu: START */}
            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}
              >
                {pages.map((page) => (
                  <MenuItem key={page} onClick={() => handleAppPageSelected(page)}>
                    <Typography textAlign="center">{page}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
            >
              NFTTaxHelper
            </Typography>
            {/* Navigation menu: END */}

            {/* Action menu as tabs: START */}
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {pages.map((page) => (
                <Button
                  key={page}
                  onClick={() => handleAppPageSelected(page)}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  {page}
                </Button>
              ))}
            </Box>
            {/* Action menu as tabs: END */}

            <Box sx={{ flexGrow: 0 }}>
              {/* Tooltip title also depends on logged-in status */}
              <Tooltip title="Open settings">
                <ColorButton onClick={handleOpenUserMenu} variant="outlined">
                  Connect your wallet
                </ColorButton>
              </Tooltip>
              {/* Only show settings menu if the user has logged-in */}
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={() => handleSettingsMenuItemClicked(setting)}>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
};
export default ResponsiveAppBar;
