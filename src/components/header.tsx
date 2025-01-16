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
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { UserNav } from '@/components/user-nav';
import { Role } from '@/lib/session';
import { useSession } from '@/hooks/useSession';

const routes = [
    {
        href: '/',
        label: 'Home',
    },
    {
        href: '/about',
        label: 'About',
    },
    {
        href: '/user',
        label: 'Users',
        roles: [Role.SYSTEM_ADMINISTRATOR, Role.USER_ADMINISTRATOR],
    },
];

export function Header() {
    const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);

    const { profile } = useSession();

    function onOpenNavMenu(event: React.MouseEvent<HTMLElement>) {
        setAnchorElNav(event.currentTarget);
    }

    function onCloseNavMenu() {
        setAnchorElNav(null);
    }

    const routeLinks = routes
        .filter((route) =>
            route.roles
                ? route.roles.some((value) => profile?.role?.includes(value))
                : true
        )
        .map((route) => (
            <MenuItem
                component={RouterLink}
                to={route.href}
                onClick={onCloseNavMenu}
            >
                <Typography sx={{ textAlign: 'center' }}>
                    {route.label}
                </Typography>
            </MenuItem>
        ));

    const mobileLinks = routes
        .filter((route) =>
            route.roles
                ? route.roles.some((value) => profile?.role?.includes(value))
                : true
        )
        .map((route) => (
            <Button
                component={RouterLink}
                to={route.href}
                onClick={onCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
            >
                {route.label}
            </Button>
        ));

    return (
        <AppBar position="static">
            <Container maxWidth="sm">
                <Toolbar disableGutters>
                    {/* main logo */}
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

                    {/* mobile menu */}
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
                            {routeLinks}
                        </Menu>
                    </Box>

                    {/* desktop logo */}
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

                    {/* desktop menu */}
                    <Box
                        sx={{
                            flexGrow: 1,
                            display: { xs: 'none', md: 'flex' },
                        }}
                    >
                        {mobileLinks}
                    </Box>

                    <UserNav />
                </Toolbar>
            </Container>
        </AppBar>
    );
}
