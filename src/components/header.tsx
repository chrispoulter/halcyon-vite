import { useState } from 'react';
import { Link as RouterLink } from 'react-router';
import {
    AppBar,
    Container,
    Toolbar,
    Typography,
    Box,
    IconButton,
    Menu,
    MenuItem,
    Button,
    Tooltip,
    Avatar,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

export function Header() {
    const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);

    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

    function onOpenNavMenu(event: React.MouseEvent<HTMLElement>) {
        setAnchorElNav(event.currentTarget);
    }
    function onOpenUserMenu(event: React.MouseEvent<HTMLElement>) {
        setAnchorElUser(event.currentTarget);
    }

    function onCloseNavMenu() {
        setAnchorElNav(null);
    }

    function onCloseUserMenu() {
        setAnchorElUser(null);
    }

    function onLogout() {
        setAnchorElUser(null);
        console.log('logout');
    }

    return (
        <AppBar position="static">
            <Container maxWidth="sm">
                <Toolbar disableGutters>
                    <Typography
                        variant="h6"
                        noWrap
                        component={RouterLink}
                        to="/"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        Halcyon
                    </Typography>

                    <Box
                        sx={{
                            flexGrow: 1,
                            display: { xs: 'flex', md: 'none' },
                        }}
                    >
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={onOpenNavMenu}
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
                            onClose={onCloseNavMenu}
                            sx={{ display: { xs: 'block', md: 'none' } }}
                        >
                            <MenuItem
                                component={RouterLink}
                                to="/"
                                onClick={onCloseNavMenu}
                            >
                                <Typography sx={{ textAlign: 'center' }}>
                                    Home
                                </Typography>
                            </MenuItem>
                            <MenuItem
                                component={RouterLink}
                                to="/about"
                                onClick={onCloseNavMenu}
                            >
                                <Typography sx={{ textAlign: 'center' }}>
                                    About
                                </Typography>
                            </MenuItem>
                            <MenuItem
                                component={RouterLink}
                                to="/user"
                                onClick={onCloseNavMenu}
                            >
                                <Typography sx={{ textAlign: 'center' }}>
                                    Users
                                </Typography>
                            </MenuItem>
                        </Menu>
                    </Box>

                    <Typography
                        variant="h5"
                        noWrap
                        component={RouterLink}
                        to="/"
                        sx={{
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        Halcyon
                    </Typography>
                    <Box
                        sx={{
                            flexGrow: 1,
                            display: { xs: 'none', md: 'flex' },
                        }}
                    >
                        <Button
                            component={RouterLink}
                            to="/"
                            onClick={onCloseNavMenu}
                            sx={{ my: 2, color: 'white', display: 'block' }}
                        >
                            Home
                        </Button>
                        <Button
                            component={RouterLink}
                            to="/about"
                            onClick={onCloseNavMenu}
                            sx={{ my: 2, color: 'white', display: 'block' }}
                        >
                            About
                        </Button>
                        <Button
                            component={RouterLink}
                            to="/user"
                            onClick={onCloseNavMenu}
                            sx={{ my: 2, color: 'white', display: 'block' }}
                        >
                            Users
                        </Button>
                    </Box>
                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open settings">
                            <IconButton onClick={onOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar
                                    alt="Remy Sharp"
                                    src="/static/images/avatar/2.jpg"
                                />
                            </IconButton>
                        </Tooltip>
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
                            onClose={onCloseUserMenu}
                        >
                            <MenuItem
                                component={RouterLink}
                                to="/profile"
                                onClick={onCloseUserMenu}
                            >
                                <Typography sx={{ textAlign: 'center' }}>
                                    My Account
                                </Typography>
                            </MenuItem>
                            <MenuItem onClick={onLogout}>
                                <Typography sx={{ textAlign: 'center' }}>
                                    Log out
                                </Typography>
                            </MenuItem>
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}
